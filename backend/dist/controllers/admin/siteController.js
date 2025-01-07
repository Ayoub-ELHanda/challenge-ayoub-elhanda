"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteSite = exports.showSite = exports.updateSite = exports.createSite = exports.listSite = void 0;
const db_1 = __importDefault(require("../../config/db")); // Correct path to db.ts
const site_1 = require("./../../models/site");
// MongoDB connection setup (consider moving this to a centralized db.ts file)
db_1.default.connect("mongodb://admin:password@localhost:27017/ecommerce");
// Define the Site model using the imported schema
const Site = db_1.default.model("Site", site_1.siteSchema);
// Site Management ======================================================
/**
 * List all sites
 */
const listSite = async (req, res, next) => {
    try {
        const sites = await Site.find({});
        res.json(sites);
    }
    catch (error) {
        next(error);
    }
};
exports.listSite = listSite;
/**
 * Create a new site
 */
const createSite = async (req, res, next) => {
    try {
        const newSite = new Site(req.body);
        await newSite.save();
        res.status(201).json(newSite);
    }
    catch (error) {
        next(error);
    }
};
exports.createSite = createSite;
/**
 * Update an existing site by ID
 */
const updateSite = async (req, res, next) => {
    try {
        const updatedSite = await Site.findByIdAndUpdate(req.query.siteID, {
            name: req.body.name,
            description: req.body.description,
            keywords: req.body.keywords,
        }, { new: true });
        if (!updatedSite) {
            res.status(404).json({ message: "Site not found" });
            return;
        }
        res.status(200).json({ message: "Site Updated", updatedSite });
    }
    catch (error) {
        next(error);
    }
};
exports.updateSite = updateSite;
/**
 * Show a specific site by ID
 */
const showSite = async (req, res, next) => {
    try {
        const site = await Site.findById(req.query.siteID);
        if (!site) {
            res.status(404).json({ message: "Site not found" });
            return;
        }
        res.json(site);
    }
    catch (error) {
        next(error);
    }
};
exports.showSite = showSite;
/**
 * Delete a specific site by ID
 */
const deleteSite = async (req, res, next) => {
    try {
        const deletedSite = await Site.findByIdAndDelete(req.query.siteID);
        if (!deletedSite) {
            res.status(404).json({ message: "Site not found" });
            return;
        }
        res.json({ message: "Site deleted successfully", deletedSite });
    }
    catch (error) {
        next(error);
    }
};
exports.deleteSite = deleteSite;
