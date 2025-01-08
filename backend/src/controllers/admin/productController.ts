import { Request, Response, NextFunction } from 'express';
import { Product, ProductCategory, IProduct } from '../../models/product'; // Ensure correct import

// ✅ Utility function for consistent error handling in async functions
const asyncHandler = (
    fn: (req: Request, res: Response, next: NextFunction) => Promise<void>
) => async (req: Request, res: Response, next: NextFunction) => {
    try {
        await fn(req, res, next);
    } catch (error) {
        next(error);
    }
};

/**
 * ✅ List all eBooks
 */
export const listProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({});
    res.json(products);
});

/**
 * ✅ Create a new eBook
 */
export const createProduct = asyncHandler(async (req, res) => {
    const {
        title, author, images, price, description,
        isbn, publisher, publicationDate, format, categories, shop
    } = req.body;

    const newProduct = new Product({
        title, author, images, price, description,
        isbn, publisher, publicationDate, format, categories, shop
    });

    await newProduct.save();
    res.status(201).json(newProduct);
});

/**
 * ✅ Update an eBook by ID
 */
export const updateProduct = asyncHandler(async (req, res) => {
    const { productId } = req.params;
    const updateData = req.body;

    if (!productId || productId.length !== 24) {
        res.status(400).json({ message: 'Invalid product ID format' });
        return;
    }

    const updatedProduct = await Product.findByIdAndUpdate(productId, updateData, { new: true });
    if (!updatedProduct) {
        res.status(404).json({ message: 'Product not found' });
        return;
    }
    res.json(updatedProduct);
});

/**
 * ✅ Show a specific eBook by ID
 */
export const showProduct = asyncHandler(async (req, res) => {
    const { productId } = req.params;
    const product = await Product.findById(productId)
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
export const deleteProduct = asyncHandler(async (req, res) => {
    const { productId } = req.params;
    const deletedProduct = await Product.findByIdAndDelete(productId);

    if (!deletedProduct) {
        res.status(404).json({ message: 'Product not found' });
        return;
    }
    res.status(204).send();
});

/**
 * ✅ List all Product Categories
 */
export const listProductCategory = asyncHandler(async (req, res) => {
    const categories = await ProductCategory.find({});
    res.json(categories);
});

/**
 * ✅ Create a Product Category
 */
export const createProductCategory = asyncHandler(async (req, res) => {
    const { name } = req.body;
    const newCategory = new ProductCategory({ name });
    await newCategory.save();
    res.status(201).json(newCategory);
});
/**
 * ✅ Update a Product Category by ID
 */
export const updateProductCategory = asyncHandler(async (req, res) => {
    const { categoryId } = req.params;
    const updateData = req.body;

    if (!categoryId || categoryId.length !== 24) {
        res.status(400).json({ message: 'Invalid category ID format' });
        return;
    }

    const updatedCategory = await ProductCategory.findByIdAndUpdate(categoryId, updateData, { new: true });
    if (!updatedCategory) {
        res.status(404).json({ message: 'Category not found' });
        return;
    }
    res.json(updatedCategory);
});

/**
 * ✅ Show a specific Product Category by ID
 */
export const showProductCategory = asyncHandler(async (req, res) => {
    const { categoryId } = req.params;
    const category = await ProductCategory.findById(categoryId).populate('products');

    if (!category) {
        res.status(404).json({ message: 'Category not found' });
        return;
    }
    res.json(category);
});

/**
 * ✅ Delete a Product Category
 */
export const deleteProductCategory = asyncHandler(async (req, res) => {
    const { categoryId } = req.params;
    const deletedCategory = await ProductCategory.findByIdAndDelete(categoryId);

    if (!deletedCategory) {
        res.status(404).json({ message: 'Category not found' });
        return;
    }
    res.status(204).send();
});
