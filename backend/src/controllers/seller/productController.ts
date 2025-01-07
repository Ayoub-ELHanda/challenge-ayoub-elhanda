import mongoose from "../../config/db";  // Correct path to db.ts
import { productSchema, productCategorySchema } from "../../models/product";
import { shopSchema } from "../../models/shop";
import { Request, Response, NextFunction } from "express";

// MongoDB connection setup (will now be imported from db.ts)
mongoose.connect("mongodb://admin:password@localhost:27017/ecommerce");

// Defining models using the imported schemas
const Product = mongoose.model("Product", productSchema);
const ProductCategory = mongoose.model("ProductCategory", productCategorySchema);
const Shop = mongoose.model("Shop", shopSchema);

// Create Product =======================================================
export const createProduct = async (
  req: Request<{}, {}, { name: string, price: string, description: string, categories: string[] }, { shopID: string }>, 
  res: Response, 
  next: NextFunction
): Promise<void> => {
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
  } catch (error) {
    next(error);
  }
};

// Show Product =========================================================
export const showProduct = async (
  req: Request<{}, {}, {}, { productID: string }>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const product = await Product.findById(req.query.productID).populate("categories", "name");
    if (!product) {
      res.status(404).json({ message: "Product not found" });
      return;
    }
    res.json(product);
  } catch (error) {
    next(error);
  }
};

// Update Product =======================================================
export const updateProduct = async (
  req: Request<{}, {}, { name: string, price: string, description: string, categories: string[] }, { productID: string }>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.query.productID,
      {
        name: req.body.name,
        price: req.body.price,
        description: req.body.description,
      },
      { new: true }
    );

    if (!updatedProduct) {
      res.status(404).json({ message: "Product not found" });
      return;
    }

    // Update categories
    if (req.body.categories) {
      const oldCategories = updatedProduct.categories || [];
      for (const categoryID of oldCategories) {
        await removeProductCategory(req.query.productID, categoryID.toString());  // Ensure toString to avoid type mismatch
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
  } catch (error) {
    next(error);
  }
};

// Delete Product =======================================================
export const deleteProduct = async (
    req: Request<{}, {}, {}, { productID: string }>,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
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
    } catch (error) {
      next(error);
    }
  };
  

// Helper Functions =======================================================
async function addProductCategory(productID: string, categoryID: string): Promise<void> {
  await Product.findByIdAndUpdate(productID, {
    $push: { categories: categoryID },
  });

  await ProductCategory.findByIdAndUpdate(categoryID, {
    $push: { products: productID },
  });
}

async function removeProductCategory(productID: string, categoryID: string): Promise<void> {
  await Product.findByIdAndUpdate(productID, {
    $pull: { categories: categoryID },
  });

  await ProductCategory.findByIdAndUpdate(categoryID, {
    $pull: { products: productID },
  });
}

async function addProductImage(productID: string, path: string): Promise<void> {
  await Product.findByIdAndUpdate(productID, {
    $push: { images: path },
  });
}

async function removeProductImages(productID: string): Promise<void> {
  await Product.findByIdAndUpdate(productID, {
    images: [],
  });
}
