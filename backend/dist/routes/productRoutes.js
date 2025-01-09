"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/productRoutes.ts
const express_1 = require("express");
const productController_1 = require("../controllers/admin/productController"); // Admin controller for creating products
const router = (0, express_1.Router)();
// POST route to create a new product (Admin)
router.post("/", productController_1.createProduct);
exports.default = router;
