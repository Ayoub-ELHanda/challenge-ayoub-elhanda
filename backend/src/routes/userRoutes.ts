import express from "express";
const router = express.Router();

// Importing Controllers
import {
    userRegister,
    userLogin,
    showUser,
    updateUser,
    changePass
} from "../controllers/userController";

// Importing Middleware for File Upload
import { uploadUserAvatar } from "../upload/upload";

// ✅ User Authentication & Management Routes
router.post("/register", userRegister);
router.post("/login", userLogin);
router.put("/change-password", changePass);
router.get("/show", showUser);
router.put("/update", uploadUserAvatar.single("avatar"), updateUser);

export default router;
