"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadProductImage = exports.uploadShopLogo = exports.uploadUserAvatar = void 0;
// src/upload.ts
const multer_1 = __importDefault(require("multer"));
// Define storage for shop logo uploads
const storageShopLogo = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./uploads/shop-logos");
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`);
    },
});
// Define storage for user avatar uploads
const storageUserAvatar = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./uploads/user-avatars");
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`);
    },
});
// Define storage for product image uploads
const storageProductImage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./uploads/product-images");
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`);
    },
});
// Create multer upload instance for handling user avatar uploads
exports.uploadUserAvatar = (0, multer_1.default)({ storage: storageUserAvatar });
// Create multer upload instances for handling files
exports.uploadShopLogo = (0, multer_1.default)({ storage: storageShopLogo });
exports.uploadProductImage = (0, multer_1.default)({ storage: storageProductImage });
