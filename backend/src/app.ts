import express from "express";
import createError from "http-errors";
import cookieParser from "cookie-parser";
import logger from "morgan";
import cors from "cors";
import rateLimit from "express-rate-limit";
import { connectDB, disconnectDB } from "./config/db";

// Import Routes
import mainRouter from "./routes/mainRoutes";
import userRouter from "./routes/userRoutes";
import adminRouter from "./routes/adminRoutes";
import sellerRouter from "./routes/sellerRoutes";
import productAdminRouter from "./routes/productRoutes";  // Admin routes for products
import productSellerRouter from "./routes/sellerProductRoutes"; // Seller routes for products

const app = express();

// ✅ MongoDB Connection
connectDB();

// ✅ CORS Configuration
app.use(cors({ origin: process.env.FRONTEND_URL || "http://localhost:8000" }));

// ✅ Rate Limiting
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 100 }));

// ✅ Middleware
app.use(logger("dev"));
app.use(express.json());  // Parse JSON bodies
app.use(express.urlencoded({ extended: false }));  // Parse URL-encoded bodies
app.use(cookieParser());

// ✅ Route Definitions
app.use("/api/main", mainRouter);
app.use("/api/user", userRouter);
app.use("/api/seller", sellerRouter);  // Seller-specific routes
app.use("/api/admin", adminRouter);  // Admin-specific routes

// Product routes for admin and seller
app.use("/api/admin/products", productAdminRouter);  // Admin route for managing products
app.use("/api/seller/products", productSellerRouter);  // Seller route for managing products

// ✅ Catch 404 Errors
app.use((req, res, next) => {
  next(createError(404));
});

// ✅ Error Handler
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  res.status(err.status || 500);
  res.json({ error: err.message });
});

// Start the server
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});

// Handle server shutdown gracefully
process.on("SIGINT", async () => {
  await disconnectDB();
  server.close(() => {
    console.log("🔌 Server shut down gracefully.");
    process.exit(0);
  });
});

process.on("SIGTERM", async () => {
  await disconnectDB();
  server.close(() => {
    console.log("🔌 Server shut down gracefully.");
    process.exit(0);
  });
});

export default app;