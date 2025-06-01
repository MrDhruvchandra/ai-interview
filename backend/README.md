# AI Interview Practice Backend

This is the backend service for the AI Interview Practice application, built with FastAPI and MongoDB.

## Prerequisites

- Python 3.8+
- MongoDB
- pip (Python package manager)

## Setup

1. Create a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Create a `.env` file in the root directory with the following content:
```
MONGODB_URL=mongodb://localhost:27017
DATABASE_NAME=interview_practice
```

4. Start MongoDB service on your machine

## Running the Application

Start the development server:
```bash
uvicorn main:app --reload
```

The API will be available at `http://localhost:8000`

## API Documentation

Once the server is running, you can access:
- Swagger UI documentation: `http://localhost:8000/docs`
- ReDoc documentation: `http://localhost:8000/redoc`

## API Endpoints

### Users
- `POST /api/users/` - Create a new user
- `GET /api/users/{user_id}` - Get user details
- `GET /api/users/{user_id}/performance` - Get user performance data
- `PUT /api/users/{user_id}/last-active` - Update user's last active timestamp

### Interviews
- `POST /api/interviews/` - Create a new interview
- `GET /api/interviews/{interview_id}` - Get interview details
- `GET /api/interviews/{interview_id}/details` - Get detailed interview results
- `GET /api/interviews/user/{user_id}` - Get all interviews for a user
- `PUT /api/interviews/{interview_id}/status` - Update interview status
- `PUT /api/interviews/{interview_id}/score` - Update interview score

### Admin
- `GET /api/admin/stats` - Get platform statistics
- `GET /api/admin/users` - Get all users
- `DELETE /api/admin/users/{user_id}` - Delete a user 