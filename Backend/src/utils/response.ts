import { Response } from "express";
import { ApiError } from "./errors.js";

export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  errors?: Record<string, string>;
}

/**
 * Send success response
 */
export const sendSuccess = <T>(
  res: Response,
  data: T,
  message: string = "Success",
  statusCode: number = 200
) => {
  const response: ApiResponse<T> = {
    success: true,
    message,
    data,
  };
  res.status(statusCode).json(response);
};

/**
 * Send error response
 */
export const sendError = (
  res: Response,
  error: ApiError | Error,
  statusCode?: number
) => {
  if (error instanceof ApiError) {
    const response: ApiResponse = {
      success: false,
      message: error.message,
      errors: error.errors,
    };
    res.status(error.statusCode).json(response);
  } else {
    const response: ApiResponse = {
      success: false,
      message: error.message || "An error occurred",
    };
    res.status(statusCode || 500).json(response);
  }
};
