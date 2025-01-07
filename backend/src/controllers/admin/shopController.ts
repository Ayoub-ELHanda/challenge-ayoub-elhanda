import mongoose from "../../config/db";  // Correct path to db.ts
import { shopSchema } from "./../../models/shop";
import { Request, Response, NextFunction } from "express";

// MongoDB connection setup (consider moving this to a centralized db.ts file)
mongoose.connect("mongodb://admin:password@localhost:27017/ecommerce");

// Define the Shop model using the imported schema
const Shop = mongoose.model("Shop", shopSchema);

// Shop Management =======================================================

/**
 * List all shops with populated user information
 */
export const listShop = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const shops = await Shop.find({}).populate("user", "username");
        res.json(shops);
    } catch (error) {
        next(error);
    }
};

/**
 * Show a specific shop by ID
 */
export const showShop = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const shop = await Shop.findById(req.query.shopID);
        if (!shop) {
            res.status(404).json({ message: "Shop not found" });
            return;
        }
        res.json(shop);
    } catch (error) {
        next(error);
    }
};

/**
 * Delete a specific shop by ID
 */
export const deleteShop = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const deletedShop = await Shop.findByIdAndDelete(req.query.id);
        if (!deletedShop) {
            res.status(404).json({ message: "Shop not found" });
            return;
        }
        res.json(deletedShop);
    } catch (error) {
        next(error);
    }
};
