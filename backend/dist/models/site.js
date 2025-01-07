"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.siteSchema = void 0;
const mongoose_1 = require("mongoose");
/**
 * Site Schema Definition
 */
const siteSchema = new mongoose_1.Schema({
    name: { type: String },
    description: { type: String },
    keywords: { type: String },
});
exports.siteSchema = siteSchema;
