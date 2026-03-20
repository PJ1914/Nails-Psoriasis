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
- Deploy security rules (see below).

## Deploying Firebase Security Rules

**Option 1: Using Firebase CLI (Recommended)**

1. Install Firebase CLI if you haven't:
```bash
npm install -g firebase-tools
```

2. Login to Firebase:
```bash
firebase login
```

3. Deploy the rules from the project root:
```bash
firebase deploy --only storage,firestore
```

**Option 2: Manual Deployment via Console**

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project: `nails-psoriasis`
3. For **Storage Rules**:
   - Navigate to Storage → Rules
   - Copy content from `storage.rules` file
   - Paste and publish
4. For **Firestore Rules**:
   - Navigate to Firestore Database → Rules
   - Copy content from `firestore.rules` file
   - Paste and publish

**Security Rules Summary:**
- Users can upload/read images only in their own folder: `nail-scans/{userId}/`
- Images must be under 10MB and valid image format
- Users can read/create their own reports
- Doctors can read all reports and user profiles

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
