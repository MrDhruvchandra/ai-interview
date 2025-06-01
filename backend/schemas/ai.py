from pydantic import BaseModel
from typing import List, Optional

class InterviewQuestionRequest(BaseModel):
    role: str
    experience_level: str
    topics: List[str]
    num_questions: int = 5

class AIQuestion(BaseModel):
    question: str
    expected_answer: str
    difficulty: str
    topic: str

class AIInterviewResponse(BaseModel):
    questions: List[AIQuestion]
    feedback_prompt: str 