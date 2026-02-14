import jwt from "jsonwebtoken";
import { config } from "../config.js";

export interface DecodedToken {
  id: string;
  email: string;
  role: string;
  iat: number;
  exp: number;
}

/**
 * Generate JWT token for user
 */
export const generateToken = (userId: string, email: string, role: string): string => {
  return jwt.sign(
    { id: userId, email, role },
    config.jwtSecret!,
    { expiresIn: config.jwtExpire }
  );
};

/**
 * Verify and decode JWT token
 */
export const verifyToken = (token: string): DecodedToken => {
  try {
    return jwt.verify(token, config.jwtSecret!) as DecodedToken;
  } catch (error) {
    throw new Error("Invalid or expired token");
  }
};

/**
 * Extract token from Authorization header
 */
export const extractToken = (authHeader: string | undefined): string | null => {
  if (!authHeader) return null;
  
  const parts = authHeader.split(" ");
  if (parts.length !== 2 || parts[0] !== "Bearer") {
    return null;
  }
  
  return parts[1];
};
