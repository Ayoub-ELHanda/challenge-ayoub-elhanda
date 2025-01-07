"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
// Importing Controllers
const userController_1 = require("../controllers/userController");
// Importing Middleware for File Upload
const upload_1 = require("../upload/upload");
// ✅ User Authentication & Management Routes
router.post("/register", userController_1.userRegister);
router.post("/login", userController_1.userLogin);
router.put("/change-password", userController_1.changePass);
router.get("/show", userController_1.showUser);
router.put("/update", upload_1.uploadUserAvatar.single("avatar"), userController_1.updateUser);
exports.default = router;
