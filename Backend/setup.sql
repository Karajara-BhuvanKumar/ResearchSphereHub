-- ResearchSphereHub Database Setup Script
-- Run this in PostgreSQL psql terminal if migrations don't work

-- Create User Table
CREATE TABLE IF NOT EXISTS "User" (
  id TEXT PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  password TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'USER',
  "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Create Index on email for faster lookups
CREATE INDEX IF NOT EXISTS "User_email_idx" ON "User"(email);

-- Create ResearchPaper Table
CREATE TABLE IF NOT EXISTS "ResearchPaper" (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  authors TEXT[] NOT NULL,
  type TEXT NOT NULL,
  content TEXT NOT NULL,
  source TEXT NOT NULL,
  "publishDate" TIMESTAMP,
  tags TEXT[],
  "userId" TEXT NOT NULL,
  "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  
  CONSTRAINT "ResearchPaper_userId_fkey" 
    FOREIGN KEY ("userId") REFERENCES "User"(id) ON DELETE CASCADE
);

-- Create indexes for ResearchPaper
CREATE INDEX IF NOT EXISTS "ResearchPaper_userId_idx" ON "ResearchPaper"("userId");
CREATE INDEX IF NOT EXISTS "ResearchPaper_type_idx" ON "ResearchPaper"(type);
CREATE INDEX IF NOT EXISTS "ResearchPaper_title_idx" ON "ResearchPaper"(title);
CREATE INDEX IF NOT EXISTS "ResearchPaper_tags_idx" ON "ResearchPaper" USING GIN(tags);

-- Create Bookmark Table
CREATE TABLE IF NOT EXISTS "Bookmark" (
  id TEXT PRIMARY KEY,
  "userId" TEXT NOT NULL,
  "paperId" TEXT NOT NULL,
  "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  
  CONSTRAINT "Bookmark_userId_fkey"
    FOREIGN KEY ("userId") REFERENCES "User"(id) ON DELETE CASCADE,
  CONSTRAINT "Bookmark_paperId_fkey"
    FOREIGN KEY ("paperId") REFERENCES "ResearchPaper"(id) ON DELETE CASCADE,
  CONSTRAINT "Bookmark_userId_paperId_key"
    UNIQUE("userId", "paperId")
);

-- Create indexes for Bookmark
CREATE INDEX IF NOT EXISTS "Bookmark_userId_idx" ON "Bookmark"("userId");
CREATE INDEX IF NOT EXISTS "Bookmark_paperId_idx" ON "Bookmark"("paperId");

-- Verify tables created
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public';
