"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProduct = exports.updateProduct = exports.showProduct = exports.createProduct = void 0;
const db_1 = __importDefault(require("../../config/db")); // Correct path to db.ts
const product_1 = require("../../models/product");
const shop_1 = require("../../models/shop");
// MongoDB connection setup (will now be imported from db.ts)
db_1.default.connect("mongodb://admin:password@localhost:27017/ecommerce");
// Defining models using the imported schemas
const Product = db_1.default.model("Product", product_1.productSchema);
const ProductCategory = db_1.default.model("ProductCategory", product_1.productCategorySchema);
const Shop = db_1.default.model("Shop", shop_1.shopSchema);
// Create Product =======================================================
const createProduct = async (req, res, next) => {
    try {
        const newProduct = new Product({
            name: req.body.name,
            price: req.body.price,
            description: req.body.description,
            shop: req.query.shopID,
        });
        await newProduct.save();
        const productID = newProduct._id;
        // Add product to shop
        await Shop.findByIdAndUpdate(req.query.shopID, {
            $push: { products: productID },
        });
        // Add categories
        if (req.body.categories) {
            for (const categoryID of req.body.categories) {
                await addProductCategory(productID, categoryID);
            }
        }
        // Add images if available
        if (req.files && Array.isArray(req.files)) {
            for (const file of req.files) {
                const path = /(\/uploads)(.+)/g.exec(file.path)?.[0] || "";
                await addProductImage(productID, path);
            }
        }
        res.status(201).json(newProduct);
    }
    catch (error) {
        next(error);
    }
};
exports.createProduct = createProduct;
// Show Product =========================================================
const showProduct = async (req, res, next) => {
    try {
        const product = await Product.findById(req.query.productID).populate("categories", "name");
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
// Update Product =======================================================
const updateProduct = async (req, res, next) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(req.query.productID, {
            name: req.body.name,
            price: req.body.price,
            description: req.body.description,
        }, { new: true });
        if (!updatedProduct) {
            res.status(404).json({ message: "Product not found" });
            return;
        }
        // Update categories
        if (req.body.categories) {
            const oldCategories = updatedProduct.categories || [];
            for (const categoryID of oldCategories) {
                await removeProductCategory(req.query.productID, categoryID.toString()); // Ensure toString to avoid type mismatch
            }
            for (const categoryID of req.body.categories) {
                await addProductCategory(req.query.productID, categoryID);
            }
        }
        // Update images if provided
        if (req.files && Array.isArray(req.files)) {
            await removeProductImages(req.query.productID);
            for (const file of req.files) {
                const path = /(\/uploads)(.+)/g.exec(file.path)?.[0] || "";
                await addProductImage(req.query.productID, path);
            }
        }
        res.json(updatedProduct);
    }
    catch (error) {
        next(error);
    }
};
exports.updateProduct = updateProduct;
// Delete Product =======================================================
const deleteProduct = async (req, res, next) => {
    try {
        const deletedProduct = await Product.findByIdAndRemove(req.query.productID);
        if (!deletedProduct) {
            res.status(404).json({ message: "Product not found" });
            return;
        }
        // Remove product from shop
        await Shop.findByIdAndUpdate(deletedProduct.shop, {
            $pull: { products: deletedProduct._id },
        });
        // Handle categories being possibly undefined
        const categories = deletedProduct.categories || []; // Use an empty array if categories are undefined
        // Remove product from categories
        for (const categoryID of categories) {
            await ProductCategory.findByIdAndUpdate(categoryID, {
                $pull: { products: deletedProduct._id },
            });
        }
        res.json({ message: "Product deleted successfully" });
    }
    catch (error) {
        next(error);
    }
};
exports.deleteProduct = deleteProduct;
// Helper Functions =======================================================
async function addProductCategory(productID, categoryID) {
    await Product.findByIdAndUpdate(productID, {
        $push: { categories: categoryID },
    });
    await ProductCategory.findByIdAndUpdate(categoryID, {
        $push: { products: productID },
    });
}
async function removeProductCategory(productID, categoryID) {
    await Product.findByIdAndUpdate(productID, {
        $pull: { categories: categoryID },
    });
    await ProductCategory.findByIdAndUpdate(categoryID, {
        $pull: { products: productID },
    });
}
async function addProductImage(productID, path) {
    await Product.findByIdAndUpdate(productID, {
        $push: { images: path },
    });
}
async function removeProductImages(productID) {
    await Product.findByIdAndUpdate(productID, {
        images: [],
    });
}
