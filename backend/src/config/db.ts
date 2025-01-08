import mongoose from 'mongoose';

const mongoURI = process.env.NODE_ENV === 'test' 
  ? process.env.TEST_MONGO_URI || 'mongodb://admin:password@localhost:27017/ecommerce_test' 
  : process.env.MONGO_URI || 'mongodb://admin:password@localhost:27017/ecommerce';

export const connectDB = async (): Promise<void> => {
    if (mongoose.connection.readyState) {
        await mongoose.disconnect();
    }

    try {
        await mongoose.connect(mongoURI);
        console.log("✅ MongoDB connected successfully!");
    } catch (error) {
        console.error("❌ MongoDB connection error:", error);
        process.exit(1);
    }
};

export const disconnectDB = async (): Promise<void> => {
    if (mongoose.connection.readyState !== 0) {
        await mongoose.disconnect();
    }
};

export default mongoose;
