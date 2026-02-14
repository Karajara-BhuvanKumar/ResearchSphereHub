// Environment configuration
import dotenv from "dotenv";

dotenv.config();

export const config = {
  // Server
  port: process.env.PORT || 5000,
  nodeEnv: process.env.NODE_ENV || "development",

  // Database
  databaseUrl: process.env.DATABASE_URL,

  // JWT
  jwtSecret: process.env.JWT_SECRET,
  jwtExpire: process.env.JWT_EXPIRE || "7d",

  // CORS
  corsOrigin: process.env.CORS_ORIGIN || "http://localhost:5173",

  // Bcrypt
  bcryptRounds: parseInt(process.env.BCRYPT_ROUNDS || "10"),
};

// Validate required env variables
if (!config.databaseUrl) {
  throw new Error("DATABASE_URL environment variable is not set");
}

if (!config.jwtSecret) {
  throw new Error("JWT_SECRET environment variable is not set");
}
