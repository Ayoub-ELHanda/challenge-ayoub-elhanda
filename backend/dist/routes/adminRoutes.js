"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
// Site Management Controllers
const siteController_1 = require("../controllers/admin/siteController");
// Role Management Controllers
const userController_1 = require("../controllers/admin/userController");
// User Management Controllers
const userController_2 = require("../controllers/admin/userController");
// Product Category Management Controllers
const productController_1 = require("../controllers/admin/productController");
// Shop Management Controllers
const shopController_1 = require("../controllers/admin/shopController");
// Product Management Controllers
const productController_2 = require("../controllers/admin/productController");
// Product Review Management Controllers
const reviewController_1 = require("../controllers/admin/reviewController");
// ✅ Site Management Routes
router.get("/site/list", siteController_1.listSite);
router.post("/site/create", siteController_1.createSite);
router.put("/site/update", siteController_1.updateSite);
router.get("/site/show", siteController_1.showSite);
router.delete("/site/delete", siteController_1.deleteSite);
// ✅ Role Management Routes
router.get("/role/list", userController_1.listRole);
router.post("/role/create", userController_1.createRole);
router.put("/role/update", userController_1.updateRole);
router.get("/role/show", userController_1.showRole);
router.delete("/role/delete", userController_1.deleteRole);
// ✅ User Management Routes
router.get("/user/list", userController_2.listUser);
router.get("/user/show", userController_2.showUser);
router.delete("/user/delete", userController_2.deleteUser);
router.put("/user/update", userController_2.updateUser);
// ✅ Product Category Management Routes
router.get("/product/category/list", productController_1.listProductCategory);
router.post("/product/category/create", productController_1.createProductCategory);
router.put("/product/category/update", productController_1.updateProductCategory);
router.get("/product/category/show", productController_1.showProductCategory);
router.delete("/product/category/delete", productController_1.deleteProductCategory);
// ✅ Shop Management Routes
router.get("/shop/list", shopController_1.listShop);
router.get("/shop/show", shopController_1.showShop);
router.delete("/shop/delete", shopController_1.deleteShop);
// ✅ Product Management Routes
router.get("/product/list", productController_2.listProduct);
router.get("/product/show", productController_2.showProduct);
router.delete("/product/delete", productController_2.deleteProduct);
// ✅ Product Review Management Routes
router.get("/product/review/list", reviewController_1.listReview);
router.get("/product/review/show", reviewController_1.showReview);
router.delete("/product/review/delete", reviewController_1.deleteReview);
exports.default = router;
