import express from "express";
const router = express.Router();

// Importing Controllers
import {
    showSite,          // Retrieve website information
    listAllCategories, // Retrieve all product categories
    listRecentProducts, // Retrieve recently created products
    listRecentShops,    // Retrieve recently created shops
    showCategory,      // Retrieve one single product category
    showShop,          // Retrieve one single shop
    showProduct,       // Retrieve one single product
    addProductReview,  // Add review to a product
    removeProductReview // Remove product review
} from "../controllers/indexController";

// ✅ Website Information
router.get("/site", showSite);

// ✅ Category & Product Listings
router.get("/category/all", listAllCategories);
router.get("/product/recent", listRecentProducts);
router.get("/shop/recent", listRecentShops);

// ✅ Specific Category, Shop, Product Routes
router.get("/category/show", showCategory);
router.get("/shop/show", showShop);
router.get("/product/show", showProduct);

// ✅ Product Reviews Management
router.get("/product/review/add", addProductReview);
router.get("/product/review/remove", removeProductReview);

export default router;
