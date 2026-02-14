import prisma from "../lib/prisma.js";
import { notFoundError } from "../utils/errors.js";

/**
 * Bookmark Service - handles bookmark operations
 */
export class BookmarkService {
  /**
   * Add a paper to bookmarks
   */
  static async addBookmark(userId: string, paperId: string) {
    // Check if paper exists
    const paper = await prisma.researchPaper.findUnique({
      where: { id: paperId },
    });

    if (!paper) {
      throw notFoundError("Research paper not found");
    }

    // Create bookmark (upsert to avoid duplicates)
    const bookmark = await prisma.bookmark.upsert({
      where: {
        userId_paperId: {
          userId,
          paperId,
        },
      },
      update: {}, // Do nothing if already exists
      create: {
        userId,
        paperId,
      },
      include: {
        paper: true,
      },
    });

    return bookmark;
  }

  /**
   * Remove a paper from bookmarks
   */
  static async removeBookmark(userId: string, paperId: string) {
    const bookmark = await prisma.bookmark.deleteMany({
      where: {
        userId,
        paperId,
      },
    });

    if (bookmark.count === 0) {
      throw notFoundError("Bookmark not found");
    }

    return { message: "Bookmark removed successfully" };
  }

  /**
   * Get all bookmarks for a user
   */
  static async getUserBookmarks(
    userId: string,
    limit: number = 10,
    offset: number = 0
  ) {
    const [bookmarks, total] = await Promise.all([
      prisma.bookmark.findMany({
        where: { userId },
        include: {
          paper: {
            include: {
              user: {
                select: {
                  id: true,
                  name: true,
                },
              },
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
        take: limit,
        skip: offset,
      }),
      prisma.bookmark.count({ where: { userId } }),
    ]);

    return {
      data: bookmarks,
      total,
      limit,
      offset,
      pages: Math.ceil(total / limit),
    };
  }

  /**
   * Check if a paper is bookmarked by user
   */
  static async isBookmarked(userId: string, paperId: string) {
    const bookmark = await prisma.bookmark.findUnique({
      where: {
        userId_paperId: {
          userId,
          paperId,
        },
      },
    });

    return !!bookmark;
  }
}
