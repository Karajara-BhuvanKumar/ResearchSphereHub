-- CreateEnumUserRole
CREATE TYPE "UserRole" AS ENUM ('USER', 'ADMIN');

-- CreateEnumResearchType
CREATE TYPE "ResearchType" AS ENUM ('PAPER', 'JOURNAL', 'CONFERENCE');

-- CreateTable User
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "UserRole" NOT NULL DEFAULT 'USER',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable ResearchPaper
CREATE TABLE "ResearchPaper" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "authors" TEXT[] NOT NULL,
    "type" "ResearchType" NOT NULL,
    "content" TEXT NOT NULL,
    "source" TEXT NOT NULL,
    "publishDate" TIMESTAMP(3),
    "tags" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "ResearchPaper_pkey" PRIMARY KEY ("id")
);

-- CreateTable Bookmark
CREATE TABLE "Bookmark" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,
    "paperId" TEXT NOT NULL,

    CONSTRAINT "Bookmark_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "User_email_idx" ON "User"("email");

-- CreateIndex
CREATE INDEX "ResearchPaper_userId_idx" ON "ResearchPaper"("userId");

-- CreateIndex
CREATE INDEX "ResearchPaper_type_idx" ON "ResearchPaper"("type");

-- CreateIndex
CREATE INDEX "ResearchPaper_title_idx" ON "ResearchPaper"("title");

-- CreateIndex
CREATE INDEX "ResearchPaper_tags_idx" ON "ResearchPaper" USING GIN("tags");

-- CreateIndex
CREATE UNIQUE INDEX "Bookmark_userId_paperId_key" ON "Bookmark"("userId", "paperId");

-- CreateIndex
CREATE INDEX "Bookmark_userId_idx" ON "Bookmark"("userId");

-- CreateIndex
CREATE INDEX "Bookmark_paperId_idx" ON "Bookmark"("paperId");

-- AddForeignKey
ALTER TABLE "ResearchPaper" ADD CONSTRAINT "ResearchPaper_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bookmark" ADD CONSTRAINT "Bookmark_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bookmark" ADD CONSTRAINT "Bookmark_paperId_fkey" FOREIGN KEY ("paperId") REFERENCES "ResearchPaper"("id") ON DELETE CASCADE ON UPDATE CASCADE;
