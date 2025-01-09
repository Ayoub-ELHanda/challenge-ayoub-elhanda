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
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const db_1 = require("./config/db");
// Import Routes
const mainRoutes_1 = __importDefault(require("./routes/mainRoutes"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const adminRoutes_1 = __importDefault(require("./routes/adminRoutes"));
const sellerRoutes_1 = __importDefault(require("./routes/sellerRoutes"));
const productRoutes_1 = __importDefault(require("./routes/productRoutes")); // Admin routes for products
const sellerProductRoutes_1 = __importDefault(require("./routes/sellerProductRoutes")); // Seller routes for products
const app = (0, express_1.default)();
// ✅ MongoDB Connection
(0, db_1.connectDB)();
// ✅ CORS Configuration
app.use((0, cors_1.default)({ origin: process.env.FRONTEND_URL || "http://localhost:8000" }));
// ✅ Rate Limiting
app.use((0, express_rate_limit_1.default)({ windowMs: 15 * 60 * 1000, max: 100 }));
// ✅ Middleware
app.use((0, morgan_1.default)("dev"));
app.use(express_1.default.json()); // Parse JSON bodies
app.use(express_1.default.urlencoded({ extended: false })); // Parse URL-encoded bodies
app.use((0, cookie_parser_1.default)());
// ✅ Route Definitions
app.use("/api/main", mainRoutes_1.default);
app.use("/api/user", userRoutes_1.default);
app.use("/api/seller", sellerRoutes_1.default); // Seller-specific routes
app.use("/api/admin", adminRoutes_1.default); // Admin-specific routes
// Product routes for admin and seller
app.use("/api/admin/products", productRoutes_1.default); // Admin route for managing products
app.use("/api/seller/products", sellerProductRoutes_1.default); // Seller route for managing products
// ✅ Catch 404 Errors
app.use((req, res, next) => {
    next((0, http_errors_1.default)(404));
});
// ✅ Error Handler
app.use((err, req, res, next) => {
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
    await (0, db_1.disconnectDB)();
    server.close(() => {
        console.log("🔌 Server shut down gracefully.");
        process.exit(0);
    });
});
process.on("SIGTERM", async () => {
    await (0, db_1.disconnectDB)();
    server.close(() => {
        console.log("🔌 Server shut down gracefully.");
        process.exit(0);
    });
});
exports.default = app;
