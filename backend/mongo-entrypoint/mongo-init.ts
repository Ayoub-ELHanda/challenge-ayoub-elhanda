import mongoose from "mongoose";

const mongoURI = process.env.MONGO_URI || "mongodb://admin:password@localhost:27017/ecommerce";

const connectDB = async (): Promise<void> => {
    try {
        // ✅ Connect using the modern approach and specifying the admin database for authentication
        await mongoose.connect(mongoURI);

        console.log("✅ MongoDB connected successfully");

        // ✅ Access the default connection's database instance
        const db = mongoose.connection.db;

        // ✅ Check if collections exist before creating them
        const collections = await db.listCollections().toArray();
        const collectionNames = collections.map((col) => col.name);

        if (!collectionNames.includes("products")) {
            await db.createCollection("products");
            console.log("✅ 'products' collection created successfully");
        }

        if (!collectionNames.includes("users")) {
            await db.createCollection("users");
            console.log("✅ 'users' collection created successfully");
        }

        // ✅ Check if the admin user already exists before creating
        const existingAdmin = await db.command({ usersInfo: "admin" });

        if (existingAdmin.users.length === 0) {
            await db.command({
                createUser: "admin",
                pwd: "password",
                roles: [{ role: "readWrite", db: "ecommerce" }],
            });
            console.log("✅ Admin user created successfully");
        } else {
            console.log("⚠️ Admin user already exists");
        }

        // ✅ Close the connection after setup
        await mongoose.connection.close();
        console.log("✅ MongoDB connection closed after initialization");
    } catch (error) {
        console.error("❌ MongoDB connection error:", error);
        process.exit(1);
    }
};

// Execute the script
connectDB();
