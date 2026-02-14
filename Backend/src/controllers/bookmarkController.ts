import { Request, Response, NextFunction } from "express";
import { param } from "express-validator";
import { BookmarkService } from "../services/bookmarkService.js";
import { sendSuccess, sendError } from "../utils/response.js";

export class BookmarkController {
  /**
   * Add a paper to bookmarks
   * POST /api/bookmarks/:paperId
   */
  static async addBookmark(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.user) {
        return sendError(res, new Error("Unauthorized"), 401);
      }

      const { paperId } = req.params;

      const bookmark = await BookmarkService.addBookmark(req.user.id, paperId);

      sendSuccess(res, bookmark, "Paper added to bookmarks", 201);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Remove a paper from bookmarks
   * DELETE /api/bookmarks/:paperId
   */
  static async removeBookmark(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.user) {
        return sendError(res, new Error("Unauthorized"), 401);
      }

      const { paperId } = req.params;

      const result = await BookmarkService.removeBookmark(req.user.id, paperId);

      sendSuccess(res, result, "Bookmark removed");
    } catch (error) {
      next(error);
    }
  }

  /**
   * Get all bookmarks for authenticated user
   * GET /api/bookmarks
   */
  static async getUserBookmarks(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.user) {
        return sendError(res, new Error("Unauthorized"), 401);
      }

      const { limit = 10, offset = 0 } = req.query;

      const result = await BookmarkService.getUserBookmarks(
        req.user.id,
        parseInt(limit as string),
        parseInt(offset as string)
      );

      sendSuccess(res, result, "Bookmarks retrieved");
    } catch (error) {
      next(error);
    }
  }

  /**
   * Check if a paper is bookmarked
   * GET /api/bookmarks/:paperId/check
   */
  static async isBookmarked(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.user) {
        return sendError(res, new Error("Unauthorized"), 401);
      }

      const { paperId } = req.params;

      const isBookmarked = await BookmarkService.isBookmarked(req.user.id, paperId);

      sendSuccess(res, { isBookmarked }, "Bookmark status retrieved");
    } catch (error) {
      next(error);
    }
  }
}

/**
 * Validation rules for bookmark endpoints
 */
export const bookmarkValidation = {
  paperId: [
    param("paperId")
      .trim()
      .notEmpty()
      .withMessage("Paper ID is required"),
  ],
};
