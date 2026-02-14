import { Request, Response, NextFunction } from "express";
import { validationResult, ValidationChain } from "express-validator";
import { sendError } from "../utils/response.js";
import { validationError } from "../utils/errors.js";

/**
 * Middleware to handle validation errors
 */
export const handleValidationErrors = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
    const errorMap: Record<string, string> = {};
    errors.array().forEach((error: any) => {
      errorMap[error.path] = error.msg;
    });
    
    return sendError(
      res,
      validationError("Validation failed", errorMap)
    );
  }
  
  next();
};

/**
 * Utility function to validate and handle errors
 */
export const validate = (validations: ValidationChain[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    for (let validation of validations) {
      const result = await validation.run(req);
      if (!result.isEmpty()) {
        break;
      }
    }
    handleValidationErrors(req, res, next);
  };
};
