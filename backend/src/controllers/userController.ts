import { mongooseInstance as mongoose } from "../config/db";
import { userSchema, roleSchema } from "../models/user";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { hashPass, authUser } from "../auth";

// MongoDB connection setup (will now be imported from db.ts)
mongoose.connect("mongodb://admin:password@localhost:27017/ecommerce");

// Defining models using the imported schemas
const User = mongoose.model("User", userSchema);
const Role = mongoose.model("Role", roleSchema);

// User Registration ======================================================
export const userRegister = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        // Check if the user already exists
        const existingUser = await User.findOne({ email: req.body.email });
        if (existingUser) {
            res.status(400).send("There is an existing account associated with this email.");
            return;
        }

        // Hash password
        const hashedPass = await hashPass(req.body.password);

        // Assign "user" role to the new user
        const userRole = await Role.findOne({ name: "user" });

        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPass,
            role: userRole?._id,
            name: "",
            avatar: "",
            phone: "",
            address: {
                country: "",
                province: "",
                city: "",
                postCode: "",
                street: "",
            },
        });

        await newUser.save();

        // Add the user to the "user" role
        await Role.findOneAndUpdate(
            { name: "user" },
            { $push: { users: newUser._id } },
            { new: true }
        );

        res.status(201).json(newUser);
    } catch (error) {
        console.error("Error in user registration:", error); // Log the error to understand what's failing
        next(error);
    }
};


// User Login ============================================================
export const userLogin = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        // Fetch the user and populate the role field to get the role name
        const user = await User.findOne({ email: req.body.email }).populate("role", "name");

        if (!user) {
            res.status(401).send("Username or password not correct.");
            return;
        }

        // Compare passwords using the authUser function
        const match = await authUser(req.body.password, user.password);
        if (match) {
            // Generate JWT token including the role's name
            const token = jwt.sign(
                { id: user._id, role: user.role }, // Safely access user role's name
                process.env.JWT_KEY || "secret_key"
            );
            res.json({ token });
        } else {
            res.status(401).send("Username or password not correct.");
        }
    } catch (error) {
        next(error);
    }
};

// Change User Password ===================================================
export const changePass = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            res.status(404).send("User not found.");
            return;
        }

        const match = await authUser(req.body.oldPassword, user.password);
        if (match) {
            const hashedNewPass = await hashPass(req.body.newPassword);
            const updatedUser = await User.findOneAndUpdate(
                { email: req.body.email },
                { password: hashedNewPass },
                { new: true }
            );
            res.json(updatedUser);
        } else {
            res.status(401).send("Incorrect old password.");
        }
    } catch (error) {
        next(error);
    }
};

// Show User Profile ======================================================
// Show a specific user by ID with populated shop and role information
export const showUser = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const user = await User.findById(req.query.userID)
            .populate("shop") // Populating the shop field if it's needed
            .populate("role", "name"); // Populating the role field and only selecting the name

        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }

        // Access role name safely after population
        const userWithRoleName = {
            ...user.toObject(), // Convert to plain object for ease of use
            roleName: user.role, // Safely access role name
        };

        res.json(userWithRoleName); // Send the user with role name included
    } catch (error) {
        next(error);
    }
};


// Update User Profile ====================================================
export const updateUser = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        // If a new avatar is uploaded
        if (req.file) {
            const path = /(\/uploads)(.+)/g.exec(req.file.path)?.[0] || "";
            await User.findByIdAndUpdate(
                req.query.userID,
                { avatar: path },
                { new: true }
            );
        }

        // Update the user's profile
        const updatedUser = await User.findByIdAndUpdate(
            req.query.userID,
            {
                name: req.body.name,
                username: req.body.username,
                email: req.body.email,
                phone: req.body.phone,
                address: {
                    country: req.body.country,
                    province: req.body.province,
                    city: req.body.city,
                    postCode: req.body.postCode,
                    street: req.body.street,
                },
            },
            { new: true }
        );

        if (!updatedUser) {
            res.status(404).json({ message: "User not found" });
            return;
        }

        res.send("User Updated!");
    } catch (error) {
        next(error);
    }
};
