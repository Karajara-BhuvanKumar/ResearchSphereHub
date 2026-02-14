# ResearchSphereHub Backend - Complete Setup & Connection Guide

## 📋 Table of Contents
1. [Architecture Overview](#architecture-overview)
2. [Database Setup](#database-setup)
3. [Backend Installation](#backend-installation)
4. [Running the Server](#running-the-server)
5. [Frontend Connection](#frontend-connection)
6. [API Documentation](#api-documentation)
7. [Troubleshooting](#troubleshooting)

---

## Architecture Overview

### System Components

```
┌─────────────────────┐
│  React Frontend     │ (Port 5173)
│  (Vite + TypeScript)│
└──────────┬──────────┘
           │
        HTTP/REST
        (Axios/Fetch)
           │
┌──────────▼──────────┐
│  Express Backend    │ (Port 5000)
│  ├─ Routes          │
│  ├─ Controllers     │
│  ├─ Services        │
│  ├─ Middleware      │
│  └─ Validation      │
└──────────┬──────────┘
           │
    Prisma ORM
           │
┌──────────▼──────────┐
│  PostgreSQL         │ (Port 5432)
│  Database           │
└─────────────────────┘
```

### Technology Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Frontend** | React + TypeScript | User interface |
| **Backend** | Node.js + Express | API server |
| **Database** | PostgreSQL | Data storage |
| **ORM** | Prisma | Type-safe database operations |
| **Auth** | JWT + Bcrypt | Secure authentication |
| **Validation** | Express-Validator | Data validation |

---

## Database Setup

### Prerequisites
- Have PostgreSQL installed on your machine
- Know your PostgreSQL username and password

### Step 1: Create Database and User

Open PostgreSQL (using psql terminal or GUI like pgAdmin):

```sql
-- Create a new user for the application
CREATE USER researchsphere_user WITH PASSWORD 'your_secure_password';

-- Create the database
CREATE DATABASE researchsphere_db OWNER researchsphere_user;

-- Grant all privileges
GRANT ALL PRIVILEGES ON DATABASE researchsphere_db TO researchsphere_user;

-- Grant schema privileges
\c researchsphere_db
GRANT ALL PRIVILEGES ON SCHEMA public TO researchsphere_user;
```

### Step 2: Verify Connection

Test with psql:
```bash
psql -U researchsphere_user -d researchsphere_db -h localhost
```

If successful, you should see: `researchsphere_db=>`

---

## Backend Installation

### Step 1: Navigate to Backend Directory

```bash
cd Backend
```

### Step 2: Install Dependencies

Using npm:
```bash
npm install
```

Or using bun (faster):
```bash
bun install
```

### Step 3: Configure Environment Variables

1. Copy the example .env file:
```bash
# On Windows (PowerShell)
Copy-Item .env.example .env

# On Mac/Linux
cp .env.example .env
```

2. Edit `.env` with your database credentials:

```env
# DATABASE - Update with your PostgreSQL credentials
DATABASE_URL="postgresql://researchsphere_user:your_secure_password@localhost:5432/researchsphere_db"

# JWT Secret - Generate a strong random string
JWT_SECRET="generate-a-random-string-here-min-32-chars"
JWT_EXPIRE="7d"

# SERVER
PORT=5000
NODE_ENV="development"

# CORS - Your frontend URL
CORS_ORIGIN="http://localhost:5173"

# BCRYPT
BCRYPT_ROUNDS=10
```

**How to generate a strong JWT_SECRET:**
```bash
# Using OpenSSL (Mac/Linux)
openssl rand -base64 32

# Using PowerShell (Windows)
[Convert]::ToBase64String((1..32 | ForEach-Object {Get-Random -Maximum 256}) | % {[byte]$_}) | Select-String -Pattern '^' -AllMatches | % {$_.Matches.Value}
```

Or just use: `your_super_secret_jwt_key_change_this_in_production_12345678`

### Step 4: Generate Prisma Client & Run Migrations

```bash
# Generate Prisma client
npm run prisma:generate

# Run migrations (creates tables in database)
npm run migrate
```

This will:
- Create all tables (Users, ResearchPapers, Bookmarks)
- Set up relationships
- Create indexes for performance

### Step 5: Verify Database Setup

```bash
# Open Prisma Studio (visual database explorer)
npm run prisma:studio
```

You should see an interface at `http://localhost:5555` showing empty tables.

---

## Running the Server

### Development Mode (with auto-reload)

```bash
npm run dev
```

You should see:
```
╔════════════════════════════════════════════╗
║   ResearchSphereHub Backend Server Started ║
╚════════════════════════════════════════════╝

📌 Server running on: http://localhost:5000
...
```

### Production Mode

```bash
# Build
npm run build

# Start
npm run start
```

### Test the Server

Open your browser and visit:
```
http://localhost:5000/api/health
```

You should see:
```json
{
  "status": "OK",
  "timestamp": "2026-02-14T10:30:00.000Z",
  "environment": "development"
}
```

---

## Frontend Connection

### Step 1: Install Axios in Frontend

```bash
cd ../Frontend
npm install axios
```

### Step 2: Create API Client

Create file: `src/lib/api.ts` (update if it exists):

```typescript
import axios, { AxiosInstance } from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle responses
apiClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error.response?.data || error);
  }
);

export default apiClient;
```

### Step 3: Create Environment File

Create `.env.local` in Frontend:

```env
VITE_API_URL=http://localhost:5000/api
```

### Step 4: Use in Components

Example in React component:

```typescript
import apiClient from './lib/api';

// Register
const response = await apiClient.post('/auth/register', {
  email: 'user@example.com',
  name: 'John Doe',
  password: 'password123',
  confirmPassword: 'password123',
});

// Store token
localStorage.setItem('token', response.data.token);

// Get user profile
const user = await apiClient.get('/auth/me');

// Search papers
const papers = await apiClient.get('/research/search', {
  params: {
    type: 'PAPER',
    search: 'machine learning',
    limit: 20,
  },
});

// Add bookmark
await apiClient.post(`/bookmarks/${paperId}`);
```

---

## API Documentation

### Authentication Endpoints

#### Register User
```
POST /api/auth/register

Request:
{
  "email": "user@example.com",
  "name": "John Doe",
  "password": "password123",
  "confirmPassword": "password123"
}

Response:
{
  "success": true,
  "message": "Registration successful",
  "data": {
    "user": {
      "id": "abc123",
      "email": "user@example.com",
      "name": "John Doe",
      "role": "USER",
      "createdAt": "2026-02-14T10:00:00Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIs..."
  }
}
```

#### Login User
```
POST /api/auth/login

Request:
{
  "email": "user@example.com",
  "password": "password123"
}

Response:
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": { ... },
    "token": "eyJhbGciOiJIUzI1NiIs..."
  }
}
```

#### Get Current User
```
GET /api/auth/me
Headers: Authorization: Bearer {token}

Response:
{
  "success": true,
  "message": "User profile retrieved",
  "data": {
    "id": "abc123",
    "email": "user@example.com",
    "name": "John Doe",
    "role": "USER",
    "createdAt": "2026-02-14T10:00:00Z",
    "updatedAt": "2026-02-14T10:00:00Z"
  }
}
```

#### Update Profile
```
PUT /api/auth/profile
Headers: Authorization: Bearer {token}

Request:
{
  "name": "Jane Doe",
  "email": "newemail@example.com"
}

Response: Updated user object
```

#### Change Password
```
POST /api/auth/change-password
Headers: Authorization: Bearer {token}

Request:
{
  "oldPassword": "password123",
  "newPassword": "newpassword456",
  "confirmPassword": "newpassword456"
}

Response:
{
  "success": true,
  "message": "Password changed successfully",
  "data": { "message": "Password changed successfully" }
}
```

### Research Paper Endpoints

#### Create Research Paper
```
POST /api/research
Headers: Authorization: Bearer {token}

Request:
{
  "title": "Machine Learning in Healthcare",
  "authors": ["John Smith", "Jane Doe"],
  "type": "PAPER",
  "content": "Abstract and summary of the paper...",
  "source": "https://arxiv.org/abs/2302.12345",
  "publishDate": "2023-02-14T00:00:00Z",
  "tags": ["machine-learning", "healthcare", "ai"]
}

Response: Created paper object with id
```

#### Search Papers
```
GET /api/research/search?type=PAPER&search=machine&tags=ai,ml&limit=10&offset=0

Response:
{
  "success": true,
  "message": "Search completed",
  "data": {
    "data": [...papers],
    "total": 45,
    "limit": 10,
    "offset": 0,
    "pages": 5
  }
}
```

#### Get Single Paper
```
GET /api/research/:id

Response: Single paper object with full details
```

#### Update Paper
```
PUT /api/research/:id
Headers: Authorization: Bearer {token}

Request: Partial paper object with fields to update

Response: Updated paper object
```

#### Delete Paper
```
DELETE /api/research/:id
Headers: Authorization: Bearer {token}

Response:
{
  "success": true,
  "message": "Research paper deleted"
}
```

### Bookmark Endpoints

#### Add Bookmark
```
POST /api/bookmarks/:paperId
Headers: Authorization: Bearer {token}

Response:
{
  "success": true,
  "message": "Paper added to bookmarks",
  "data": { bookmark object }
}
```

#### Remove Bookmark
```
DELETE /api/bookmarks/:paperId
Headers: Authorization: Bearer {token}

Response:
{
  "success": true,
  "message": "Bookmark removed"
}
```

#### Get User's Bookmarks
```
GET /api/bookmarks?limit=10&offset=0
Headers: Authorization: Bearer {token}

Response:
{
  "success": true,
  "message": "Bookmarks retrieved",
  "data": {
    "data": [
      {
        "id": "bookmark_id",
        "paper": { ...paper details },
        "createdAt": "2026-02-14T10:00:00Z"
      }
    ],
    "total": 5,
    "limit": 10,
    "offset": 0,
    "pages": 1
  }
}
```

#### Check if Paper is Bookmarked
```
GET /api/bookmarks/:paperId/check
Headers: Authorization: Bearer {token}

Response:
{
  "success": true,
  "message": "Bookmark status retrieved",
  "data": { "isBookmarked": true }
}
```

---

## Database Schema

### Users Table
```sql
CREATE TABLE "User" (
  id               TEXT PRIMARY KEY,
  email            TEXT UNIQUE NOT NULL,
  name             TEXT NOT NULL,
  password         TEXT NOT NULL,
  role             TEXT DEFAULT 'USER',
  createdAt        TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt        TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### ResearchPapers Table
```sql
CREATE TABLE "ResearchPaper" (
  id               TEXT PRIMARY KEY,
  title            TEXT NOT NULL,
  authors          TEXT[] NOT NULL,
  type             TEXT NOT NULL, -- PAPER, JOURNAL, CONFERENCE
  content          TEXT NOT NULL,
  source           TEXT NOT NULL,
  publishDate      TIMESTAMP,
  tags             TEXT[],
  userId           TEXT NOT NULL REFERENCES "User"(id),
  createdAt        TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt        TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Bookmarks Table
```sql
CREATE TABLE "Bookmark" (
  id               TEXT PRIMARY KEY,
  userId           TEXT NOT NULL REFERENCES "User"(id),
  paperId          TEXT NOT NULL REFERENCES "ResearchPaper"(id),
  createdAt        TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  UNIQUE(userId, paperId)
);
```

---

## Troubleshooting

### Problem: Database Connection Error

**Error:** `error: connect ECONNREFUSED 127.0.0.1:5432`

**Solution:**
1. Verify PostgreSQL is running
2. Check DATABASE_URL in .env
3. Verify username and password
4. Test with: `psql -U your_user -d researchsphere_db`

### Problem: JWT_SECRET Not Set

**Error:** `JWT_SECRET environment variable is not set`

**Solution:**
1. Generate a secret: `openssl rand -base64 32`
2. Add to .env: `JWT_SECRET="your_generated_secret"`

### Problem: Port 5000 Already in Use

**Error:** `Error: listen EADDRINUSE :::5000`

**Solution:**
Change PORT in .env to another port (e.g., 5001)

### Problem: Token Invalid/Expired

**Error:** `Invalid or expired token`

**Solution:**
1. Re-login to get a new token
2. Clear localStorage: `localStorage.clear()`
3. Check token format: Should be "Bearer your_token"

### Problem: CORS Error in Browser

**Error:** `Access to XMLHttpRequest blocked by CORS`

**Solution:**
1. Check CORS_ORIGIN in .env matches your frontend URL
2. Ensure frontend is on: `http://localhost:5173`
3. Verify CORS middleware is enabled in server

---

## Development Workflow

```bash
# Terminal 1: Run backend
cd Backend
npm run dev

# Terminal 2: Run Prisma Studio (view database)
cd Backend
npm run prisma:studio   # Opens http://localhost:5555

# Terminal 3: Run frontend
cd Frontend
npm run dev            # Opens http://localhost:5173
```

Then visit: `http://localhost:5173` and start testing!

---

## Next Steps

1. ✅ Backend is ready to receive API calls
2. 📱 Connect your React frontend components
3. 🎨 Update your pages to use the API client
4. 🧪 Test all endpoints with frontend
5. 🚀 Deploy when ready

Happy coding! 🚀
