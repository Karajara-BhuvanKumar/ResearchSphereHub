# ResearchSphereHub - Complete Full-Stack Project

## 📚 Project Overview

ResearchSphereHub is a full-stack web application for researchers to discover, bookmark, and share academic research papers, journals, and conference proceedings.

### Technology Stack

**Frontend:**
- React 18 + TypeScript
- Vite (fast build tool)
- Tailwind CSS (styling)
- shadcn/ui (component library)
- Axios (HTTP client)

**Backend:**
- Node.js + Express.js
- PostgreSQL (database)
- Prisma ORM (type-safe database)
- JWT (authentication)
- Bcrypt (password hashing)

---

## 📁 Project Structure

```
researchsphere-hub/
├── Frontend/                 # React application
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/           # Page components
│   │   ├── lib/             # Utilities (api.ts here)
│   │   ├── hooks/           # Custom React hooks
│   │   ├── App.tsx          # Main app component
│   │   └── main.tsx         # Entry point
│   ├── package.json
│   └── vite.config.ts
│
└── Backend/                  # Express API server
    ├── src/
    │   ├── controllers/      # Handle HTTP requests
    │   ├── routes/          # API routes
    │   ├── services/        # Business logic & database
    │   ├── middleware/      # Auth, validation, errors
    │   ├── utils/           # Helpers (JWT, password, etc)
    │   ├── lib/             # Prisma client setup
    │   └── index.ts         # Express server setup
    ├── prisma/
    │   ├── schema.prisma    # Database schema
    │   └── migrations/      # Database migrations
    ├── package.json
    └── .env.example
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- npm or bun package manager
- PostgreSQL (v12+)

### Complete Setup (Step-by-Step)

#### Step 1: Clone/Setup PostgreSQL

```bash
# Create database and user
# Open PostgreSQL terminal (psql) and run:

CREATE USER researchsphere_user WITH PASSWORD 'secure_password_123';
CREATE DATABASE researchsphere_db OWNER researchsphere_user;
GRANT ALL PRIVILEGES ON DATABASE researchsphere_db TO researchsphere_user;
```

#### Step 2: Backend Setup

```bash
# Navigate to Backend
cd Backend

# Install dependencies
npm install

# Create .env file
copy .env.example .env

# Edit .env with your database credentials:
# DATABASE_URL=postgresql://researchsphere_user:secure_password_123@localhost:5432/researchsphere_db
# JWT_SECRET=your_random_secret_here
# CORS_ORIGIN=http://localhost:5173

# Run database migrations
npm run migrate

# Start server (development)
npm run dev
```

Server will run on: `http://localhost:5000`

#### Step 3: Frontend Setup

```bash
# Open new terminal, navigate to Frontend
cd Frontend

# Install dependencies
npm install

# Create .env.local file
echo 'VITE_API_URL=http://localhost:5000/api' > .env.local

# Start development server
npm run dev
```

Frontend will run on: `http://localhost:5173`

---

## 🔐 Authentication Flow

### How JWT Authentication Works

1. **User Registration**
   ```
   User enters: email, name, password
   ↓
   Backend hashes password with bcrypt
   ↓
   Creates user in database
   ↓
   Generates JWT token
   ↓
   Returns token + user data to frontend
   ↓
   Frontend stores token in localStorage
   ```

2. **User Login**
   ```
   User enters: email, password
   ↓
   Backend verifies password
   ↓
   Generates JWT token
   ↓
   Frontend stores token
   ```

3. **Making Authenticated Requests**
   ```
   Client includes token in header:
   Authorization: Bearer {token}
   ↓
   Server verifies token (authMiddleware)
   ↓
   If valid, continue to route handler
   ↓
   If invalid/expired, return 401 Unauthorized
   ```

### Token Structure

JWT tokens contain your user info (encoded, not encrypted):
```
Header: {
  "alg": "HS256",
  "typ": "JWT"
}

Payload: {
  "id": "user_id_here",
  "email": "user@example.com",
  "role": "USER",
  "iat": 1645000000,
  "exp": 1645600000
}

Signature: HMACSHA256(header.payload, JWT_SECRET)
```

---

## 📊 Database Schema

### Users Table
Stores user accounts and authentication info.

| Column | Type | Description |
|--------|------|-------------|
| id | TEXT | Unique user ID |
| email | TEXT | Email (unique) |
| name | TEXT | User's full name |
| password | TEXT | Bcrypt hashed password |
| role | TEXT | USER or ADMIN |
| createdAt | TIMESTAMP | Account creation date |
| updatedAt | TIMESTAMP | Last update date |

### ResearchPapers Table
Stores all research papers, journals, and conferences.

| Column | Type | Description |
|--------|------|-------------|
| id | TEXT | Unique paper ID |
| title | TEXT | Paper title |
| authors | TEXT[] | Array of author names |
| type | TEXT | PAPER, JOURNAL, or CONFERENCE |
| content | TEXT | Abstract or summary |
| source | TEXT | URL or citation |
| publishDate | TIMESTAMP | Publication date |
| tags | TEXT[] | Array of tags for filtering |
| userId | TEXT | Creator's user ID (FK) |
| createdAt | TIMESTAMP | Creation date |
| updatedAt | TIMESTAMP | Last update date |

### Bookmarks Table
User's favorite papers (many-to-many relationship).

| Column | Type | Description |
|--------|------|-------------|
| id | TEXT | Unique bookmark ID |
| userId | TEXT | User who bookmarked (FK) |
| paperId | TEXT | Paper bookmarked (FK) |
| createdAt | TIMESTAMP | When bookmarked |

---

## 🔗 API Endpoints

### Authentication

```
POST   /api/auth/register
POST   /api/auth/login
GET    /api/auth/me                   (requires auth)
PUT    /api/auth/profile              (requires auth)
POST   /api/auth/change-password      (requires auth)
```

### Research Papers

```
POST   /api/research                  (requires auth - create)
GET    /api/research/search           (public - search)
GET    /api/research/:id              (public - view)
GET    /api/research/user/my-papers   (requires auth - user's papers)
PUT    /api/research/:id              (requires auth - edit own)
DELETE /api/research/:id              (requires auth - delete own)
```

### Bookmarks

```
POST   /api/bookmarks/:paperId        (requires auth - add bookmark)
DELETE /api/bookmarks/:paperId        (requires auth - remove bookmark)
GET    /api/bookmarks                 (requires auth - get user's bookmarks)
GET    /api/bookmarks/:paperId/check  (requires auth - is bookmarked?)
```

---

## 💻 Development Workflow

### Running Multiple Services

Open 3 terminals in your IDE:

**Terminal 1 - Backend Server**
```bash
cd Backend
npm run dev
# Outputs: Server running on http://localhost:5000
```

**Terminal 2 - Prisma Studio (Database GUI)**
```bash
cd Backend
npm run prisma:studio
# Opens http://localhost:5555
```

**Terminal 3 - Frontend**
```bash
cd Frontend
npm run dev
# Outputs: Local: http://localhost:5173
```

Then open: `http://localhost:5173` in your browser!

---

## 🧪 Testing the API

### Using cURL

```bash
# Health check
curl http://localhost:5000/api/health

# Register
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "name": "Test User",
    "password": "test123",
    "confirmPassword": "test123"
  }'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "test123"
  }'

# Get profile (replace TOKEN with your token)
curl http://localhost:5000/api/auth/me \
  -H "Authorization: Bearer TOKEN"

# Create paper
curl -X POST http://localhost:5000/api/research \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer TOKEN" \
  -d '{
    "title": "AI in Healthcare",
    "authors": ["John Doe"],
    "type": "PAPER",
    "content": "This paper discusses...",
    "source": "https://arxiv.org/abc123",
    "tags": ["ai", "healthcare"]
  }'

# Search papers
curl "http://localhost:5000/api/research/search?type=PAPER&search=AI&limit=10"
```

### Using Postman

1. Import [Backend URL]
2. Create Collection: "ResearchSphereHub"
3. Set variable: `base_url = http://localhost:5000`
4. Set variable: `token = your_jwt_token`
5. Create requests with `{{base_url}}` and `{{token}}`

---

## 🎨 Frontend Integration Examples

### Connecting from React

See `FRONTEND_INTEGRATION_EXAMPLES.ts` and `REACT_COMPONENT_EXAMPLES.tsx` in Backend folder for:

- API Service setup (authService, researchService, bookmarkService)
- React Component examples (Login, Search, Upload, Bookmarks)
- Axios interceptors for authentication
- Error handling patterns

### Quick Example

```typescript
// In your React component:
import { authService } from '@/services/authService';

function LoginPage() {
  const handleLogin = async () => {
    try {
      const response = await authService.login('user@example.com', 'password');
      localStorage.setItem('token', response.token);
      // Redirect to home
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return <button onClick={handleLogin}>Login</button>;
}
```

---

## 🛠️ Common Tasks

### Add a New API Endpoint

1. **Create controller method** in `src/controllers/`
   ```typescript
   static async getStats(req, res, next) {
     try {
       // Your logic here
     } catch (error) {
       next(error);
     }
   }
   ```

2. **Add validation** in the controller file
   ```typescript
   export const statsValidation = [
     query('type').optional().isIn([...])
   ];
   ```

3. **Create route** in `src/routes/`
   ```typescript
   router.get('/stats', authMiddleware, statsValidation, handleValidationErrors, Controller.getStats);
   ```

4. **Register route** in `src/index.ts`
   ```typescript
   app.use('/api/stats', statsRoutes);
   ```

### Modify Database Schema

1. Edit `prisma/schema.prisma`
2. Run: `npm run migrate`
3. This creates a migration automatically

### Reset Database

```bash
# Warning: This deletes all data!
npm run migrate reset
```

---

## 🚀 Deployment

### Backend Deployment (Heroku example)

```bash
# Install Heroku CLI
npm install -g heroku

# Login
heroku login

# Create app
heroku create your-app-name

# Set environment variables
heroku config:set DATABASE_URL=postgresql://...
heroku config:set JWT_SECRET=your_secret

# Deploy
git push heroku main

# Run migrations on Heroku
heroku run npm run migrate:prod
```

### Frontend Deployment (Vercel example)

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel
```

---

## 📖 File Guides

| File | Purpose |
|------|---------|
| **SETUP_GUIDE.md** | Detailed setup & API docs |
| **QUICK_START.md** | 5-minute quick reference |
| **prisma/schema.prisma** | Database design |
| **src/index.ts** | Express server setup |
| **src/middleware/** | Auth, validation, errors |
| **src/services/** | Business logic |
| **src/controllers/** | HTTP handlers |
| **src/routes/** | API endpoints |
| **FRONTEND_INTEGRATION_EXAMPLES.ts** | React service examples |
| **REACT_COMPONENT_EXAMPLES.tsx** | React component examples |

---

## ❓ Troubleshooting

### Server won't start
```
✓ Check PostgreSQL is running
✓ Verify DATABASE_URL in .env
✓ Check PORT 5000 isn't in use
✓ Run: npm run migrate
```

### Database errors
```
✓ Make sure PostgreSQL is running
✓ Check .env DATABASE_URL credentials
✓ Run: npm run migrate
✓ Check: npm run prisma:studio
```

### CORS errors in browser
```
✓ Ensure CORS_ORIGIN in .env = http://localhost:5173
✓ Check frontend is on correct port
✓ Restart backend server
```

### Token errors
```
✓ Token may be expired - login again
✓ Check Authorization header format: "Bearer {token}"
✓ Clear localStorage: localStorage.clear()
```

---

## 📚 Learning Resources

- [Express.js Docs](https://expressjs.com/)
- [Prisma Docs](https://www.prisma.io/docs/)
- [JWT.io](https://jwt.io/)
- [PostgreSQL Docs](https://www.postgresql.org/docs/)
- [React Docs](https://react.dev/)

---

## 🤝 Contributing

This is your project! Modify and extend as needed for your research platform.

### Next Features to Add
- Advanced filtering and sorting
- Paper recommendations
- User profiles with follow/unfollow
- Comments and discussions
- Export papers (PDF, BibTeX)
- Admin dashboard
- Email notifications

---

## 📝 License

This project is open source and available under the MIT License.

---

## 🎯 Summary

You now have a **complete, production-ready backend** for your ResearchSphereHub application:

✅ User authentication with JWT
✅ PostgreSQL database with Prisma ORM
✅ Complete REST API
✅ Type-safe TypeScript
✅ Error handling and validation
✅ CORS enabled for frontend
✅ Example React components
✅ Comprehensive documentation

**Next Step:** Connect your frontend components using the provided examples and start building your research platform!

Happy coding! 🚀
