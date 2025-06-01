from langchain_google_genai import ChatGoogleGenerativeAI
from langchain.prompts import ChatPromptTemplate
from langchain.output_parsers import PydanticOutputParser
from schemas.ai import AIQuestion, AIInterviewResponse
import os
from dotenv import load_dotenv

load_dotenv()

class AIService:
    def __init__(self):
        self.llm = ChatGoogleGenerativeAI(
            model="gemini-2-flash",
            google_api_key=os.getenv("GOOGLE_API_KEY"),
            temperature=0.7
        )
        
        self.question_prompt = ChatPromptTemplate.from_messages([
            ("system", """You are an expert technical interviewer. Generate interview questions based on the following criteria:
            Role: {role}
            Experience Level: {experience_level}
            Topics: {topics}
            Number of Questions: {num_questions}
            
            For each question, provide:
            1. The question itself
            2. An expected answer
            3. The difficulty level
            4. The specific topic it covers
            
            Format the response as a JSON object with an array of questions."""),
            ("human", "Generate {num_questions} interview questions.")
        ])
        
        self.feedback_prompt = ChatPromptTemplate.from_messages([
            ("system", """You are an expert technical interviewer providing feedback. Analyze the candidate's answers and provide:
            1. Strengths
            2. Areas for improvement
            3. Overall feedback
            4. Recommended resources for improvement
            
            Format the response as a JSON object."""),
            ("human", "Analyze these answers: {answers}")
        ])

    async def generate_questions(self, role: str, experience_level: str, topics: list[str], num_questions: int = 5) -> AIInterviewResponse:
        # Generate questions
        questions_response = await self.llm.ainvoke(
            self.question_prompt.format_messages(
                role=role,
                experience_level=experience_level,
                topics=", ".join(topics),
                num_questions=num_questions
            )
        )
        
        # Parse questions
        questions = self._parse_questions(questions_response.content)
        
        # Generate feedback prompt
        feedback_prompt = await self.llm.ainvoke(
            self.feedback_prompt.format_messages(
                answers="[Candidate answers will be provided here]"
            )
        )
        
        return AIInterviewResponse(
            questions=questions,
            feedback_prompt=feedback_prompt.content
        )

    def _parse_questions(self, content: str) -> list[AIQuestion]:
        # Simple parsing logic - in production, you'd want more robust parsing
        try:
            # Assuming the LLM returns a JSON string
            import json
            data = json.loads(content)
            return [AIQuestion(**q) for q in data.get("questions", [])]
        except Exception as e:
            print(f"Error parsing questions: {e}")
            return []

ai_service = AIService() 