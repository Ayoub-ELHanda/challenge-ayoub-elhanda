"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productCategorySchema = exports.productSchema = void 0;
const mongoose_1 = require("mongoose");
/**
 * Product Schema Definition
 */
const productSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    images: [{ type: String }],
    price: { type: String, required: true },
    description: { type: String },
    categories: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "ProductCategory" }],
    shop: { type: mongoose_1.Schema.Types.ObjectId, ref: "Shop" },
    reviews: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "Review" }],
}, {
    timestamps: {
        createdAt: "created_at",
        updatedAt: "updated_at",
    },
});
exports.productSchema = productSchema;
/**
 * Product Category Schema Definition
 */
const productCategorySchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    products: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "Product" }],
}, {
    timestamps: {
        createdAt: "created_at",
    },
});
exports.productCategorySchema = productCategorySchema;
