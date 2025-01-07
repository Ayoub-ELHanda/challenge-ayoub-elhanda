import mongoose, { Schema, Document, Types } from "mongoose";

/**
 * Interface for Product Document
 */
export interface IProduct extends Document {
    name: string;
    images?: string[];
    price: string;
    description?: string;
    categories?: Types.ObjectId[];
    shop?: Types.ObjectId;
    reviews?: Types.ObjectId[];
    created_at?: Date;
    updated_at?: Date;
}

/**
 * Interface for Product Category Document
 */
export interface IProductCategory extends Document {
    name: string;
    products?: Types.ObjectId[];
    created_at?: Date;
}

/**
 * Product Schema Definition
 */
const productSchema = new Schema<IProduct>(
    {
        name: { type: String, required: true },
        images: [{ type: String }],
        price: { type: String, required: true },
        description: { type: String },
        categories: [{ type: Schema.Types.ObjectId, ref: "ProductCategory" }],
        shop: { type: Schema.Types.ObjectId, ref: "Shop" },
        reviews: [{ type: Schema.Types.ObjectId, ref: "Review" }],
    },
    {
        timestamps: {
            createdAt: "created_at",
            updatedAt: "updated_at",
        },
    }
);

/**
 * Product Category Schema Definition
 */
const productCategorySchema = new Schema<IProductCategory>(
    {
        name: { type: String, required: true },
        products: [{ type: Schema.Types.ObjectId, ref: "Product" }],
    },
    {
        timestamps: {
            createdAt: "created_at",
        },
    }
);

export { productSchema, productCategorySchema };
