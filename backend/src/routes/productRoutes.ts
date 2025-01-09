// src/routes/productRoutes.ts
import { Router } from "express";
import { createProduct as createAdminProduct } from "../controllers/admin/productController"; // Admin controller for creating products

const router = Router();

// POST route to create a new product (Admin)
router.post("/", createAdminProduct);

export default router;
