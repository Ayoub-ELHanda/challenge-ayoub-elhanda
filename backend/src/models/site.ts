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

/**
 * ✅ Exporting the schema and the model properly
 */
const Site = mongoose.model<ISite>("Site", siteSchema);

export { siteSchema, Site };
