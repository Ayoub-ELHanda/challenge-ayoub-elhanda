"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
// ✅ Site Management Controllers
const SiteController = __importStar(require("../controllers/admin/siteController"));
// ✅ Role Management Controllers
const RoleController = __importStar(require("../controllers/admin/userController"));
// ✅ User Management Controllers
const UserController = __importStar(require("../controllers/admin/userController"));
// ✅ Product Category Management Controllers
const ProductCategoryController = __importStar(require("../controllers/admin/productController"));
// ✅ Shop Management Controllers
const ShopController = __importStar(require("../controllers/admin/shopController"));
// ✅ Product Management Controllers
const ProductController = __importStar(require("../controllers/admin/productController"));
// ✅ Product Review Management Controllers
const ReviewController = __importStar(require("../controllers/admin/reviewController"));
// ✅ Site Management Routes
router.get("/site/list", SiteController.listSite);
router.post("/site/create", SiteController.createSite);
router.put("/site/update", SiteController.updateSite);
router.get("/site/show", SiteController.showSite);
router.delete("/site/delete", SiteController.deleteSite);
// ✅ Role Management Routes
router.get("/role/list", RoleController.listRole);
router.post("/role/create", RoleController.createRole);
router.put("/role/update", RoleController.updateRole);
router.get("/role/show", RoleController.showRole);
router.delete("/role/delete", RoleController.deleteRole);
// ✅ User Management Routes
router.get("/user/list", UserController.listUser);
router.get("/user/show", UserController.showUser);
router.delete("/user/delete", UserController.deleteUser);
router.put("/user/update", UserController.updateUser);
// ✅ Product Category Management Routes (Fixed)
router.get("/product/category/list", ProductCategoryController.listProductCategory);
router.post("/product/category/create", ProductCategoryController.createProductCategory);
router.put("/product/category/update/:categoryId", ProductCategoryController.updateProductCategory);
router.get("/product/category/show/:categoryId", ProductCategoryController.showProductCategory);
router.delete("/product/category/delete/:categoryId", ProductCategoryController.deleteProductCategory);
// ✅ Shop Management Routes
router.get("/shop/list", ShopController.listShop);
router.get("/shop/show", ShopController.showShop);
router.delete("/shop/delete", ShopController.deleteShop);
// ✅ Product Management Routes
router.get("/product/list", ProductController.listProducts);
router.get("/product/show", ProductController.showProduct);
router.delete("/product/delete", ProductController.deleteProduct);
// ✅ Product Review Management Routes
router.get("/product/review/list", ReviewController.listReview);
router.get("/product/review/show", ReviewController.showReview);
router.delete("/product/review/delete", ReviewController.deleteReview);
exports.default = router;
