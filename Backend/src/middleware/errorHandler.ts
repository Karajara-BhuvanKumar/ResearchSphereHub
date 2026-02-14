import { Request, Response, NextFunction } from "express";
import { sendError } from "../utils/response.js";
import { ApiError } from "../utils/errors.js";
import { config } from "../config.js";

/**
 * Global error handler middleware
 * Should be the last middleware in app
 */
export const errorHandler = (
  error: Error | ApiError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error("Error:", error);

  if (error instanceof ApiError) {
    sendError(res, error);
  } else {
    // Generic error - don't expose internal details in production
    const message =
      config.nodeEnv === "development"
        ? error.message
        : "An unexpected error occurred";

    sendError(res, new Error(message), 500);
  }
};

/**
 * 404 handler middleware
 * Should be near the end but before error handler
 */
export const notFoundHandler = (req: Request, res: Response, next: NextFunction) => {
  const error = new ApiError(404, `Route ${req.originalUrl} not found`);
  next(error);
};
