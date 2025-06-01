from fastapi import APIRouter, HTTPException
from schemas.ai import InterviewQuestionRequest, AIInterviewResponse
from services.ai_service import ai_service
from typing import List

router = APIRouter()

@router.post("/generate-questions", response_model=AIInterviewResponse)
async def generate_interview_questions(request: InterviewQuestionRequest):
    try:
        response = await ai_service.generate_questions(
            role=request.role,
            experience_level=request.experience_level,
            topics=request.topics,
            num_questions=request.num_questions
        )
        return response
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error generating questions: {str(e)}")

@router.post("/analyze-answers")
async def analyze_answers(answers: List[dict]):
    try:
        # Format answers for the AI
        formatted_answers = "\n".join([
            f"Question: {ans['question']}\nAnswer: {ans['answer']}\n"
            for ans in answers
        ])
        
        # Get feedback from AI
        feedback = await ai_service.llm.ainvoke(
            ai_service.feedback_prompt.format_messages(
                answers=formatted_answers
            )
        )
        
        return {"feedback": feedback.content}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error analyzing answers: {str(e)}") 