from pydantic import BaseModel, EmailStr, Field
from typing import List, Optional, Dict
from datetime import datetime

class UserBase(BaseModel):
    name: str
    email: EmailStr
    is_admin: bool = False

class UserCreate(UserBase):
    password: str

class User(UserBase):
    id: str
    registered_date: datetime
    interviews_completed: int = 0
    last_active: datetime

class InterviewQuestion(BaseModel):
    id: str
    text: str
    time_spent: int
    answer: str
    feedback: str
    score: int

class InterviewSummary(BaseModel):
    strengths: List[str]
    weaknesses: List[str]
    overall_feedback: str
    recommended_resources: List[str]

class InterviewDetail(BaseModel):
    questions: List[InterviewQuestion]
    summary: InterviewSummary

class Interview(BaseModel):
    id: str
    user_id: str
    role: str
    experience_level: str
    topics: List[str]
    duration: int
    date: datetime
    score: Optional[int] = None
    status: str

class SkillProgress(BaseModel):
    skill: str
    scores: List[int]

class UserPerformance(BaseModel):
    skill_progress: List[SkillProgress]
    scores_by_month: List[Dict[str, int]]
    interview_count: int
    average_score: float
    top_performing_skill: str
    weakest_skill: str

class PlatformStats(BaseModel):
    total_users: int
    active_users_last_7_days: int
    total_interviews: int
    average_score: float
    popular_roles: List[Dict[str, int]]
    user_growth: List[Dict[str, int]]
    interviews_by_day: List[Dict[str, int]] 