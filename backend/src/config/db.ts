import mongoose from "mongoose";

const mongoURI = process.env.MONGO_URI || "mongodb://admin:password@localhost:27017/ecommerce";

export const connectDB = async (): Promise<void> => {
    try {
        await mongoose.connect(mongoURI);
        console.log("✅ MongoDB connected successfully!");
    } catch (error) {
        console.error("❌ MongoDB connection error:", error);
        process.exit(1);
    }
};

export default mongoose;
