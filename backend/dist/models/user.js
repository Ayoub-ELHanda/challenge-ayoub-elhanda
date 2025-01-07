"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSchema = exports.roleSchema = void 0;
const mongoose_1 = require("mongoose");
/**
 * Role Schema Definition
 */
const roleSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    users: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'User' }],
});
exports.roleSchema = roleSchema;
/**
 * User Schema Definition
 */
const userSchema = new mongoose_1.Schema({
    name: { type: String },
    avatar: { type: String },
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    phone: { type: String },
    address: {
        country: { type: String },
        province: { type: String },
        city: { type: String },
        postCode: { type: String },
        street: { type: String },
    },
    role: { type: mongoose_1.Schema.Types.ObjectId, ref: "Role" },
    shop: { type: mongoose_1.Schema.Types.ObjectId, ref: "Shop" },
    reviews: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "Review" }],
}, {
    timestamps: {
        createdAt: "created_at",
        updatedAt: "updated_at",
    },
});
exports.userSchema = userSchema;
