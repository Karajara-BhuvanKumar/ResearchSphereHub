import { Router } from "express";
import { BookmarkController, bookmarkValidation } from "../controllers/bookmarkController.js";
import { handleValidationErrors } from "../middleware/validation.js";
import { authMiddleware } from "../middleware/auth.js";

const router = Router();

/**
 * All bookmark routes require authentication
 */

// Get all bookmarks for user
router.get("/", authMiddleware, BookmarkController.getUserBookmarks);

// Check if paper is bookmarked
router.get(
  "/:paperId/check",
  authMiddleware,
  bookmarkValidation.paperId,
  handleValidationErrors,
  BookmarkController.isBookmarked
);

// Add bookmark
router.post(
  "/:paperId",
  authMiddleware,
  bookmarkValidation.paperId,
  handleValidationErrors,
  BookmarkController.addBookmark
);

// Remove bookmark
router.delete(
  "/:paperId",
  authMiddleware,
  bookmarkValidation.paperId,
  handleValidationErrors,
  BookmarkController.removeBookmark
);

export default router;
