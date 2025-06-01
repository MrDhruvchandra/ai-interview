from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database import db
import uvicorn

app = FastAPI(title="AI Interview Practice API")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # React dev server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
async def startup_db_client():
    await db.connect_db()

@app.on_event("shutdown")
async def shutdown_db_client():
    await db.close_db()

# Import and include routers
from routers import users, interviews, admin, ai

app.include_router(users.router, prefix="/api/users", tags=["users"])
app.include_router(interviews.router, prefix="/api/interviews", tags=["interviews"])
app.include_router(admin.router, prefix="/api/admin", tags=["admin"])
app.include_router(ai.router, prefix="/api/ai", tags=["ai"])

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True) 