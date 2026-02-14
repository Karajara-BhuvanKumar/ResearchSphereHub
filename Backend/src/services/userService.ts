import { Prisma } from "@prisma/client";
import prisma from "../lib/prisma.js";
import { hashPassword, comparePassword } from "../utils/password.js";
import { unauthorizedError, conflictError } from "../utils/errors.js";

export interface RegisterInput {
  email: string;
  name: string;
  password: string;
}

export interface LoginInput {
  email: string;
  password: string;
}

/**
 * User Service - handles all user-related database operations
 */
export class UserService {
  /**
   * Register a new user
   */
  static async register(data: RegisterInput) {
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (existingUser) {
      throw conflictError("Email already registered");
    }

    // Hash password
    const hashedPassword = await hashPassword(data.password);

    // Create user
    const user = await prisma.user.create({
      data: {
        email: data.email,
        name: data.name,
        password: hashedPassword,
        role: "USER",
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true,
      },
    });

    return user;
  }

  /**
   * Login user - verify credentials
   */
  static async login(data: LoginInput) {
    const user = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (!user) {
      throw unauthorizedError("Invalid email or password");
    }

    const passwordMatch = await comparePassword(data.password, user.password);

    if (!passwordMatch) {
      throw unauthorizedError("Invalid email or password");
    }

    // Return user without password
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      createdAt: user.createdAt,
    };
  }

  /**
   * Get user by ID
   */
  static async getUserById(userId: string) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return user;
  }

  /**
   * Update user profile
   */
  static async updateProfile(
    userId: string,
    data: { name?: string; email?: string }
  ) {
    // Check if email is already taken (if trying to change email)
    if (data.email) {
      const existingUser = await prisma.user.findUnique({
        where: { email: data.email },
      });

      if (existingUser && existingUser.id !== userId) {
        throw conflictError("Email already in use");
      }
    }

    const user = await prisma.user.update({
      where: { id: userId },
      data,
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        updatedAt: true,
      },
    });

    return user;
  }

  /**
   * Change password
   */
  static async changePassword(userId: string, oldPassword: string, newPassword: string) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw unauthorizedError("User not found");
    }

    const passwordMatch = await comparePassword(oldPassword, user.password);

    if (!passwordMatch) {
      throw unauthorizedError("Current password is incorrect");
    }

    const hashedPassword = await hashPassword(newPassword);

    await prisma.user.update({
      where: { id: userId },
      data: { password: hashedPassword },
    });

    return { message: "Password changed successfully" };
  }
}
