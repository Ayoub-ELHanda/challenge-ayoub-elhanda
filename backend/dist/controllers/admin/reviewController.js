"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteReview = exports.showReview = exports.listReview = void 0;
const review_1 = require("../../models/review"); // Assume Review is exported from the review model file
// Product Review Management ================================================
/**
 * List all reviews with populated user and product information
 */
const listReview = async (req, res, next) => {
    try {
        const reviews = await review_1.Review.find({})
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
        const review = await review_1.Review.findById(req.query.id)
            .populate("user")
            .populate("product");
        if (!review) {
            res.status(404).send({ message: "Review not found" });
            return;
        }
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
        const deletedReview = await review_1.Review.findByIdAndDelete(req.query.id);
        if (!deletedReview) {
            res.status(404).send({ message: "Review not found" });
            return;
        }
        res.json(deletedReview);
    }
    catch (error) {
        next(error);
    }
};
exports.deleteReview = deleteReview;
