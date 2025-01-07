"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_errors_1 = __importDefault(require("http-errors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const db_1 = __importDefault(require("./config/db"));
// ✅ Load Environment Variables
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// Import Routes
const mainRoutes_1 = __importDefault(require("./routes/mainRoutes"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const adminRoutes_1 = __importDefault(require("./routes/adminRoutes"));
const sellerRoutes_1 = __importDefault(require("./routes/sellerRoutes"));
// Initialize Express App
const app = (0, express_1.default)();
// ✅ Set Global Base Directory
global.__basedir = __dirname;
// ✅ CORS Configuration (with Security Considerations)
const corsOptions = {
    origin: process.env.FRONTEND_URL || "http://localhost:8000",
    optionsSuccessStatus: 200,
};
app.use((0, cors_1.default)(corsOptions));
// ✅ Middleware Setup
app.use((0, morgan_1.default)("dev"));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, cookie_parser_1.default)());
// ✅ MongoDB Connection Setup
const mongoURI = process.env.MONGO_URI;
if (!mongoURI) {
    console.error("❌ MONGO_URI is not defined. Check your .env file.");
    process.exit(1);
}
db_1.default.set("strictQuery", false); // Updated to false in newer Mongoose versions
db_1.default
    .connect(mongoURI)
    .then(() => console.log("✅ Connected to MongoDB successfully!"))
    .catch((err) => {
    console.error("❌ MongoDB Connection Error:", err.message);
    process.exit(1); // Stop the server if the DB connection fails
});
// ✅ Route Handlers
app.use("/main", mainRoutes_1.default);
app.use("/user", userRoutes_1.default);
app.use("/seller", sellerRoutes_1.default);
app.use("/admin", adminRoutes_1.default);
// ✅ Catch 404 Errors and Forward
app.use((req, res, next) => {
    next((0, http_errors_1.default)(404, "Route not found"));
});
// ✅ Centralized Error Handling Middleware
app.use((err, req, res, next) => {
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
exports.default = app;
