import multer, { StorageEngine } from "multer";
import fs from "fs";
import path from "path";
import { Request } from "express";

// ✅ Define the file naming function with TypeScript
const fileName = (
    req: Request,
    file: Express.Multer.File,
    cb: (error: Error | null, filename: string) => void
): void => {
    const extArray = file.mimetype.split("/");
    const extension = extArray[extArray.length - 1];
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    cb(null, `${file.fieldname}-${uniqueSuffix}.${extension}`);
};

// ✅ Define the storage configurations with TypeScript

// Shop Logo Storage
const storageShopLogo: StorageEngine = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = path.join(process.env.PUBLIC_DIR || "public", "uploads/shop");
        fs.mkdirSync(uploadPath, { recursive: true });
        cb(null, uploadPath);
    },
    filename: fileName,
});

// Product Image Storage
const storageProductImage: StorageEngine = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = path.join(process.env.PUBLIC_DIR || "public", "uploads/product");
        fs.mkdirSync(uploadPath, { recursive: true });
        cb(null, uploadPath);
    },
    filename: fileName,
});

// User Avatar Storage
const storageUserAvatar: StorageEngine = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = path.join(process.env.PUBLIC_DIR || "public", "uploads/user");
        fs.mkdirSync(uploadPath, { recursive: true });
        cb(null, uploadPath);
    },
    filename: fileName,
});

// ✅ Initialize the upload handlers using the defined storages
const uploadShopLogo = multer({ storage: storageShopLogo });
const uploadProductImage = multer({ storage: storageProductImage });
const uploadUserAvatar = multer({ storage: storageUserAvatar });

// ✅ Export the upload handlers
export { uploadShopLogo, uploadProductImage, uploadUserAvatar };
