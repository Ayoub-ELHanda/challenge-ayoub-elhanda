"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.shopSchema = void 0;
const mongoose_1 = require("mongoose");
/**
 * Shop Schema Definition
 */
const shopSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    logo: { type: String },
    phone: { type: String },
    email: { type: String },
    description: { type: String },
    address: {
        country: { type: String },
        province: { type: String },
        city: { type: String },
        postCode: { type: String },
        street: { type: String },
    },
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: "User" },
    products: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "Product" }],
}, {
    timestamps: {
        createdAt: "created_at",
        updatedAt: "updated_at",
    },
});
exports.shopSchema = shopSchema;
