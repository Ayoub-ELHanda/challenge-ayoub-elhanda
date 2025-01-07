import mongoose, { Schema, Document } from "mongoose";

/**
 * Interface for the Site Document
 */
export interface ISite extends Document {
    name?: string;
    description?: string;
    keywords?: string;
}

/**
 * Site Schema Definition
 */
const siteSchema = new Schema<ISite>({
    name: { type: String },
    description: { type: String },
    keywords: { type: String },
});

export { siteSchema };
