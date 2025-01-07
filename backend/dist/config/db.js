"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDB = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const mongoURI = process.env.MONGO_URI || "mongodb://admin:password@localhost:27017/ecommerce";
const connectDB = async () => {
    try {
        await mongoose_1.default.connect(mongoURI);
        console.log("✅ MongoDB connected successfully!");
    }
    catch (error) {
        console.error("❌ MongoDB connection error:", error);
        process.exit(1);
    }
};
exports.connectDB = connectDB;
exports.default = mongoose_1.default;
