"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/sellerProductRoutes.ts
const express_1 = require("express");
const productController_1 = require("../controllers/seller/productController"); // Ensure the path to your controller is correct
const router = (0, express_1.Router)();
// POST route for creating a product
router.post("/", productController_1.createProduct);
exports.default = router;
