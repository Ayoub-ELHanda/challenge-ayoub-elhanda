"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authUser = exports.hashPass = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const saltRounds = 10; // Salt rounds for bcrypt
// Function to hash a password
const hashPass = async (password) => {
    try {
        const hashedPassword = await bcryptjs_1.default.hash(password, saltRounds);
        return hashedPassword;
    }
    catch (error) {
        console.error("Error hashing password:", error);
        throw new Error("Password hashing failed. Please try again.");
    }
};
exports.hashPass = hashPass;
// Function to compare a plain password with the hashed password
const authUser = async (password, hashedPassword) => {
    try {
        const isMatch = await bcryptjs_1.default.compare(password, hashedPassword);
        return isMatch;
    }
    catch (error) {
        console.error("Error verifying password:", error);
        throw new Error("Password verification failed. Please try again.");
    }
};
exports.authUser = authUser;
