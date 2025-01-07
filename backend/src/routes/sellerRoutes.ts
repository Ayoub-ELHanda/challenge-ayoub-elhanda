import express from "express";
const router = express.Router();

// Importing Middleware for File Upload
import { uploadProductImage, uploadShopLogo } from "../upload/upload";

// Importing Shop Controllers
import {
    createShop,
    showShop,
    updateShop,
    deleteShop
} from "../controllers/seller/shopController";

// ✅ Shop Routes
router.post("/shop/create", uploadShopLogo.single("logo"), createShop);
router.get("/shop/show", showShop);
router.put("/shop/update", uploadShopLogo.single("logo"), updateShop);
router.delete("/shop/delete", deleteShop);

// Importing Product Controllers
import {
    createProduct,
    showProduct,
    updateProduct,
    deleteProduct
} from "../controllers/seller/productController";

// ✅ Product Routes
router.post("/product/create", uploadProductImage.array("images"), createProduct);
router.get("/product/show", showProduct);
router.put("/product/update", uploadProductImage.array("images"), updateProduct);
router.delete("/product/delete", deleteProduct);

export default router;
