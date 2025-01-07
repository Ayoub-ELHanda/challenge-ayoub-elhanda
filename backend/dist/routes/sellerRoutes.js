"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
// Importing Middleware for File Upload
const upload_1 = require("../upload/upload");
// Importing Shop Controllers
const shopController_1 = require("../controllers/seller/shopController");
// ✅ Shop Routes
router.post("/shop/create", upload_1.uploadShopLogo.single("logo"), shopController_1.createShop);
router.get("/shop/show", shopController_1.showShop);
router.put("/shop/update", upload_1.uploadShopLogo.single("logo"), shopController_1.updateShop);
router.delete("/shop/delete", shopController_1.deleteShop);
// Importing Product Controllers
const productController_1 = require("../controllers/seller/productController");
// ✅ Product Routes
router.post("/product/create", upload_1.uploadProductImage.array("images"), productController_1.createProduct);
router.get("/product/show", productController_1.showProduct);
router.put("/product/update", upload_1.uploadProductImage.array("images"), productController_1.updateProduct);
router.delete("/product/delete", productController_1.deleteProduct);
exports.default = router;
