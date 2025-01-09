import { mongooseInstance as mongoose } from "../../config/db";
import { userSchema, roleSchema } from "./../../models/user";
import { Request, Response, NextFunction } from "express";

// MongoDB connection setup (consider moving to a central db.ts file)
mongoose.connect("mongodb://admin:password@localhost:27017/ecommerce");

// Define the Role and User models using the imported schemas
const Role = mongoose.model("Role", roleSchema);
const User = mongoose.model("User", userSchema);

// Role Management ======================================================

/**
 * List all roles
 */
export const listRole = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const roles = await Role.find({});
        res.json(roles);
    } catch (error) {
        next(error);
    }
};

/**
 * Create a new role
 */
export const createRole = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const newRole = new Role(req.body);
        await newRole.save();
        res.status(201).json(newRole);
    } catch (error) {
        next(error);
    }
};

/**
 * Update a role by ID
 */
export const updateRole = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const updatedRole = await Role.findByIdAndUpdate(
            req.query.id,
            req.body,
            { new: true }
        );
        res.json(updatedRole);
    } catch (error) {
        next(error);
    }
};

/**
 * Show a specific role by ID
 */
export const showRole = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const role = await Role.findById(req.query.id).populate("users");
        res.json(role);
    } catch (error) {
        next(error);
    }
};

/**
 * Delete a role by ID
 */
export const deleteRole = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const deletedRole = await Role.findByIdAndDelete(req.query.id);
        res.json(deletedRole);
    } catch (error) {
        next(error);
    }
};

// User Management =======================================================

/**
 * List all users with populated shop and role information
 */
export const listUser = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const users = await User.find({}).populate("shop").populate("role", "name");
        res.json(users);
    } catch (error) {
        next(error);
    }
};

/**
 * Update a user's role and manage role associations
 */
export const updateUser = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        // Remove the user from the old role
        const oldUser = await User.findById(req.query.id);
        if (!oldUser) {
            res.status(404).json({ message: "User not found" });
            return;
        }

        await Role.findByIdAndUpdate(
            oldUser.role,
            { $pull: { users: oldUser._id } },
            { new: true }
        );

        const newRole = await Role.findOne({ name: req.body.role });
        if (!newRole) {
            res.status(404).json({ message: "Role not found" });
            return;
        }

        // Update the user model with the new role
        const updatedUser = await User.findByIdAndUpdate(
            req.query.id,
            { role: newRole._id },
            { new: true }
        );

        // Add the user to the new role
        await Role.findByIdAndUpdate(
            newRole._id,
            { $push: { users: updatedUser?._id } },
            { new: true }
        );

        res.json(updatedUser);
    } catch (error) {
        next(error);
    }
};

/**
 * Show a specific user by ID with populated shop and role information
 */
export const showUser = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const user = await User.findById(req.query.userID)
            .populate("shop")
            .populate("role", "name");

        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }

        res.json(user);
    } catch (error) {
        next(error);
    }
};

/**
 * Delete a user by ID
 */
export const deleteUser = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.query.userID);
        if (!deletedUser) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        res.json(deletedUser);
    } catch (error) {
        next(error);
    }
};
