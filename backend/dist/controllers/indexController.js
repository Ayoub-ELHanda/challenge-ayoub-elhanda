"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeProductReview = exports.addProductReview = exports.showCategory = exports.listRecentProducts = exports.listAllCategories = exports.showProduct = exports.showShop = exports.listRecentShops = exports.showSite = void 0;
const site_1 = require("../models/site");
const product_1 = require("../models/product");
const review_1 = require("../models/review");
const shop_1 = require("../models/shop");
const user_1 = require("../models/user");
// Show all sites
const showSite = async (req, res, next) => {
    try {
        const sites = await site_1.Site.find({});
        res.json(sites);
    }
    catch (error) {
        next(error);
    }
};
exports.showSite = showSite;
// ✅ Show all shops
const listRecentShops = async (req, res, next) => {
    try {
        const shops = await shop_1.Shop.find().sort({ created_at: -1 }).limit(15);
        res.json(shops);
    }
    catch (error) {
        next(error);
    }
};
exports.listRecentShops = listRecentShops;
// ✅ Show a single shop
const showShop = async (req, res, next) => {
    try {
        const shop = await shop_1.Shop.findById(req.query.shopID).populate("products");
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
// ✅ Show a single product
const showProduct = async (req, res, next) => {
    try {
        const product = await product_1.Product.findById(req.query.productID).populate("reviews");
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
// List all product categories
const listAllCategories = async (req, res, next) => {
    try {
        const categories = await product_1.ProductCategory.find({});
        res.json(categories);
    }
    catch (error) {
        next(error);
    }
};
exports.listAllCategories = listAllCategories;
// List recently created products
const listRecentProducts = async (req, res, next) => {
    try {
        const products = await product_1.Product.find({})
            .sort({ created_at: -1 })
            .limit(15);
        res.json(products);
    }
    catch (error) {
        next(error);
    }
};
exports.listRecentProducts = listRecentProducts;
// Show a single product category
const showCategory = async (req, res, next) => {
    try {
        const categoryID = req.query.categoryID;
        if (!categoryID) {
            res.status(400).json({ message: "Category ID is required" });
            return;
        }
        const category = await product_1.ProductCategory.findById(categoryID).populate("products");
        if (!category) {
            res.status(404).json({ message: "Category not found" });
            return;
        }
        res.json(category); // No return statement to avoid error
    }
    catch (error) {
        next(error); // Don't return next(error) with void
    }
};
exports.showCategory = showCategory;
// Add a review to a product
const addProductReview = async (req, res, next) => {
    try {
        const productId = req.query.productID;
        const userId = req.query.userID;
        const product = await product_1.Product.findById(productId);
        const user = await user_1.User.findById(userId);
        if (!product || !user) {
            res.status(404).json({ message: "Product or User not found" });
            return;
        }
        const newReview = new review_1.Review({
            rating: req.body.rating,
            content: req.body.content,
            product: product._id,
            user: user._id
        });
        await newReview.save();
        // ✅ Safely handle reviews with explicit casting
        product.reviews = product.reviews || [];
        user.reviews = user.reviews || [];
        product.reviews.push(newReview._id);
        user.reviews.push(newReview._id);
        await product.save();
        await user.save();
        res.status(201).json(newReview);
    }
    catch (error) {
        next(error);
    }
};
exports.addProductReview = addProductReview;
// Remove a review from a product
const removeProductReview = async (req, res, next) => {
    try {
        const reviewId = req.query.reviewID;
        const productId = req.query.productID;
        const userId = req.query.userID;
        if (!reviewId || !productId || !userId) {
            return res.status(400).json({ message: "All IDs are required" });
        }
        const review = await review_1.Review.findById(reviewId);
        const product = await product_1.Product.findById(productId);
        const user = await user_1.User.findById(userId);
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
    }
    catch (error) {
        next(error);
    }
};
exports.removeProductReview = removeProductReview;
