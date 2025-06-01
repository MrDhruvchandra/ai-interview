from fastapi import APIRouter, HTTPException
from database import db
from schemas import Interview, InterviewDetail
from datetime import datetime
from typing import List
from bson import ObjectId

router = APIRouter()

@router.post("/", response_model=Interview)
async def create_interview(interview: Interview):
    interview_dict = interview.model_dump()
    result = await db.get_db()["interviews"].insert_one(interview_dict)
    interview_dict["id"] = str(result.inserted_id)
    return Interview(**interview_dict)

@router.get("/{interview_id}", response_model=Interview)
async def get_interview(interview_id: str):
    interview = await db.get_db()["interviews"].find_one({"_id": ObjectId(interview_id)})
    if not interview:
        raise HTTPException(status_code=404, detail="Interview not found")
    interview["id"] = str(interview["_id"])
    return Interview(**interview)

@router.get("/{interview_id}/details", response_model=InterviewDetail)
async def get_interview_details(interview_id: str):
    details = await db.get_db()["interview_details"].find_one({"interview_id": interview_id})
    if not details:
        raise HTTPException(status_code=404, detail="Interview details not found")
    return InterviewDetail(**details)

@router.get("/user/{user_id}", response_model=List[Interview])
async def get_user_interviews(user_id: str):
    interviews = await db.get_db()["interviews"].find({"user_id": user_id}).to_list(length=100)
    for interview in interviews:
        interview["id"] = str(interview["_id"])
    return [Interview(**interview) for interview in interviews]

@router.put("/{interview_id}/status")
async def update_interview_status(interview_id: str, status: str):
    result = await db.get_db()["interviews"].update_one(
        {"_id": ObjectId(interview_id)},
        {"$set": {"status": status}}
    )
    if result.modified_count == 0:
        raise HTTPException(status_code=404, detail="Interview not found")
    return {"message": "Interview status updated successfully"}

@router.put("/{interview_id}/score")
async def update_interview_score(interview_id: str, score: int):
    result = await db.get_db()["interviews"].update_one(
        {"_id": ObjectId(interview_id)},
        {"$set": {"score": score}}
    )
    if result.modified_count == 0:
        raise HTTPException(status_code=404, detail="Interview not found")
    return {"message": "Interview score updated successfully"} 