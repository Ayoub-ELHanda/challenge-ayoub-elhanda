"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authUser = exports.hashPass = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const saltRounds = 10;
/**
 * Hash a password securely using bcryptjs.
 * @param password - The plain text password to be hashed.
 * @returns A promise resolving to the hashed password string.
 */
const hashPass = async (password) => {
    try {
        const hashedPassword = await bcryptjs_1.default.hash(password, saltRounds);
        return hashedPassword;
    }
    catch (error) {
        console.error("Error hashing password:", error);
        throw new Error("Password hashing failed.");
    }
};
exports.hashPass = hashPass;
/**
 * Compare a plain text password with a hashed password.
 * @param password - The plain text password.
 * @param hashedPassword - The previously hashed password to compare against.
 * @returns A promise resolving to true if the passwords match, otherwise false.
 */
const authUser = async (password, hashedPassword) => {
    try {
        return await bcryptjs_1.default.compare(password, hashedPassword);
    }
    catch (error) {
        console.error("Error verifying password:", error);
        throw new Error("Password verification failed.");
    }
};
exports.authUser = authUser;
