from fastapi import APIRouter, HTTPException, Depends
from database import db
from schemas.schemas import User, UserCreate, UserPerformance
from datetime import datetime, timedelta
from typing import List
from bson import ObjectId
from passlib.context import CryptContext
from jose import jwt, JWTError
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
import os

SECRET_KEY = os.getenv("SECRET_KEY", "secret")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/users/login")

router = APIRouter()

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password):
    return pwd_context.hash(password)

def create_access_token(data: dict, expires_delta: timedelta = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

async def get_current_user(token: str = Depends(oauth2_scheme)):
    credentials_exception = HTTPException(
        status_code=401,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id: str = payload.get("sub")
        if user_id is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception
    user = await db.get_db()["users"].find_one({"_id": ObjectId(user_id)})
    if user is None:
        raise credentials_exception
    user["id"] = str(user["_id"])
    return User(**user)

@router.post("/", response_model=User)
async def create_user(user: UserCreate):
    db_user = await db.get_db()["users"].find_one({"email": user.email})
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    user_dict = user.model_dump()
    user_dict["password"] = get_password_hash(user_dict["password"])
    user_dict["registered_date"] = datetime.utcnow()
    user_dict["last_active"] = datetime.utcnow()
    user_dict["interviews_completed"] = 0
    result = await db.get_db()["users"].insert_one(user_dict)
    user_dict["id"] = str(result.inserted_id)
    return User(**user_dict)

@router.post("/login")
async def login(form_data: OAuth2PasswordRequestForm = Depends()):
    user = await db.get_db()["users"].find_one({"email": form_data.username})
    if not user or not verify_password(form_data.password, user["password"]):
        raise HTTPException(status_code=401, detail="Incorrect email or password")
    access_token = create_access_token(data={"sub": str(user["_id"])}, expires_delta=timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES))
    return {"access_token": access_token, "token_type": "bearer"}

@router.get("/{user_id}", response_model=User)
async def get_user(user_id: str, current_user: User = Depends(get_current_user)):
    user = await db.get_db()["users"].find_one({"_id": ObjectId(user_id)})
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    user["id"] = str(user["_id"])
    return User(**user)

@router.get("/{user_id}/performance", response_model=UserPerformance)
async def get_user_performance(user_id: str, current_user: User = Depends(get_current_user)):
    performance = await db.get_db()["user_performance"].find_one({"user_id": user_id})
    if not performance:
        raise HTTPException(status_code=404, detail="Performance data not found")
    return UserPerformance(**performance)

@router.put("/{user_id}/last-active")
async def update_last_active(user_id: str, current_user: User = Depends(get_current_user)):
    result = await db.get_db()["users"].update_one(
        {"_id": ObjectId(user_id)},
        {"$set": {"last_active": datetime.utcnow()}}
    )
    if result.modified_count == 0:
        raise HTTPException(status_code=404, detail="User not found")
    return {"message": "Last active updated successfully"} 