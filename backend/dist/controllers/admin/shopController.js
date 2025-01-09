"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteShop = exports.showShop = exports.listShop = void 0;
const db_1 = require("../../config/db");
const shop_1 = require("./../../models/shop");
// MongoDB connection setup (consider moving this to a centralized db.ts file)
db_1.mongooseInstance.connect("mongodb://admin:password@localhost:27017/ecommerce");
// Define the Shop model using the imported schema
const Shop = db_1.mongooseInstance.model("Shop", shop_1.shopSchema);
// Shop Management =======================================================
/**
 * List all shops with populated user information
 */
const listShop = async (req, res, next) => {
    try {
        const shops = await Shop.find({}).populate("user", "username");
        res.json(shops);
    }
    catch (error) {
        next(error);
    }
};
exports.listShop = listShop;
/**
 * Show a specific shop by ID
 */
const showShop = async (req, res, next) => {
    try {
        const shop = await Shop.findById(req.query.shopID);
        if (!shop) {
            res.status(404).json({ message: "Shop not found" });
            return;
        }
        res.json(shop);
    }
    catch (error) {
        next(error);
    }
};
exports.showShop = showShop;
/**
 * Delete a specific shop by ID
 */
const deleteShop = async (req, res, next) => {
    try {
        const deletedShop = await Shop.findByIdAndDelete(req.query.id);
        if (!deletedShop) {
            res.status(404).json({ message: "Shop not found" });
            return;
        }
        res.json(deletedShop);
    }
    catch (error) {
        next(error);
    }
};
exports.deleteShop = deleteShop;
