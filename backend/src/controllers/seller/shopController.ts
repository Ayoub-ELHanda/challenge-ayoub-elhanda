import mongoose from "../../config/db";  // Correct path to db.ts
import { userSchema } from "./../../models/user";
import { shopSchema } from "./../../models/shop";
import { Request, Response, NextFunction } from "express";

// MongoDB connection setup (consider moving to a central db.ts file)
mongoose.connect("mongodb://admin:password@localhost:27017/ecommerce");

// Defining models using the imported schemas
const User = mongoose.model("User", userSchema);
const Shop = mongoose.model("Shop", shopSchema);

// Create new shop =======================================================
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

        // If a logo is provided, save the logo path
        if (req.file) {
            const path = /(\/uploads)(.+)/g.exec(req.file.path)?.[0] || "";
            await Shop.findByIdAndUpdate(newShop._id, { logo: path });
        }

        // Add shop to the user
        await User.findByIdAndUpdate(req.query.userID, { shop: newShop._id });

        res.status(201).send("Shop Created!");
    } catch (error) {
        next(error);
    }
};

// Show shop =======================================================
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

// Update Shop =======================================================
export const updateShop = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        // If a new logo is provided, update the logo path
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

        res.send("Shop Updated!");
    } catch (error) {
        next(error);
    }
};

// Delete Shop =======================================================
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

        // Remove shop from the associated user
        await User.findByIdAndUpdate(shop.user, {
            $unset: { shop: 1 },
        });

        // Delete the shop
        await Shop.findByIdAndRemove(req.query.shopID);

        res.send("Shop Deleted!");
    } catch (error) {
        next(error);
    }
};
