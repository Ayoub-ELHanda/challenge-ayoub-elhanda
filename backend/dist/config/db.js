"use strict";
// src/config/db.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mongooseInstance = exports.dropTestDB = exports.disconnectDB = exports.connectDB = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const mongoURI = process.env.MONGO_URI;
if (!mongoURI) {
    throw new Error('MONGO_URI environment variable is not set.');
}
console.log("Connecting to MongoDB with URI:", mongoURI);
const connectDB = async () => {
    // connection logic
};
exports.connectDB = connectDB;
const disconnectDB = async () => {
    // disconnection logic
};
exports.disconnectDB = disconnectDB;
const dropTestDB = async () => {
    // drop database logic
};
exports.dropTestDB = dropTestDB;
exports.mongooseInstance = mongoose_1.default;
