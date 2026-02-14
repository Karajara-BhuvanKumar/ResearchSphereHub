import { Request, Response, NextFunction } from "express";
import { extractToken, verifyToken, DecodedToken } from "../utils/jwt.js";
import { sendError } from "../utils/response.js";
import { unauthorizedError } from "../utils/errors.js";

// Extend Express Request to include user data
declare global {
  namespace Express {
    interface Request {
      user?: DecodedToken;
    }
  }
}

/**
 * Middleware to verify JWT token and attach user to request
 */
export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = extractToken(req.headers.authorization);

    if (!token) {
      return sendError(res, unauthorizedError("No token provided"));
    }

    const decoded = verifyToken(token);
    req.user = decoded;
    next();
  } catch (error) {
    sendError(res, unauthorizedError("Invalid or expired token"));
  }
};

/**
 * Middleware to check if user is admin
 */
export const adminMiddleware = (req: Request, res: Response, next: NextFunction) => {
  if (!req.user) {
    return sendError(res, unauthorizedError("Authentication required"));
  }

  if (req.user.role !== "ADMIN") {
    return sendError(res, unauthorizedError("Admin access required"), 403);
  }

  next();
};

/**
 * Optional auth middleware - user is attached if exists, but doesn't block
 */
export const optionalAuthMiddleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = extractToken(req.headers.authorization);
    if (token) {
      const decoded = verifyToken(token);
      req.user = decoded;
    }
  } catch (error) {
    // Silently ignore token errors - auth is optional
  }
  next();
};
