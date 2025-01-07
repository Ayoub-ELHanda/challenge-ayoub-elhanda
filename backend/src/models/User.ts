import mongoose, { Schema, Document, Types } from "mongoose";

/**
 * Interface for the Role Document
 */
export interface IRole extends Document {
    name: string;
    users?: Types.ObjectId[];
}

/**
 * Role Schema Definition
 */
const roleSchema = new Schema({
    name: { type: String, required: true },
    users: [{ type: Schema.Types.ObjectId, ref: 'User' }],
});

/**
 * Interface for the User Document
 */
export interface IUser extends Document {
    name?: string;
    avatar?: string;
    username: string;
    email: string;
    password: string;
    phone?: string;
    address?: {
        country?: string;
        province?: string;
        city?: string;
        postCode?: string;
        street?: string;
    };
    role?: Types.ObjectId;
    shop?: Types.ObjectId;
    reviews?: Types.ObjectId[];
    created_at?: Date;
    updated_at?: Date;
}

/**
 * User Schema Definition
 */
const userSchema = new Schema<IUser>(
    {
        name: { type: String },
        avatar: { type: String },
        username: { type: String, required: true },
        email: { type: String, required: true },
        password: { type: String, required: true },
        phone: { type: String },
        address: {
            country: { type: String },
            province: { type: String },
            city: { type: String },
            postCode: { type: String },
            street: { type: String },
        },
        role: { type: Schema.Types.ObjectId, ref: "Role" },
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

export { roleSchema, userSchema };
