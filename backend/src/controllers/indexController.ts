import { Request, Response, NextFunction } from "express";
import { Site } from "../models/site";
import { Product, ProductCategory } from "../models/product";
import { Review } from "../models/review";
import { Shop } from "../models/shop";
import { User } from "../models/user";
import mongoose, { Types } from "mongoose";

// Show all sites
export const showSite = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const sites = await Site.find({});
        res.json(sites);
    } catch (error) {
        next(error);
    }
};

// ✅ Show all shops
export const listRecentShops = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const shops = await Shop.find().sort({ created_at: -1 }).limit(15);
        res.json(shops);
    } catch (error) {
        next(error);
    }
};
// ✅ Show a single shop
export const showShop = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const shop = await Shop.findById(req.query.shopID).populate("products");
        if (!shop) {
            res.status(404).json({ message: "Shop not found" });
            return;
        }
        res.json(shop);
    } catch (error) {
        next(error);
    }
};
// ✅ Show a single product
export const showProduct = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const product = await Product.findById(req.query.productID).populate("reviews");
        if (!product) {
            res.status(404).json({ message: "Product not found" });
            return;
        }
        res.json(product);
    } catch (error) {
        next(error);
    }
};

// List all product categories
export const listAllCategories = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const categories = await ProductCategory.find({});
        res.json(categories);
    } catch (error) {
        next(error);
    }
};

// List recently created products
export const listRecentProducts = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const products = await Product.find({})
            .sort({ created_at: -1 })
            .limit(15);
        res.json(products);
    } catch (error) {
        next(error);
    }
};

// Show a single product category
export const showCategory = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {  
    try {
        const categoryID = req.query.categoryID as string;
        if (!categoryID) {
            res.status(400).json({ message: "Category ID is required" });
            return;
        }

        const category = await ProductCategory.findById(categoryID).populate("products");
        if (!category) {
            res.status(404).json({ message: "Category not found" });
            return;
        }
        res.json(category); // No return statement to avoid error
    } catch (error) {
        next(error);  // Don't return next(error) with void
    }
};



// Add a review to a product
export const addProductReview = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const productId = req.query.productID as string;
        const userId = req.query.userID as string;

        const product = await Product.findById(productId);
        const user = await User.findById(userId);

        if (!product || !user) {
            res.status(404).json({ message: "Product or User not found" });
            return;
        }

        const newReview = new Review({
            rating: req.body.rating,
            content: req.body.content,
            product: product._id,
            user: user._id
        });

        await newReview.save();

        // ✅ Safely handle reviews with explicit casting
        product.reviews = product.reviews || [];
        user.reviews = user.reviews || [];

        product.reviews.push(newReview._id as Types.ObjectId);
        user.reviews.push(newReview._id as Types.ObjectId);

        await product.save();
        await user.save();

        res.status(201).json(newReview);
    } catch (error) {
        next(error);
    }
};

// Remove a review from a product
export const removeProductReview = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Response | void> => {
    try {
        const reviewId = req.query.reviewID as string;
        const productId = req.query.productID as string;
        const userId = req.query.userID as string;

        if (!reviewId || !productId || !userId) {
            return res.status(400).json({ message: "All IDs are required" });
        }

        const review = await Review.findById(reviewId);
        const product = await Product.findById(productId);
        const user = await User.findById(userId);

        if (!review || !product || !user) {
            return res.status(404).json({ message: "Review, Product, or User not found" });
        }

        // ✅ Safely handle reviews using optional chaining
        product.reviews = product.reviews?.filter(id => id.toString() !== reviewId) ?? [];
        user.reviews = user.reviews?.filter(id => id.toString() !== reviewId) ?? [];

        // ✅ Use deleteOne() instead of deprecated remove()
        await review.deleteOne();
        await product.save();
        await user.save();

        return res.json({ message: "Review removed successfully" });
    } catch (error) {
        next(error);
    }
};

