import mongoose from "../../config/db";  // Correct path to db.ts
import { siteSchema } from "./../../models/site";
import { Request, Response, NextFunction } from "express";

// MongoDB connection setup (consider moving this to a centralized db.ts file)
mongoose.connect("mongodb://admin:password@localhost:27017/ecommerce");

// Define the Site model using the imported schema
const Site = mongoose.model("Site", siteSchema);

// Site Management ======================================================

/**
 * List all sites
 */
export const listSite = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const sites = await Site.find({});
        res.json(sites);
    } catch (error) {
        next(error);
    }
};

/**
 * Create a new site
 */
export const createSite = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const newSite = new Site(req.body);
        await newSite.save();
        res.status(201).json(newSite);
    } catch (error) {
        next(error);
    }
};

/**
 * Update an existing site by ID
 */
export const updateSite = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const updatedSite = await Site.findByIdAndUpdate(
            req.query.siteID,
            {
                name: req.body.name,
                description: req.body.description,
                keywords: req.body.keywords,
            },
            { new: true }
        );

        if (!updatedSite) {
            res.status(404).json({ message: "Site not found" });
            return;
        }

        res.status(200).json({ message: "Site Updated", updatedSite });
    } catch (error) {
        next(error);
    }
};

/**
 * Show a specific site by ID
 */
export const showSite = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const site = await Site.findById(req.query.siteID);
        if (!site) {
            res.status(404).json({ message: "Site not found" });
            return;
        }
        res.json(site);
    } catch (error) {
        next(error);
    }
};

/**
 * Delete a specific site by ID
 */
export const deleteSite = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const deletedSite = await Site.findByIdAndDelete(req.query.siteID);
        if (!deletedSite) {
            res.status(404).json({ message: "Site not found" });
            return;
        }
        res.json({ message: "Site deleted successfully", deletedSite });
    } catch (error) {
        next(error);
    }
};
