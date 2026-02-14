# PostgreSQL Database Guide for ResearchSphereHub

## 🗄️ Database Setup Instructions

### Option 1: Using PostgreSQL CLI (psql)

#### Windows with PostgreSQL Installed

1. Open Command Prompt or PowerShell
2. Connect to PostgreSQL:
```bash
psql -U postgres
```
(Default password is usually blank, or you set it during installation)

3. Run these commands:
```sql
-- Create user
CREATE USER researchsphere_user WITH PASSWORD 'YourSecurePassword123!';

-- Create database
CREATE DATABASE researchsphere_db OWNER researchsphere_user;

-- Grant privileges
GRANT ALL PRIVILEGES ON DATABASE researchsphere_db TO researchsphere_user;
\c researchsphere_db
GRANT ALL PRIVILEGES ON SCHEMA public TO researchsphere_user;

-- Verify
\du          -- List users
\l           -- List databases
```

#### Mac with PostgreSQL Installed

1. Open Terminal
2. Connect:
```bash
psql postgres
```

3. Run the same SQL commands above

#### Using Docker (Easiest)

```bash
# Pull PostgreSQL image
docker pull postgres:15

# Run container
docker run --name researchsphere-postgres \
  -e POSTGRES_USER=researchsphere_user \
  -e POSTGRES_PASSWORD=YourSecurePassword123! \
  -e POSTGRES_DB=researchsphere_db \
  -p 5432:5432 \
  -d postgres:15

# Connect to it
docker exec -it researchsphere-postgres psql -U researchsphere_user -d researchsphere_db
```

---

### Option 2: Using pgAdmin (GUI)

1. Download pgAdmin: https://www.pgadmin.org/download/
2. Open pgAdmin
3. Create new Server:
   - Right-click "Servers" → Register → Server
   - Name: "ResearchSphereHub"
   - Host: localhost
   - Port: 5432
4. Create Database:
   - Right-click database → Create → Database
   - Name: researchsphere_db
   - Owner: researchsphere_user

---

## 📊 Database Tables & Relationships

### User Table
Stores all user accounts.

```sql
CREATE TABLE "User" (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  password TEXT NOT NULL,                    -- bcrypt hash
  role TEXT NOT NULL DEFAULT 'USER',         -- USER or ADMIN
  "createdAt" TIMESTAMP DEFAULT NOW(),
  "updatedAt" TIMESTAMP DEFAULT NOW()
);

CREATE INDEX "User_email_idx" ON "User"(email);
```

### ResearchPaper Table
Stores papers, journals, and conference papers.

```sql
CREATE TABLE "ResearchPaper" (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  title TEXT NOT NULL,
  authors TEXT[] NOT NULL,                   -- Array of author names
  type TEXT NOT NULL,                        -- PAPER | JOURNAL | CONFERENCE
  content TEXT NOT NULL,                     -- Abstract/summary
  source TEXT NOT NULL,                      -- URL or citation
  "publishDate" TIMESTAMP,                   -- Optional
  tags TEXT[],                               -- Array for filtering
  "userId" TEXT NOT NULL REFERENCES "User"(id) ON DELETE CASCADE,
  "createdAt" TIMESTAMP DEFAULT NOW(),
  "updatedAt" TIMESTAMP DEFAULT NOW()
);

CREATE INDEX "ResearchPaper_userId_idx" ON "ResearchPaper"("userId");
CREATE INDEX "ResearchPaper_type_idx" ON "ResearchPaper"(type);
CREATE INDEX "ResearchPaper_title_idx" ON "ResearchPaper"(title);
CREATE INDEX "ResearchPaper_tags_idx" ON "ResearchPaper" USING GIN(tags);
```

### Bookmark Table
Many-to-Many relationship between Users and ResearchPapers.

```sql
CREATE TABLE "Bookmark" (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  "userId" TEXT NOT NULL REFERENCES "User"(id) ON DELETE CASCADE,
  "paperId" TEXT NOT NULL REFERENCES "ResearchPaper"(id) ON DELETE CASCADE,
  "createdAt" TIMESTAMP DEFAULT NOW(),
  
  UNIQUE("userId", "paperId")                -- Only one bookmark per user-paper combo
);

CREATE INDEX "Bookmark_userId_idx" ON "Bookmark"("userId");
CREATE INDEX "Bookmark_paperId_idx" ON "Bookmark"("paperId");
```

---

## 🔄 Relationships Diagram

```
User (1) ─────────────── (Many) ResearchPaper
  │                              │
  │                              │
  │        (Many)       (Many)   │
  └──────────Bookmark────────────┘

Explanation:
- One User can create Many ResearchPapers
- One User can Bookmark Many ResearchPapers
- One ResearchPaper can be Bookmarked by Many Users
```

---

## 🚀 Running Migrations

The Prisma schema is in `prisma/schema.prisma`. With it, you can auto-generate and run migrations:

```bash
# Initial setup - generates migration and runs it
npm run migrate

# If you modify schema.prisma, run:
npm run migrate

# View database in GUI
npm run prisma:studio

# Reset entire database (WARNING: DELETES ALL DATA)
npm run migrate reset

# Production deployment
npm run migrate:prod
```

---

## 📝 SQL Query Examples

### Common Queries

#### Get User with All Papers

```sql
SELECT u.*, 
       COUNT(rp.id) as paper_count,
       COUNT(b.id) as bookmark_count
FROM "User" u
LEFT JOIN "ResearchPaper" rp ON u.id = rp."userId"
LEFT JOIN "Bookmark" b ON u.id = b."userId"
WHERE u.email = 'user@example.com'
GROUP BY u.id;
```

#### Search Papers by Title

```sql
SELECT * FROM "ResearchPaper"
WHERE title ILIKE '%machine learning%'
ORDER BY "createdAt" DESC
LIMIT 10;
```

#### Get Papers by Type with Tag Filtering

```sql
SELECT * FROM "ResearchPaper"
WHERE type = 'PAPER'
  AND tags && ARRAY['AI', 'ML']        -- && means array overlap
ORDER BY "publishDate" DESC;
```

#### Get User's Bookmarks

```sql
SELECT rp.*, u.name as creator_name
FROM "Bookmark" b
JOIN "ResearchPaper" rp ON b."paperId" = rp.id
JOIN "User" u ON rp."userId" = u.id
WHERE b."userId" = 'user_id_here'
ORDER BY b."createdAt" DESC;
```

#### Count Papers by Type

```sql
SELECT type, COUNT(*) as count
FROM "ResearchPaper"
GROUP BY type;
```

#### Find Most Bookmarked Papers

```sql
SELECT rp.id, rp.title, COUNT(b.id) as bookmark_count
FROM "ResearchPaper" rp
LEFT JOIN "Bookmark" b ON rp.id = b."paperId"
GROUP BY rp.id, rp.title
ORDER BY bookmark_count DESC
LIMIT 10;
```

#### Delete User and All Their Data

```sql
-- Cascading delete handles this automatically
DELETE FROM "User" WHERE id = 'user_id_here';
```

---

## 🔍 Array Operations in PostgreSQL

PostgreSQL has special operators for arrays:

```sql
-- Check if array contains value
WHERE tags @> ARRAY['AI']

-- Check if arrays overlap
WHERE tags && ARRAY['AI', 'ML']

-- Concatenate arrays
UPDATE "ResearchPaper" SET tags = array_append(tags, 'new-tag')

-- Remove from array
UPDATE "ResearchPaper" SET tags = array_remove(tags, 'old-tag')

-- Convert array to multiple rows
SELECT id, unnest(authors) as author FROM "ResearchPaper"
```

---

## 📈 Performance Tips

### Indexing Strategy

Already covered in our schema:

```sql
-- Index on frequently searched columns
CREATE INDEX "ResearchPaper_userId_idx" ON "ResearchPaper"("userId");
CREATE INDEX "ResearchPaper_type_idx" ON "ResearchPaper"(type);
CREATE INDEX "ResearchPaper_title_idx" ON "ResearchPaper"(title);

-- GIN index for array searches
CREATE INDEX "ResearchPaper_tags_idx" ON "ResearchPaper" USING GIN(tags);
```

### Query Tips

1. **Always use LIMIT for searches**
   ```sql
   SELECT * FROM "ResearchPaper" LIMIT 20 OFFSET 0;
   ```

2. **Use prepared statements (Prisma does this automatically)**

3. **Index on foreign keys and filter columns**

4. **Use EXPLAIN to analyze slow queries**
   ```sql
   EXPLAIN ANALYZE SELECT * FROM "ResearchPaper" WHERE type = 'PAPER';
   ```

---

## 🔐 Security

### Password Handling

Passwords are hashed with bcrypt (never store plain text):

```typescript
// Backend does this automatically:
import bcrypt from 'bcrypt';

const hashedPassword = await bcrypt.hash(plainPassword, 10);
const isMatch = await bcrypt.compare(plainPassword, hashedPassword);
```

### SQL Injection Prevention

With Prisma ORM, you're protected:

```typescript
// Safe - uses parameterized queries
const user = await prisma.user.findUnique({
  where: { email: userInput }
});

// Don't do this (unsafe):
const query = `SELECT * FROM "User" WHERE email = '${userInput}'`;
```

---

## 🧪 Test Data

Insert test data for development:

```sql
-- Insert test user
INSERT INTO "User" (id, email, name, password, role)
VALUES (
  'test-user-1',
  'test@example.com',
  'Test User',
  '$2b$10$XXX...',  -- bcrypt hash of 'password123'
  'USER'
);

-- Insert test paper
INSERT INTO "ResearchPaper" 
(id, title, authors, type, content, source, tags, "userId")
VALUES (
  'paper-1',
  'Machine Learning in Healthcare',
  ARRAY['John Doe', 'Jane Smith'],
  'PAPER',
  'This paper explores the use of machine learning...',
  'https://arxiv.org/abc123',
  ARRAY['AI', 'Healthcare', 'ML'],
  'test-user-1'
);

-- Insert bookmark
INSERT INTO "Bookmark" ("userId", "paperId")
VALUES ('test-user-1', 'paper-1');
```

---

## 🔧 Backup & Restore

### Backup Database

```bash
# Windows
pg_dump -U researchsphere_user -h localhost researchsphere_db > backup.sql

# Mac/Linux
pg_dump -U researchsphere_user -h localhost researchsphere_db > backup.sql
```

### Restore Database

```bash
psql -U researchsphere_user -h localhost researchsphere_db < backup.sql
```

### Backup with Docker

```bash
docker exec researchsphere-postgres pg_dump -U researchsphere_user researchsphere_db > backup.sql
```

---

## 📊 Monitoring Queries

### Check Active Connections

```sql
SELECT datname, usename, state
FROM pg_stat_activity
WHERE datname = 'researchsphere_db';
```

### Check Database Size

```sql
SELECT pg_size_pretty(pg_database_size('researchsphere_db'));
```

### Check Table Sizes

```sql
SELECT schemaname, tablename, pg_size_pretty(pg_total_relation_size(schemaname||'.'||tablename)) as size
FROM pg_tables
ORDER BY pg_total_relation_size(schemaname||'.'||tablename) DESC;
```

### Kill Idle Connections

```sql
SELECT pg_terminate_backend(pid)
FROM pg_stat_activity
WHERE datname = 'researchsphere_db'
  AND state = 'idle'
  AND query_start < now() - interval '10 minutes';
```

---

## 🐛 Troubleshooting

### Connection Error

```
FATAL: role "researchsphere_user" does not exist
```

**Solution:** Run the CREATE USER command first

### Permission Denied

```
permission denied for schema public
```

**Solution:**
```sql
GRANT ALL PRIVILEGES ON SCHEMA public TO researchsphere_user;
```

### Database Locked

```
ERROR: database is locked
```

**Solution:** Kill idle connections (see Monitoring section above)

---

## 📚 Further Learning

- [PostgreSQL Official Docs](https://www.postgresql.org/docs/)
- [Prisma Documentation](https://www.prisma.io/docs/)
- [SQL Tutorial](https://www.sqltutorial.org/)
- [PostgreSQL Cheat Sheet](https://www.postgresqltutorial.com/postgresql-cheat-sheet/)

---

## ✅ Verification Checklist

After setup, verify everything works:

```sql
-- 1. Check PostgreSQL is running
SELECT version();

-- 2. Verify database exists
\l

-- 3. Verify tables are created
\dt

-- 4. Verify indexes
\di

-- 5. Insert test user
INSERT INTO "User" (id, email, name, password, role)
VALUES ('test', 'test@test.com', 'Test', 'hash', 'USER');

-- 6. Query test user
SELECT * FROM "User" WHERE email = 'test@test.com';

-- 7. Delete test data
DELETE FROM "User" WHERE email = 'test@test.com';
```

All ready! Your database is now set up for ResearchSphereHub! 🎉
