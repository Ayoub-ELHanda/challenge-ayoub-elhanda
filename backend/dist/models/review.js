"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reviewSchema = void 0;
const mongoose_1 = require("mongoose");
/**
 * Review Schema Definition
 */
const reviewSchema = new mongoose_1.Schema({
    rating: { type: Number, required: true },
    content: { type: String, required: true },
    product: { type: mongoose_1.Schema.Types.ObjectId, ref: "Product", required: true },
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: "User", required: true },
}, {
    timestamps: {
        createdAt: "created_at",
        updatedAt: "updated_at",
    },
});
exports.reviewSchema = reviewSchema;
