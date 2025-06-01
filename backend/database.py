from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv
import os

load_dotenv()

MONGODB_URL = os.getenv("MONGODB_URL")
DATABASE_NAME = os.getenv("DATABASE_NAME")

class Database:
    client: AsyncIOMotorClient = None
    db = None

    @classmethod
    async def connect_db(cls):
        cls.client = AsyncIOMotorClient(MONGODB_URL)
        cls.db = cls.client[DATABASE_NAME]
        print("Connected to MongoDB!")

    @classmethod
    async def close_db(cls):
        if cls.client:
            cls.client.close()
            print("MongoDB connection closed!")

    @classmethod
    def get_db(cls):
        return cls.db

db = Database() 