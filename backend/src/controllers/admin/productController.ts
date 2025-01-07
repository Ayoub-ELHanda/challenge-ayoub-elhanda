import mongoose from "../../config/db";  // Correct path to db.ts
import { productCategorySchema, productSchema } from "../../models/product";  // Correct path to product models
import { Request, Response, NextFunction } from "express";

// MongoDB connection setup (Consider moving this to a separate db.ts file in the config folder)
mongoose.connect("mongodb://admin:password@localhost:27017/ecommerce");

// Defining the models using the imported schemas
const ProductCategory = mongoose.model("ProductCategory", productCategorySchema);
const Product = mongoose.model("Product", productSchema);

// Product Category Management ============================================

/**
 * List all product categories
 */
export const listProductCategory = async (
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

/**
 * Create a new product category
 */
export const createProductCategory = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const newProductCategory = new ProductCategory({
            name: req.body.name,
        });
        await newProductCategory.save();
        res.status(201).json(newProductCategory);
    } catch (error) {
        next(error);
    }
};

/**
 * Update an existing product category by ID
 */
export const updateProductCategory = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const updatedCategory = await ProductCategory.findByIdAndUpdate(
            req.query.id,
            { name: req.body.name },
            { new: true }
        );
        res.json(updatedCategory);
    } catch (error) {
        next(error);
    }
};

/**
 * Show a specific product category by ID
 */
export const showProductCategory = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const category = await ProductCategory.findById(req.query.id).populate("products");
        res.json(category);
    } catch (error) {
        next(error);
    }
};

/**
 * Delete a product category by ID
 */
export const deleteProductCategory = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const deletedCategory = await ProductCategory.findByIdAndDelete(req.query.id);
        res.json(deletedCategory);
    } catch (error) {
        next(error);
    }
};

// Product Management ======================================================

/**
 * List all products
 */
export const listProduct = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const products = await Product.find({}).populate("categories");
        res.json(products);
    } catch (error) {
        next(error);
    }
};

/**
 * Show a specific product by ID
 */
export const showProduct = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const product = await Product.findById(req.query.productID);
        res.json(product);
    } catch (error) {
        next(error);
    }
};

/**
 * Delete a specific product by ID
 */
export const deleteProduct = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.query.id);
        res.json(deletedProduct);
    } catch (error) {
        next(error);
    }
};
