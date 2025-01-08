import express from "express";
const router = express.Router();

// Importing Controllers ✅ FIXED IMPORTS
import {
    showSite,
    listAllCategories,
    listRecentProducts,
    listRecentShops,       // ✅ Fixed Import
    showCategory,
    showShop,              // ✅ Fixed Import
    showProduct,           // ✅ Fixed Import
    addProductReview,
    removeProductReview
} from "../controllers/indexController";

// ✅ Website Information
router.get("/site", showSite);

// ✅ Category & Product Listings
router.get("/category/all", listAllCategories);
router.get("/product/recent", listRecentProducts);
router.get("/shop/recent", listRecentShops); // ✅ Fixed Import

// ✅ Specific Category, Shop, Product Routes
router.get("/category/show", showCategory);
router.get("/shop/show", showShop); // ✅ Fixed Import
router.get("/product/show", showProduct); // ✅ Fixed Import

// ✅ Product Reviews Management
router.get("/product/review/add", addProductReview);
router.get("/product/review/remove", removeProductReview);

export default router;
