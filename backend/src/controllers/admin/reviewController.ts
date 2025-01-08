import { Request, Response, NextFunction } from "express";
import { Review } from "../../models/review";  // Assume Review is exported from the review model file

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
        if (!review) {
            res.status(404).send({ message: "Review not found" });
            return;
        }
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
        if (!deletedReview) {
            res.status(404).send({ message: "Review not found" });
            return;
        }
        res.json(deletedReview);
    } catch (error) {
        next(error);
    }
};
