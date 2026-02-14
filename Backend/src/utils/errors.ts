// Custom error class for API errors
export class ApiError extends Error {
  constructor(
    public statusCode: number,
    public message: string,
    public errors?: Record<string, string>
  ) {
    super(message);
    this.name = "ApiError";
  }
}

/**
 * Validation error - 400
 */
export const validationError = (message: string, errors?: Record<string, string>) => {
  return new ApiError(400, message, errors);
};

/**
 * Unauthorized error - 401
 */
export const unauthorizedError = (message: string = "Unauthorized") => {
  return new ApiError(401, message);
};

/**
 * Forbidden error - 403
 */
export const forbiddenError = (message: string = "Forbidden") => {
  return new ApiError(403, message);
};

/**
 * Not found error - 404
 */
export const notFoundError = (message: string = "Not found") => {
  return new ApiError(404, message);
};

/**
 * Conflict error - 409
 */
export const conflictError = (message: string = "Conflict") => {
  return new ApiError(409, message);
};

/**
 * Internal server error - 500
 */
export const internalError = (message: string = "Internal server error") => {
  return new ApiError(500, message);
};
