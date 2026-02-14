import { Request, Response, NextFunction } from "express";
import { body, query } from "express-validator";
import { ResearchService } from "../services/researchService.js";
import { sendSuccess, sendError } from "../utils/response.js";

export class ResearchController {
  /**
   * Create a new research paper
   * POST /api/research
   */
  static async createResearchPaper(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.user) {
        return sendError(res, new Error("Unauthorized"), 401);
      }

      const { title, authors, type, content, source, publishDate, tags } = req.body;

      const paper = await ResearchService.createResearchPaper(req.user.id, {
        title,
        authors,
        type,
        content,
        source,
        publishDate: publishDate ? new Date(publishDate) : undefined,
        tags,
      });

      sendSuccess(res, paper, "Research paper created successfully", 201);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Get a single research paper
   * GET /api/research/:id
   */
  static async getResearchPaper(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const paper = await ResearchService.getResearchPaperById(id);

      sendSuccess(res, paper, "Research paper retrieved");
    } catch (error) {
      next(error);
    }
  }

  /**
   * Search and filter research papers
   * GET /api/research/search?type=PAPER&tags=ai,ml&search=machine
   */
  static async searchResearchPapers(req: Request, res: Response, next: NextFunction) {
    try {
      const { type, tags, search, limit = 10, offset = 0 } = req.query;

      const filters = {
        type: type as any,
        tags: tags ? (typeof tags === "string" ? [tags] : tags) : undefined,
        search: search as string,
        limit: parseInt(limit as string),
        offset: parseInt(offset as string),
      };

      const result = await ResearchService.searchResearchPapers(filters);

      sendSuccess(res, result, "Search completed");
    } catch (error) {
      next(error);
    }
  }

  /**
   * Get user's research papers
   * GET /api/research/user/my-papers
   */
  static async getUserResearchPapers(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.user) {
        return sendError(res, new Error("Unauthorized"), 401);
      }

      const { limit = 10, offset = 0 } = req.query;

      const result = await ResearchService.getUserResearchPapers(
        req.user.id,
        parseInt(limit as string),
        parseInt(offset as string)
      );

      sendSuccess(res, result, "User papers retrieved");
    } catch (error) {
      next(error);
    }
  }

  /**
   * Update a research paper
   * PUT /api/research/:id
   */
  static async updateResearchPaper(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.user) {
        return sendError(res, new Error("Unauthorized"), 401);
      }

      const { id } = req.params;
      const { title, authors, content, source, publishDate, tags } = req.body;

      const paper = await ResearchService.updateResearchPaper(id, req.user.id, {
        title,
        authors,
        content,
        source,
        publishDate: publishDate ? new Date(publishDate) : undefined,
        tags,
      });

      sendSuccess(res, paper, "Research paper updated");
    } catch (error) {
      next(error);
    }
  }

  /**
   * Delete a research paper
   * DELETE /api/research/:id
   */
  static async deleteResearchPaper(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.user) {
        return sendError(res, new Error("Unauthorized"), 401);
      }

      const { id } = req.params;

      const result = await ResearchService.deleteResearchPaper(id, req.user.id);

      sendSuccess(res, result, "Research paper deleted");
    } catch (error) {
      next(error);
    }
  }
}

/**
 * Validation rules for research endpoints
 */
export const researchValidation = {
  create: [
    body("title").trim().notEmpty().withMessage("Title is required"),
    body("authors")
      .isArray({ min: 1 })
      .withMessage("At least one author is required"),
    body("type")
      .isIn(["PAPER", "JOURNAL", "CONFERENCE"])
      .withMessage("Invalid research type"),
    body("content").trim().notEmpty().withMessage("Content is required"),
    body("source").trim().notEmpty().withMessage("Source is required"),
    body("publishDate")
      .optional()
      .isISO8601()
      .withMessage("Invalid date format"),
    body("tags")
      .optional()
      .isArray()
      .withMessage("Tags must be an array"),
  ],
  update: [
    body("title").optional().trim().notEmpty().withMessage("Title cannot be empty"),
    body("authors")
      .optional()
      .isArray({ min: 1 })
      .withMessage("At least one author is required"),
    body("content").optional().trim().notEmpty().withMessage("Content cannot be empty"),
    body("source").optional().trim().notEmpty().withMessage("Source cannot be empty"),
    body("publishDate")
      .optional()
      .isISO8601()
      .withMessage("Invalid date format"),
    body("tags")
      .optional()
      .isArray()
      .withMessage("Tags must be an array"),
  ],
  search: [
    query("type")
      .optional()
      .isIn(["PAPER", "JOURNAL", "CONFERENCE"])
      .withMessage("Invalid type"),
    query("limit")
      .optional()
      .isInt({ min: 1, max: 100 })
      .withMessage("Limit must be between 1 and 100"),
    query("offset")
      .optional()
      .isInt({ min: 0 })
      .withMessage("Offset must be a positive number"),
  ],
};
