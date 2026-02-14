# Quick Start Reference

## 🚀 Quick Setup (5 minutes)

### 1. Install Dependencies
```bash
cd Backend
npm install
```

### 2. Setup Database
```bash
# Create .env file
copy .env.example .env

# Edit .env with your PostgreSQL credentials
# Then run:
npm run migrate
```

### 3. Start Server
```bash
npm run dev
```

✅ Server running on http://localhost:5000

---

## 📌 Common Commands

```bash
# Development
npm run dev              # Start with auto-reload
npm run prisma:studio   # View database GUI

# Database
npm run migrate         # Run migrations
npm run migrate:prod    # Production migration

# Build
npm run build           # Compile TypeScript
npm run start           # Run compiled code

# Validation
npm run type-check      # Check TypeScript
npm run lint            # Lint code
```

---

## 🔗 API Quick Test

```bash
# Health check
curl http://localhost:5000/api/health

# Register
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "name": "John Doe",
    "password": "password123",
    "confirmPassword": "password123"
  }'

# Login and get token
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "password123"
  }'

# Use token in Authorization header
curl http://localhost:5000/api/auth/me \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

---

## 🛠️ Troubleshooting

| Error | Solution |
|-------|----------|
| `Port 5000 in use` | Change PORT in .env or kill process |
| `Database connection error` | Verify PostgreSQL running and DATABASE_URL correct |
| `JWT_SECRET not set` | Add JWT_SECRET to .env |
| `Token invalid` | Token may be expired, re-login |
| `CORS error` | Update CORS_ORIGIN in .env to frontend URL |

---

## 📚 Full Documentation

See `SETUP_GUIDE.md` for complete setup and API documentation.
