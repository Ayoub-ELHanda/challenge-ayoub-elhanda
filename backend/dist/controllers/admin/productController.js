"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProduct = exports.showProduct = exports.listProduct = exports.deleteProductCategory = exports.showProductCategory = exports.updateProductCategory = exports.createProductCategory = exports.listProductCategory = void 0;
const db_1 = __importDefault(require("../../config/db")); // Correct path to db.ts
const product_1 = require("../../models/product"); // Correct path to product models
// MongoDB connection setup (Consider moving this to a separate db.ts file in the config folder)
db_1.default.connect("mongodb://admin:password@localhost:27017/ecommerce");
// Defining the models using the imported schemas
const ProductCategory = db_1.default.model("ProductCategory", product_1.productCategorySchema);
const Product = db_1.default.model("Product", product_1.productSchema);
// Product Category Management ============================================
/**
 * List all product categories
 */
const listProductCategory = async (req, res, next) => {
    try {
        const categories = await ProductCategory.find({});
        res.json(categories);
    }
    catch (error) {
        next(error);
    }
};
exports.listProductCategory = listProductCategory;
/**
 * Create a new product category
 */
const createProductCategory = async (req, res, next) => {
    try {
        const newProductCategory = new ProductCategory({
            name: req.body.name,
        });
        await newProductCategory.save();
        res.status(201).json(newProductCategory);
    }
    catch (error) {
        next(error);
    }
};
exports.createProductCategory = createProductCategory;
/**
 * Update an existing product category by ID
 */
const updateProductCategory = async (req, res, next) => {
    try {
        const updatedCategory = await ProductCategory.findByIdAndUpdate(req.query.id, { name: req.body.name }, { new: true });
        res.json(updatedCategory);
    }
    catch (error) {
        next(error);
    }
};
exports.updateProductCategory = updateProductCategory;
/**
 * Show a specific product category by ID
 */
const showProductCategory = async (req, res, next) => {
    try {
        const category = await ProductCategory.findById(req.query.id).populate("products");
        res.json(category);
    }
    catch (error) {
        next(error);
    }
};
exports.showProductCategory = showProductCategory;
/**
 * Delete a product category by ID
 */
const deleteProductCategory = async (req, res, next) => {
    try {
        const deletedCategory = await ProductCategory.findByIdAndDelete(req.query.id);
        res.json(deletedCategory);
    }
    catch (error) {
        next(error);
    }
};
exports.deleteProductCategory = deleteProductCategory;
// Product Management ======================================================
/**
 * List all products
 */
const listProduct = async (req, res, next) => {
    try {
        const products = await Product.find({}).populate("categories");
        res.json(products);
    }
    catch (error) {
        next(error);
    }
};
exports.listProduct = listProduct;
/**
 * Show a specific product by ID
 */
const showProduct = async (req, res, next) => {
    try {
        const product = await Product.findById(req.query.productID);
        res.json(product);
    }
    catch (error) {
        next(error);
    }
};
exports.showProduct = showProduct;
/**
 * Delete a specific product by ID
 */
const deleteProduct = async (req, res, next) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.query.id);
        res.json(deletedProduct);
    }
    catch (error) {
        next(error);
    }
};
exports.deleteProduct = deleteProduct;
