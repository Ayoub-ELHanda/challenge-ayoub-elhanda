import express from "express";
const router = express.Router();

// Site Management Controllers
import {
    listSite,
    createSite,
    updateSite,
    showSite,
    deleteSite
} from "../controllers/admin/siteController";

// Role Management Controllers
import {
    listRole,
    createRole,
    updateRole,
    showRole,
    deleteRole
} from "../controllers/admin/userController";

// User Management Controllers
import {
    listUser,
    showUser,
    deleteUser,
    updateUser
} from "../controllers/admin/userController";

// Product Category Management Controllers
import {
    listProductCategory,
    createProductCategory,
    updateProductCategory,
    showProductCategory,
    deleteProductCategory
} from "../controllers/admin/productController";

// Shop Management Controllers
import {
    listShop,
    showShop,
    deleteShop
} from "../controllers/admin/shopController";

// Product Management Controllers
import {
    listProduct,
    showProduct,
    deleteProduct
} from "../controllers/admin/productController";

// Product Review Management Controllers
import {
    listReview,
    showReview,
    deleteReview
} from "../controllers/admin/reviewController";

// ✅ Site Management Routes
router.get("/site/list", listSite);
router.post("/site/create", createSite);
router.put("/site/update", updateSite);
router.get("/site/show", showSite);
router.delete("/site/delete", deleteSite);

// ✅ Role Management Routes
router.get("/role/list", listRole);
router.post("/role/create", createRole);
router.put("/role/update", updateRole);
router.get("/role/show", showRole);
router.delete("/role/delete", deleteRole);

// ✅ User Management Routes
router.get("/user/list", listUser);
router.get("/user/show", showUser);
router.delete("/user/delete", deleteUser);
router.put("/user/update", updateUser);

// ✅ Product Category Management Routes
router.get("/product/category/list", listProductCategory);
router.post("/product/category/create", createProductCategory);
router.put("/product/category/update", updateProductCategory);
router.get("/product/category/show", showProductCategory);
router.delete("/product/category/delete", deleteProductCategory);

// ✅ Shop Management Routes
router.get("/shop/list", listShop);
router.get("/shop/show", showShop);
router.delete("/shop/delete", deleteShop);

// ✅ Product Management Routes
router.get("/product/list", listProduct);
router.get("/product/show", showProduct);
router.delete("/product/delete", deleteProduct);

// ✅ Product Review Management Routes
router.get("/product/review/list", listReview);
router.get("/product/review/show", showReview);
router.delete("/product/review/delete", deleteReview);

export default router;
