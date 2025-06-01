from fastapi import APIRouter, HTTPException
from database import db
from schemas.schemas import PlatformStats, User
from typing import List
from datetime import datetime, timedelta
from bson import ObjectId

router = APIRouter()

@router.get("/stats", response_model=PlatformStats)
async def get_platform_stats():
    # Get total users
    total_users = await db.get_db()["users"].count_documents({})
    
    # Get active users in last 7 days
    seven_days_ago = datetime.utcnow() - timedelta(days=7)
    active_users = await db.get_db()["users"].count_documents({
        "last_active": {"$gte": seven_days_ago}
    })
    
    # Get total interviews
    total_interviews = await db.get_db()["interviews"].count_documents({})
    
    # Calculate average score
    interviews = await db.get_db()["interviews"].find({"score": {"$exists": True}}).to_list(length=1000)
    average_score = sum(interview["score"] for interview in interviews) / len(interviews) if interviews else 0
    
    # Get popular roles
    role_counts = await db.get_db()["interviews"].aggregate([
        {"$group": {"_id": "$role", "count": {"$sum": 1}}},
        {"$sort": {"count": -1}},
        {"$limit": 5}
    ]).to_list(length=5)
    
    popular_roles = [{"role": item["_id"], "count": item["count"]} for item in role_counts]
    
    # Get user growth
    user_growth = await db.get_db()["users"].aggregate([
        {
            "$group": {
                "_id": {
                    "year": {"$year": "$registered_date"},
                    "month": {"$month": "$registered_date"}
                },
                "count": {"$sum": 1}
            }
        },
        {"$sort": {"_id.year": 1, "_id.month": 1}}
    ]).to_list(length=12)
    
    growth_data = [
        {
            "month": f"{item['_id']['year']}-{item['_id']['month']:02d}",
            "users": item["count"]
        }
        for item in user_growth
    ]
    
    # Get interviews by day
    interviews_by_day = await db.get_db()["interviews"].aggregate([
        {
            "$group": {
                "_id": {"$dayOfWeek": "$date"},
                "count": {"$sum": 1}
            }
        },
        {"$sort": {"_id": 1}}
    ]).to_list(length=7)
    
    day_names = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
    day_counts = [
        {"day": day_names[item["_id"] - 1], "count": item["count"]}
        for item in interviews_by_day
    ]
    
    return PlatformStats(
        total_users=total_users,
        active_users_last_7_days=active_users,
        total_interviews=total_interviews,
        average_score=average_score,
        popular_roles=popular_roles,
        user_growth=growth_data,
        interviews_by_day=day_counts
    )

@router.get("/users", response_model=List[User])
async def get_all_users():
    users = await db.get_db()["users"].find().to_list(length=100)
    for user in users:
        user["id"] = str(user["_id"])
    return [User(**user) for user in users]

@router.delete("/users/{user_id}")
async def delete_user(user_id: str):
    result = await db.get_db()["users"].delete_one({"_id": ObjectId(user_id)})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="User not found")
    return {"message": "User deleted successfully"} 