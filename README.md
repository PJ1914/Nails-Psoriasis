# Nail Psoriasis Severity AI System

Production-ready monorepo scaffold for automated Nail Psoriasis Severity assessment using a NAPSI-oriented workflow.

## Stack

- Frontend: React, Vite, Tailwind CSS, React Router DOM, Axios, Firebase Web SDK
- Backend: Flask, Flask-CORS, Firebase Admin SDK
- Data: Firebase Authentication, Firestore, Firebase Storage
- AI integration layer: placeholder service designed to be replaced by YOLOv8 plus EfficientNet or ResNet

## Project Structure

```text
frontend/
backend/
ai-model/
```

## Frontend Setup

1. Copy frontend/.env.example to frontend/.env.
2. Fill in your Firebase web app credentials and backend API URL.
3. Install dependencies:

```bash
cd frontend
npm install
```

4. Start the frontend:

```bash
npm run dev
```

## Backend Setup

1. Copy backend/.env.example to backend/.env.
2. Create or download a Firebase service account JSON file.
3. Set FIREBASE_SERVICE_ACCOUNT_KEY_PATH to the absolute path of that JSON file.
4. Install dependencies in a Python 3.10+ environment:

```bash
cd backend
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
```

5. Start the API:

```bash
python app.py
```

## Firebase Requirements

- Enable Email/Password authentication.
- Create Firestore database.
- Create Firebase Storage bucket.
- Add a Firestore users collection and reports collection through the app workflow.

## Core API Endpoints

- POST /api/predict
- GET /api/history
- GET /api/history/<id>
- GET /api/users
- GET /api/reports
- GET /api/health

## Data Collections

users:

```json
{
  "uid": "string",
  "name": "string",
  "email": "string",
  "role": "user | doctor",
  "created_at": "timestamp"
}
```

reports:

```json
{
  "user_id": "string",
  "image_url": "string",
  "napsi_score": 25,
  "severity": "Moderate",
  "features": {
    "pitting": true,
    "onycholysis": false,
    "discoloration": true,
    "crumbling": false
  },
  "processed_image_url": "string",
  "created_at": "timestamp"
}
```

## Notes

- Firebase Authentication is handled in the frontend.
- The backend verifies Firebase JWTs before serving protected endpoints.
- The placeholder inference service can be replaced without changing controller or route contracts.
