"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = require("jsonwebtoken");
const protect = async (req, res, next) => {
    const token = req.cookies.jwt;
    if (!token) {
        return res.status(401).json({ message: 'Not authorized' });
    }
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
        return res.status(500).json({ message: 'JWT secret not defined' });
    }
    try {
        const decoded = (0, jsonwebtoken_1.verify)(token, jwtSecret); // Directly using verify without callback
        req.user = decoded;
        next();
    }
    catch (err) {
        return res.status(401).json({ message: 'Not authorized' });
    }
};
exports.default = protect;
