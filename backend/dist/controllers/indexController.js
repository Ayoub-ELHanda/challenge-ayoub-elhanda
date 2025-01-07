"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeProductReview = exports.addProductReview = exports.showProduct = exports.showShop = exports.showCategory = exports.listRecentShops = exports.listRecentProducts = exports.listAllCategories = exports.showSite = void 0;
const db_1 = __importDefault(require("../config/db")); // Correct path to db.ts
const site_1 = require("../models/site");
const product_1 = require("../models/product");
const review_1 = require("../models/review");
const shop_1 = require("../models/shop");
const user_1 = require("../models/user");
db_1.default.connect("mongodb://admin:password@localhost:27017/ecommerce");
// Defining models using the imported schemas
const Site = db_1.default.model("Site", site_1.siteSchema);
const User = db_1.default.model("User", user_1.userSchema);
const Product = db_1.default.model("Product", product_1.productSchema);
const ProductCategory = db_1.default.model("ProductCategory", product_1.productCategorySchema);
const Shop = db_1.default.model("Shop", shop_1.shopSchema);
const Review = db_1.default.model("Review", review_1.reviewSchema);
const showSite = async (req, res, next) => {
    try {
        const sites = await Site.find({});
        res.json(sites);
    }
    catch (error) {
        next(error);
    }
};
exports.showSite = showSite;
// Retrieve all product categories ========================================
const listAllCategories = async (req, res, next) => {
    try {
        const categories = await ProductCategory.find({});
        res.json(categories);
    }
    catch (error) {
        next(error);
    }
};
exports.listAllCategories = listAllCategories;
// Retrieve recently created products =====================================
const listRecentProducts = async (req, res, next) => {
    try {
        const products = await Product.find({})
            .sort({ created_at: -1 })
            .limit(15);
        res.json(products);
    }
    catch (error) {
        next(error);
    }
};
exports.listRecentProducts = listRecentProducts;
// Retrieve recently created shops ========================================
const listRecentShops = async (req, res, next) => {
    try {
        const shops = await Shop.find({})
            .sort({ created_at: -1 })
            .limit(15);
        res.json(shops);
    }
    catch (error) {
        next(error);
    }
};
exports.listRecentShops = listRecentShops;
// Retrieve one single product category ===================================
const showCategory = async (req, res, next) => {
    try {
        const category = await ProductCategory.findById(req.query.categoryID)
            .populate("products");
        if (!category) {
            res.status(404).json({ message: "Category not found" });
            return;
        }
        res.json(category);
    }
    catch (error) {
        next(error);
    }
};
exports.showCategory = showCategory;
// Retrieve one single shop ===============================================
const showShop = async (req, res, next) => {
    try {
        const shop = await Shop.findById(req.query.shopID).populate("products");
        if (!shop) {
            res.status(404).json({ message: "Shop not found" });
            return;
        }
        res.json(shop);
    }
    catch (error) {
        next(error);
    }
};
exports.showShop = showShop;
// Retrieve one single product ============================================
const showProduct = async (req, res, next) => {
    try {
        const product = await Product.findById(req.query.productID).populate("reviews");
        if (!product) {
            res.status(404).json({ message: "Product not found" });
            return;
        }
        res.json(product);
    }
    catch (error) {
        next(error);
    }
};
exports.showProduct = showProduct;
// Add review to a product ================================================
const addProductReview = async (req, res, next) => {
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
    }
    catch (error) {
        next(error);
    }
};
exports.addProductReview = addProductReview;
// Remove review from product and user
const removeProductReview = async (req, res, next) => {
    try {
        const reviewId = req.query.reviewID;
        const productId = req.query.productID;
        const userId = req.query.userID;
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
    }
    catch (error) {
        next(error);
    }
};
exports.removeProductReview = removeProductReview;
