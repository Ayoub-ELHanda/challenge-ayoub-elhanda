import express from "express";
const router = express.Router();

// ✅ Site Management Controllers
import * as SiteController from "../controllers/admin/siteController";

// ✅ Role Management Controllers
import * as RoleController from "../controllers/admin/userController";

// ✅ User Management Controllers
import * as UserController from "../controllers/admin/userController";

// ✅ Product Category Management Controllers
import * as ProductCategoryController from "../controllers/admin/productController";

// ✅ Shop Management Controllers
import * as ShopController from "../controllers/admin/shopController";

// ✅ Product Management Controllers
import * as ProductController from "../controllers/admin/productController";

// ✅ Product Review Management Controllers
import * as ReviewController from "../controllers/admin/reviewController";

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

export default router;
