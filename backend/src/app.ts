import express, { Request, Response, NextFunction } from "express";
import createError from "http-errors";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import cors from "cors";
import mongoose from "./config/db";

// ✅ Load Environment Variables
import dotenv from "dotenv";
dotenv.config();

// Import Routes
import mainRouter from "./routes/mainRoutes";
import userRouter from "./routes/userRoutes";
import adminRouter from "./routes/adminRoutes";
import sellerRouter from "./routes/sellerRoutes";

// Initialize Express App
const app = express();

// ✅ Set Global Base Directory
(global as any).__basedir = __dirname;

// ✅ CORS Configuration (with Security Considerations)
const corsOptions = {
    origin: process.env.FRONTEND_URL || "http://localhost:8000",
    optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

// ✅ Middleware Setup
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// ✅ MongoDB Connection Setup
const mongoURI = process.env.MONGO_URI;

if (!mongoURI) {
    console.error("❌ MONGO_URI is not defined. Check your .env file.");
    process.exit(1);
}

mongoose.set("strictQuery", false);  // Updated to false in newer Mongoose versions
mongoose
    .connect(mongoURI)
    .then(() => console.log("✅ Connected to MongoDB successfully!"))
    .catch((err: Error) => {
        console.error("❌ MongoDB Connection Error:", err.message);
        process.exit(1); // Stop the server if the DB connection fails
    });

// ✅ Route Handlers
app.use("/main", mainRouter);
app.use("/user", userRouter);
app.use("/seller", sellerRouter);
app.use("/admin", adminRouter);

// ✅ Catch 404 Errors and Forward
app.use((req: Request, res: Response, next: NextFunction) => {
    next(createError(404, "Route not found"));
});

// ✅ Centralized Error Handling Middleware
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    console.error("❌ Error:", err.message); // Log error for debugging

    res.status(err.status || 500).json({
        success: false,
        message: err.message || "Internal Server Error",
        error: req.app.get("env") === "development" ? err : {},
    });
});

// ✅ Export the App
export default app;
