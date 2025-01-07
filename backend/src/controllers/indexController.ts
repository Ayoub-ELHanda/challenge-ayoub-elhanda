import mongoose from "../config/db";  // Correct path to db.ts
import { siteSchema } from "../models/site";
import { productSchema, productCategorySchema } from "../models/product";
import { reviewSchema } from "../models/review";
import { shopSchema } from "../models/shop";
import { userSchema } from "../models/user";
import { Request, Response, NextFunction } from "express";

mongoose.connect("mongodb://admin:password@localhost:27017/ecommerce");

// Defining models using the imported schemas
const Site = mongoose.model("Site", siteSchema);
const User = mongoose.model("User", userSchema);
const Product = mongoose.model("Product", productSchema);
const ProductCategory = mongoose.model("ProductCategory", productCategorySchema);
const Shop = mongoose.model("Shop", shopSchema);
const Review = mongoose.model("Review", reviewSchema);

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

// Retrieve all product categories ========================================
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

// Retrieve recently created products =====================================
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

// Retrieve recently created shops ========================================
export const listRecentShops = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const shops = await Shop.find({})
            .sort({ created_at: -1 })
            .limit(15);
        res.json(shops);
    } catch (error) {
        next(error);
    }
};

// Retrieve one single product category ===================================
export const showCategory = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const category = await ProductCategory.findById(req.query.categoryID)
            .populate("products");
        if (!category) {
            res.status(404).json({ message: "Category not found" });
            return;
        }
        res.json(category);
    } catch (error) {
        next(error);
    }
};

// Retrieve one single shop ===============================================
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

// Retrieve one single product ============================================
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

// Add review to a product ================================================
export const addProductReview = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const product = await Product.findById(req.query.productID);
        const user = await User.findById(req.query.userID);

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

        // Update product and user with the new review
        await Product.findByIdAndUpdate(product._id, {
            $push: { reviews: newReview._id }
        });

        await User.findByIdAndUpdate(user._id, {
            $push: { reviews: newReview._id }
        });

        res.status(201).json(newReview);
    } catch (error) {
        next(error);
    }
};

// Remove review from product and user
export const removeProductReview = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const reviewId = req.query.reviewID as string;
        const productId = req.query.productID as string;
        const userId = req.query.userID as string;

        const review = await Review.findById(reviewId);
        const product = await Product.findById(productId);
        const user = await User.findById(userId);

        if (!review || !product || !user) {
            res.status(404).json({ message: "Review, Product, or User not found" });
            return;
        }

        // Remove review from product and user
        await Product.findByIdAndUpdate(productId, {
            $pull: { reviews: reviewId },
        });

        await User.findByIdAndUpdate(userId, {
            $pull: { reviews: reviewId },
        });

        // Delete the review itself
        await review.remove();

        res.json({ message: "Review removed successfully" });
    } catch (error) {
        next(error);
    }
};
