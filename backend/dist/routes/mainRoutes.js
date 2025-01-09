"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authMiddleware_1 = __importDefault(require("../middleware/authMiddleware"));
const router = express_1.default.Router();
// Importing Controllers ✅ FIXED IMPORTS
const indexController_1 = require("../controllers/indexController");
router.get("/", authMiddleware_1.default, (req, res) => {
    res.json({ message: "Welcome to the main route" });
});
// ✅ Website Information
router.get("/site", indexController_1.showSite);
// ✅ Category & Product Listings
router.get("/category/all", indexController_1.listAllCategories);
router.get("/product/recent", indexController_1.listRecentProducts);
router.get("/shop/recent", indexController_1.listRecentShops); // ✅ Fixed Import
// ✅ Specific Category, Shop, Product Routes
router.get("/category/show", indexController_1.showCategory);
router.get("/shop/show", indexController_1.showShop); // ✅ Fixed Import
router.get("/product/show", indexController_1.showProduct); // ✅ Fixed Import
// ✅ Product Reviews Management
router.get("/product/review/add", indexController_1.addProductReview);
router.get("/product/review/remove", indexController_1.removeProductReview);
exports.default = router;
