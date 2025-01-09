"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteShop = exports.updateShop = exports.showShop = exports.createShop = void 0;
const db_1 = require("../../config/db");
const user_1 = require("./../../models/user");
const shop_1 = require("./../../models/shop");
// MongoDB connection setup (consider moving to a central db.ts file)
db_1.mongooseInstance.connect("mongodb://admin:password@localhost:27017/ecommerce");
// Defining models using the imported schemas
const User = db_1.mongooseInstance.model("User", user_1.userSchema);
const Shop = db_1.mongooseInstance.model("Shop", shop_1.shopSchema);
/**
 * ✅ Create a new shop
 */
const createShop = async (req, res, next) => {
    try {
        const newShop = new Shop({
            name: req.body.name,
            user: req.query.userID,
            phone: req.body.phone,
            email: req.body.email,
            description: req.body.description,
            address: {
                country: req.body.country,
                province: req.body.province,
                city: req.body.city,
                postCode: req.body.postCode,
                street: req.body.street,
            },
        });
        await newShop.save();
        // ✅ If a logo is provided, save the logo path
        if (req.file) {
            const path = /(\/uploads)(.+)/g.exec(req.file.path)?.[0] || "";
            await Shop.findByIdAndUpdate(newShop._id, { logo: path });
        }
        // ✅ Add shop reference to the user
        await User.findByIdAndUpdate(req.query.userID, { shop: newShop._id });
        res.status(201).json({ message: "Shop Created!" });
    }
    catch (error) {
        next(error);
    }
};
exports.createShop = createShop;
/**
 * ✅ Show a specific shop
 */
const showShop = async (req, res, next) => {
    try {
        const shop = req.query.withProducts === "true"
            ? await Shop.findById(req.query.shopID).populate("products")
            : await Shop.findById(req.query.shopID);
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
 * ✅ Update a shop
 */
const updateShop = async (req, res, next) => {
    try {
        if (req.file) {
            const path = /(\/uploads)(.+)/g.exec(req.file.path)?.[0] || "";
            await Shop.findByIdAndUpdate(req.query.shopID, { logo: path });
        }
        const updatedShop = await Shop.findByIdAndUpdate(req.query.shopID, {
            name: req.body.name,
            phone: req.body.phone,
            email: req.body.email,
            description: req.body.description,
            address: {
                country: req.body.country,
                province: req.body.province,
                city: req.body.city,
                postCode: req.body.postCode,
                street: req.body.street,
            },
        }, { new: true });
        if (!updatedShop) {
            res.status(404).json({ message: "Shop not found" });
            return;
        }
        res.json({ message: "Shop Updated!", shop: updatedShop });
    }
    catch (error) {
        next(error);
    }
};
exports.updateShop = updateShop;
/**
 * ✅ Delete a shop (Fixed issue with deprecated `findByIdAndRemove`)
 */
const deleteShop = async (req, res, next) => {
    try {
        const shop = await Shop.findById(req.query.shopID);
        if (!shop) {
            res.status(404).json({ message: "Shop not found" });
            return;
        }
        // ✅ Remove shop reference from the associated user
        await User.findByIdAndUpdate(shop.user, {
            $unset: { shop: 1 },
        });
        // ✅ Fixed: Replaced `findByIdAndRemove` with `findByIdAndDelete`
        await Shop.findByIdAndDelete(req.query.shopID);
        res.json({ message: "Shop Deleted!" });
    }
    catch (error) {
        next(error);
    }
};
exports.deleteShop = deleteShop;
