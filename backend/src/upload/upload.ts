// src/upload.ts
import multer from "multer";
import path from "path";

// Define storage for shop logo uploads
const storageShopLogo = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./uploads/shop-logos");
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`);
    },
});
// Define storage for user avatar uploads
const storageUserAvatar = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "./uploads/user-avatars");
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}_${file.originalname}`);
    },
  });
// Define storage for product image uploads
const storageProductImage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./uploads/product-images");
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`);
    },
});
// Create multer upload instance for handling user avatar uploads
export const uploadUserAvatar = multer({ storage: storageUserAvatar });
// Create multer upload instances for handling files
export const uploadShopLogo = multer({ storage: storageShopLogo });
export const uploadProductImage = multer({ storage: storageProductImage });
