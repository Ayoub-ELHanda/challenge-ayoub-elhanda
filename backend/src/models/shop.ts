import mongoose, { Schema, Document, Types } from "mongoose";

/**
 * Interface for the Shop Document
 */
export interface IShop extends Document {
    name: string;
    logo?: string;
    phone?: string;
    email?: string;
    description?: string;
    address?: {
        country?: string;
        province?: string;
        city?: string;
        postCode?: string;
        street?: string;
    };
    user?: Types.ObjectId;
    products?: Types.ObjectId[];
    created_at?: Date;
    updated_at?: Date;
}

/**
 * Shop Schema Definition
 */
const shopSchema = new Schema<IShop>(
    {
        name: { type: String, required: true },
        logo: { type: String },
        phone: { type: String },
        email: { type: String },
        description: { type: String },
        address: {
            country: { type: String },
            province: { type: String },
            city: { type: String },
            postCode: { type: String },
            street: { type: String },
        },
        user: { type: Schema.Types.ObjectId, ref: "User" },
        products: [{ type: Schema.Types.ObjectId, ref: "Product" }],
    },
    {
        timestamps: {
            createdAt: "created_at",
            updatedAt: "updated_at",
        },
    }
);

export { shopSchema };
