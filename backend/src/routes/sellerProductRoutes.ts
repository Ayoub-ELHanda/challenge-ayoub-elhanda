// src/routes/sellerProductRoutes.ts
import { Router } from "express";
import { createProduct } from "../controllers/seller/productController"; // Ensure the path to your controller is correct

const router = Router();

// POST route for creating a product
router.post("/", createProduct);

export default router;
