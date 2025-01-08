import mongoose from "../../config/db";  // Correct path to db.ts
import { userSchema } from "./../../models/user";
import { shopSchema } from "./../../models/shop";
import { Request, Response, NextFunction } from "express";

// MongoDB connection setup (consider moving to a central db.ts file)
mongoose.connect("mongodb://admin:password@localhost:27017/ecommerce");

// Defining models using the imported schemas
const User = mongoose.model("User", userSchema);
const Shop = mongoose.model("Shop", shopSchema);

/**
 * ✅ Create a new shop 
 */
export const createShop = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
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
    } catch (error) {
        next(error);
    }
};

/**
 * ✅ Show a specific shop
 */
export const showShop = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const shop = req.query.withProducts === "true"
            ? await Shop.findById(req.query.shopID).populate("products")
            : await Shop.findById(req.query.shopID);

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
 * ✅ Update a shop
 */
export const updateShop = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        if (req.file) {
            const path = /(\/uploads)(.+)/g.exec(req.file.path)?.[0] || "";
            await Shop.findByIdAndUpdate(req.query.shopID, { logo: path });
        }

        const updatedShop = await Shop.findByIdAndUpdate(
            req.query.shopID,
            {
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
            },
            { new: true }
        );

        if (!updatedShop) {
            res.status(404).json({ message: "Shop not found" });
            return;
        }

        res.json({ message: "Shop Updated!", shop: updatedShop });
    } catch (error) {
        next(error);
    }
};

/**
 * ✅ Delete a shop (Fixed issue with deprecated `findByIdAndRemove`)
 */
export const deleteShop = async (
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

        // ✅ Remove shop reference from the associated user
        await User.findByIdAndUpdate(shop.user, {
            $unset: { shop: 1 },
        });

        // ✅ Fixed: Replaced `findByIdAndRemove` with `findByIdAndDelete`
        await Shop.findByIdAndDelete(req.query.shopID);

        res.json({ message: "Shop Deleted!" });
    } catch (error) {
        next(error);
    }
};
