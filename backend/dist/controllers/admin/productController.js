"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProductCategory = exports.showProductCategory = exports.updateProductCategory = exports.createProductCategory = exports.listProductCategory = exports.deleteProduct = exports.showProduct = exports.updateProduct = exports.createProduct = exports.listProducts = void 0;
const product_1 = require("../../models/product"); // Ensure correct import
// ✅ Utility function for consistent error handling in async functions
const asyncHandler = (fn) => async (req, res, next) => {
    try {
        await fn(req, res, next);
    }
    catch (error) {
        next(error);
    }
};
/**
 * ✅ List all eBooks
 */
exports.listProducts = asyncHandler(async (req, res) => {
    const products = await product_1.Product.find({});
    res.json(products);
});
/**
 * ✅ Create a new eBook
 */
exports.createProduct = asyncHandler(async (req, res) => {
    const { title, author, images, price, description, isbn, publisher, publicationDate, format, categories, shop } = req.body;
    const newProduct = new product_1.Product({
        title, author, images, price, description,
        isbn, publisher, publicationDate, format, categories, shop
    });
    await newProduct.save();
    res.status(201).json(newProduct);
});
/**
 * ✅ Update an eBook by ID
 */
exports.updateProduct = asyncHandler(async (req, res) => {
    const { productId } = req.params;
    const updateData = req.body;
    if (!productId || productId.length !== 24) {
        res.status(400).json({ message: 'Invalid product ID format' });
        return;
    }
    const updatedProduct = await product_1.Product.findByIdAndUpdate(productId, updateData, { new: true });
    if (!updatedProduct) {
        res.status(404).json({ message: 'Product not found' });
        return;
    }
    res.json(updatedProduct);
});
/**
 * ✅ Show a specific eBook by ID
 */
exports.showProduct = asyncHandler(async (req, res) => {
    const { productId } = req.params;
    const product = await product_1.Product.findById(productId)
        .populate('categories')
        .populate('reviews');
    if (!product) {
        res.status(404).json({ message: 'Product not found' });
        return;
    }
    res.json(product);
});
/**
 * ✅ Delete an eBook by ID
 */
exports.deleteProduct = asyncHandler(async (req, res) => {
    const { productId } = req.params;
    const deletedProduct = await product_1.Product.findByIdAndDelete(productId);
    if (!deletedProduct) {
        res.status(404).json({ message: 'Product not found' });
        return;
    }
    res.status(204).send();
});
/**
 * ✅ List all Product Categories
 */
exports.listProductCategory = asyncHandler(async (req, res) => {
    const categories = await product_1.ProductCategory.find({});
    res.json(categories);
});
/**
 * ✅ Create a Product Category
 */
exports.createProductCategory = asyncHandler(async (req, res) => {
    const { name } = req.body;
    const newCategory = new product_1.ProductCategory({ name });
    await newCategory.save();
    res.status(201).json(newCategory);
});
/**
 * ✅ Update a Product Category by ID
 */
exports.updateProductCategory = asyncHandler(async (req, res) => {
    const { categoryId } = req.params;
    const updateData = req.body;
    if (!categoryId || categoryId.length !== 24) {
        res.status(400).json({ message: 'Invalid category ID format' });
        return;
    }
    const updatedCategory = await product_1.ProductCategory.findByIdAndUpdate(categoryId, updateData, { new: true });
    if (!updatedCategory) {
        res.status(404).json({ message: 'Category not found' });
        return;
    }
    res.json(updatedCategory);
});
/**
 * ✅ Show a specific Product Category by ID
 */
exports.showProductCategory = asyncHandler(async (req, res) => {
    const { categoryId } = req.params;
    const category = await product_1.ProductCategory.findById(categoryId).populate('products');
    if (!category) {
        res.status(404).json({ message: 'Category not found' });
        return;
    }
    res.json(category);
});
/**
 * ✅ Delete a Product Category
 */
exports.deleteProductCategory = asyncHandler(async (req, res) => {
    const { categoryId } = req.params;
    const deletedCategory = await product_1.ProductCategory.findByIdAndDelete(categoryId);
    if (!deletedCategory) {
        res.status(404).json({ message: 'Category not found' });
        return;
    }
    res.status(204).send();
});
