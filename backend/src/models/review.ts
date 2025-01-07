import mongoose, { Schema, Document, Types } from "mongoose";

/**
 * Interface for the Review Document
 */
export interface IReview extends Document {
    rating: number;
    content: string;
    product: Types.ObjectId;
    user: Types.ObjectId;
    created_at?: Date;
    updated_at?: Date;
}

/**
 * Review Schema Definition
 */
const reviewSchema = new Schema<IReview>(
    {
        rating: { type: Number, required: true },
        content: { type: String, required: true },
        product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
        user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    },
    {
        timestamps: {
            createdAt: "created_at",
            updatedAt: "updated_at",
        },
    }
);

export { reviewSchema };
