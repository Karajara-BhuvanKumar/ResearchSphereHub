import { Router } from "express";
import { AuthController, authValidation } from "../controllers/authController.js";
import { handleValidationErrors } from "../middleware/validation.js";
import { authMiddleware } from "../middleware/auth.js";

const router = Router();

/**
 * Public routes
 */
router.post(
  "/register",
  authValidation.register,
  handleValidationErrors,
  AuthController.register
);

router.post(
  "/login",
  authValidation.login,
  handleValidationErrors,
  AuthController.login
);

/**
 * Protected routes (require authentication)
 */
router.get("/me", authMiddleware, AuthController.getMe);

router.put(
  "/profile",
  authMiddleware,
  authValidation.updateProfile,
  handleValidationErrors,
  AuthController.updateProfile
);

router.post(
  "/change-password",
  authMiddleware,
  authValidation.changePassword,
  handleValidationErrors,
  AuthController.changePassword
);

export default router;
