"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteReview = exports.showReview = exports.listReview = void 0;
const db_1 = __importDefault(require("../../config/db")); // Correct path to db.ts
const review_1 = require("./../../models/review");
// MongoDB connection setup (Consider moving this to a central db.ts file)
db_1.default.connect("mongodb://admin:password@localhost:27017/ecommerce");
// Define the Review model using the imported schema
const Review = db_1.default.model("Review", review_1.reviewSchema);
// Product Review Management ================================================
/**
 * List all reviews with populated user and product information
 */
const listReview = async (req, res, next) => {
    try {
        const reviews = await Review.find({})
            .populate("user")
            .populate("product");
        res.json(reviews);
    }
    catch (error) {
        next(error);
    }
};
exports.listReview = listReview;
/**
 * Show a specific review by ID with populated user and product data
 */
const showReview = async (req, res, next) => {
    try {
        const review = await Review.findById(req.query.id)
            .populate("user")
            .populate("product");
        res.json(review);
    }
    catch (error) {
        next(error);
    }
};
exports.showReview = showReview;
/**
 * Delete a specific review by ID
 */
const deleteReview = async (req, res, next) => {
    try {
        const deletedReview = await Review.findByIdAndDelete(req.query.id);
        res.json(deletedReview);
    }
    catch (error) {
        next(error);
    }
};
exports.deleteReview = deleteReview;
