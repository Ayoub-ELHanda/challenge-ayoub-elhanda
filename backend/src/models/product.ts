import mongoose, { Schema, Document, Types } from "mongoose";

/**
 * ✅ Interface for Product Document specialized as an eBook
 */
export interface IProduct extends Document {
    title: string;
    author: string;
    images?: string[];
    price: number;
    description?: string;
    isbn: string;
    publisher: string;
    publicationDate: Date;
    format: string;
    categories?: Types.ObjectId[];
    shop?: Types.ObjectId;
    reviews?: Types.ObjectId[];
    created_at?: Date;
    updated_at?: Date;
}

/**
 * ✅ Product Schema Definition for eBooks
 */
const productSchema = new Schema<IProduct>({
    title: { type: String, required: true, index: true },
    author: { type: String, required: true },
    images: [{ type: String }],
    price: { type: Number, required: true },
    description: { type: String },
    isbn: { type: String, required: true },
    publisher: { type: String, required: true },
    publicationDate: { type: Date, required: true },
    format: { type: String, required: true },
    categories: [{ type: Schema.Types.ObjectId, ref: "ProductCategory" }],
    shop: { type: Schema.Types.ObjectId, ref: "Shop" },
    reviews: [{ type: Schema.Types.ObjectId, ref: "Review" }],
}, {
    timestamps: {
        createdAt: "created_at",
        updatedAt: "updated_at",
    },
});

/**
 * ✅ Interface for ProductCategory Document
 */
export interface IProductCategory extends Document {
    name: string;
    products?: Types.ObjectId[];
}

/**
 * ✅ Product Category Schema Definition
 */
const productCategorySchema = new Schema<IProductCategory>({
    name: { type: String, required: true },
    products: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
});

/**
 * ✅ Exporting Models
 */
export const Product = mongoose.model<IProduct>('Product', productSchema);
export const ProductCategory = mongoose.model<IProductCategory>('ProductCategory', productCategorySchema);

// ✅ Export Schemas if Needed
export { productSchema, productCategorySchema };
