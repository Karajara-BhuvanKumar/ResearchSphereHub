import { Router } from "express";
import {
  ResearchController,
  researchValidation,
} from "../controllers/researchController.js";
import { handleValidationErrors } from "../middleware/validation.js";
import { authMiddleware, optionalAuthMiddleware } from "../middleware/auth.js";

const router = Router();

/**
 * Public routes - anyone can search
 */
router.get(
  "/search",
  researchValidation.search,
  handleValidationErrors,
  ResearchController.searchResearchPapers
);

router.get("/:id", optionalAuthMiddleware, ResearchController.getResearchPaper);

/**
 * Protected routes - require authentication
 */

// User's own papers
router.get(
  "/user/my-papers",
  authMiddleware,
  ResearchController.getUserResearchPapers
);

// CRUD operations (require auth)
router.post(
  "/",
  authMiddleware,
  researchValidation.create,
  handleValidationErrors,
  ResearchController.createResearchPaper
);

router.put(
  "/:id",
  authMiddleware,
  researchValidation.update,
  handleValidationErrors,
  ResearchController.updateResearchPaper
);

router.delete("/:id", authMiddleware, ResearchController.deleteResearchPaper);

export default router;
