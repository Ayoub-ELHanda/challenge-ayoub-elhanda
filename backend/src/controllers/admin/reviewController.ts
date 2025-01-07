import mongoose from "../../config/db";  // Correct path to db.ts
import { reviewSchema } from "./../../models/review";
import { Request, Response, NextFunction } from "express";

// MongoDB connection setup (Consider moving this to a central db.ts file)
mongoose.connect("mongodb://admin:password@localhost:27017/ecommerce");

// Define the Review model using the imported schema
const Review = mongoose.model("Review", reviewSchema);

// Product Review Management ================================================

/**
 * List all reviews with populated user and product information
 */
export const listReview = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const reviews = await Review.find({})
            .populate("user")
            .populate("product");
        res.json(reviews);
    } catch (error) {
        next(error);
    }
};

/**
 * Show a specific review by ID with populated user and product data
 */
export const showReview = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const review = await Review.findById(req.query.id)
            .populate("user")
            .populate("product");
        res.json(review);
    } catch (error) {
        next(error);
    }
};

/**
 * Delete a specific review by ID
 */
export const deleteReview = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const deletedReview = await Review.findByIdAndDelete(req.query.id);
        res.json(deletedReview);
    } catch (error) {
        next(error);
    }
};
