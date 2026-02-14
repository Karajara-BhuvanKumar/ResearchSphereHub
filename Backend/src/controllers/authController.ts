import { Request, Response, NextFunction } from "express";
import { body } from "express-validator";
import { UserService } from "../services/userService.js";
import { generateToken } from "../utils/jwt.js";
import { sendSuccess, sendError } from "../utils/response.js";

export class AuthController {
  /**
   * Register a new user
   * POST /api/auth/register
   */
  static async register(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, name, password, confirmPassword } = req.body;

      // Validate passwords match
      if (password !== confirmPassword) {
        return sendError(res, new Error("Passwords do not match"), 400);
      }

      // Call service
      const user = await UserService.register({
        email,
        name,
        password,
      });

      // Generate token
      const token = generateToken(user.id, user.email, user.role);

      sendSuccess(
        res,
        {
          user,
          token,
        },
        "Registration successful",
        201
      );
    } catch (error) {
      next(error);
    }
  }

  /**
   * Login user
   * POST /api/auth/login
   */
  static async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;

      // Call service
      const user = await UserService.login({
        email,
        password,
      });

      // Generate token
      const token = generateToken(user.id, user.email, user.role);

      sendSuccess(
        res,
        {
          user,
          token,
        },
        "Login successful"
      );
    } catch (error) {
      next(error);
    }
  }

  /**
   * Get current user profile
   * GET /api/auth/me
   */
  static async getMe(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.user) {
        return sendError(res, new Error("Unauthorized"), 401);
      }

      const user = await UserService.getUserById(req.user.id);

      if (!user) {
        return sendError(res, new Error("User not found"), 404);
      }

      sendSuccess(res, user, "User profile retrieved");
    } catch (error) {
      next(error);
    }
  }

  /**
   * Update user profile
   * PUT /api/auth/profile
   */
  static async updateProfile(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.user) {
        return sendError(res, new Error("Unauthorized"), 401);
      }

      const { name, email } = req.body;

      const user = await UserService.updateProfile(req.user.id, {
        name,
        email,
      });

      sendSuccess(res, user, "Profile updated successfully");
    } catch (error) {
      next(error);
    }
  }

  /**
   * Change password
   * POST /api/auth/change-password
   */
  static async changePassword(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.user) {
        return sendError(res, new Error("Unauthorized"), 401);
      }

      const { oldPassword, newPassword, confirmPassword } = req.body;

      if (newPassword !== confirmPassword) {
        return sendError(res, new Error("Passwords do not match"), 400);
      }

      const result = await UserService.changePassword(
        req.user.id,
        oldPassword,
        newPassword
      );

      sendSuccess(res, result, "Password changed successfully");
    } catch (error) {
      next(error);
    }
  }
}

/**
 * Validation rules for auth endpoints
 */
export const authValidation = {
  register: [
    body("email").isEmail().normalizeEmail().withMessage("Invalid email"),
    body("name").trim().notEmpty().withMessage("Name is required"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters"),
    body("confirmPassword").notEmpty().withMessage("Confirm password is required"),
  ],
  login: [
    body("email").isEmail().normalizeEmail().withMessage("Invalid email"),
    body("password").notEmpty().withMessage("Password is required"),
  ],
  updateProfile: [
    body("name").optional().trim().notEmpty().withMessage("Name cannot be empty"),
    body("email")
      .optional()
      .isEmail()
      .normalizeEmail()
      .withMessage("Invalid email"),
  ],
  changePassword: [
    body("oldPassword").notEmpty().withMessage("Current password is required"),
    body("newPassword")
      .isLength({ min: 6 })
      .withMessage("New password must be at least 6 characters"),
    body("confirmPassword").notEmpty().withMessage("Confirm password is required"),
  ],
};
