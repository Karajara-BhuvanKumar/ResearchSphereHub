import express, { Express, Request, Response } from "express";
import cors from "cors";
import { config } from "./config.js";
import { errorHandler, notFoundHandler } from "./middleware/errorHandler.js";

// Import routes
import authRoutes from "./routes/authRoutes.js";
import researchRoutes from "./routes/researchRoutes.js";
import bookmarkRoutes from "./routes/bookmarkRoutes.js";

const app: Express = express();

/**
 * Middleware Setup
 */

// Body parser
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

// CORS - allow frontend to communicate with backend
app.use(
  cors({
    origin: config.corsOrigin,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Request logging in development
if (config.nodeEnv === "development") {
  app.use((req: Request, res: Response, next) => {
    console.log(`${req.method} ${req.path}`);
    next();
  });
}

/**
 * Root endpoint
 */
app.get("/", (req: Request, res: Response) => {
  res.json({
    success: true,
    message: "Welcome to ResearchSphereHub API",
    version: "1.0.0",
    timestamp: new Date().toISOString(),
  });
});

/**
 * Health check endpoint
 */
app.get("/api/health", (req: Request, res: Response) => {
  res.json({
    status: "OK",
    timestamp: new Date().toISOString(),
    environment: config.nodeEnv,
  });
});

/**
 * API Routes
 */
app.use("/api/auth", authRoutes);
app.use("/api/research", researchRoutes);
app.use("/api/bookmarks", bookmarkRoutes);

/**
 * 404 Handler
 */
app.use(notFoundHandler);

/**
 * Global Error Handler
 * Should be last
 */
app.use(errorHandler);

/**
 * Start Server
 */
const startServer = async () => {
  try {
    const port = config.port;

    app.listen(port, () => {
      console.log(`
╔════════════════════════════════════════════╗
║   ResearchSphereHub Backend Server Started ║
╚════════════════════════════════════════════╝

📌 Server running on: http://localhost:${port}
🔐 Environment: ${config.nodeEnv}
🌐 CORS enabled for: ${config.corsOrigin}

📚 API Endpoints:
   - POST   /api/auth/register
   - POST   /api/auth/login
   - GET    /api/auth/me
   - PUT    /api/auth/profile
   - POST   /api/auth/change-password
   - GET    /api/research/search
   - GET    /api/research/:id
   - POST   /api/research
   - PUT    /api/research/:id
   - DELETE /api/research/:id
   - GET    /api/bookmarks
   - POST   /api/bookmarks/:paperId
   - DELETE /api/bookmarks/:paperId
      `);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
