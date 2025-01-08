import express, { Request, Response, NextFunction } from "express";
import createError from "http-errors";
import cookieParser from "cookie-parser";
import logger from "morgan";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import mongoose from "./config/db";
import dotenv from "dotenv";
dotenv.config();

import mainRouter from "./routes/mainRoutes";
import userRouter from "./routes/userRoutes";
import adminRouter from "./routes/adminRoutes";
import sellerRouter from "./routes/sellerRoutes";

const app = express();

(global as any).__basedir = __dirname;

// Configurations from environment variables
const config = {
    mongoURI: process.env.MONGO_URI,
    frontendURL: process.env.FRONTEND_URL || "http://localhost:8000",
    env: process.env.NODE_ENV || "development"
};

const corsOptions = {
    origin: config.frontendURL,
    optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(helmet());

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // Limit each IP to 100 requests per window
});
app.use(limiter);

if (!config.mongoURI) {
    console.error("❌ MONGO_URI is not defined. Check your .env file.");
    process.exit(1);
}

mongoose.set("strictQuery", false);
mongoose
    .connect(config.mongoURI)
    .then(() => console.log("✅ Connected to MongoDB successfully!"))
    .catch((err: Error) => {
        console.error("❌ MongoDB Connection Error:", err.message);
        process.exit(1);
    });

app.use("/main", mainRouter);
app.use("/user", userRouter);
app.use("/seller", sellerRouter);
app.use("/admin", adminRouter);

app.use((req: Request, res: Response, next: NextFunction) => {
    next(createError(404, "Route not found"));
});

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    res.locals.message = err.message;
    res.locals.error = config.env === "development" ? err : {};

    console.error("❌ Error:", err.message);

    res.status(err.status || 500).json({
        success: false,
        message: err.message || "Internal Server Error",
        error: config.env === "development" ? err : {},
    });
});

export default app;
