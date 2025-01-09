"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.showUser = exports.updateUser = exports.listUser = exports.deleteRole = exports.showRole = exports.updateRole = exports.createRole = exports.listRole = void 0;
const db_1 = require("../../config/db");
const user_1 = require("./../../models/user");
// MongoDB connection setup (consider moving to a central db.ts file)
db_1.mongooseInstance.connect("mongodb://admin:password@localhost:27017/ecommerce");
// Define the Role and User models using the imported schemas
const Role = db_1.mongooseInstance.model("Role", user_1.roleSchema);
const User = db_1.mongooseInstance.model("User", user_1.userSchema);
// Role Management ======================================================
/**
 * List all roles
 */
const listRole = async (req, res, next) => {
    try {
        const roles = await Role.find({});
        res.json(roles);
    }
    catch (error) {
        next(error);
    }
};
exports.listRole = listRole;
/**
 * Create a new role
 */
const createRole = async (req, res, next) => {
    try {
        const newRole = new Role(req.body);
        await newRole.save();
        res.status(201).json(newRole);
    }
    catch (error) {
        next(error);
    }
};
exports.createRole = createRole;
/**
 * Update a role by ID
 */
const updateRole = async (req, res, next) => {
    try {
        const updatedRole = await Role.findByIdAndUpdate(req.query.id, req.body, { new: true });
        res.json(updatedRole);
    }
    catch (error) {
        next(error);
    }
};
exports.updateRole = updateRole;
/**
 * Show a specific role by ID
 */
const showRole = async (req, res, next) => {
    try {
        const role = await Role.findById(req.query.id).populate("users");
        res.json(role);
    }
    catch (error) {
        next(error);
    }
};
exports.showRole = showRole;
/**
 * Delete a role by ID
 */
const deleteRole = async (req, res, next) => {
    try {
        const deletedRole = await Role.findByIdAndDelete(req.query.id);
        res.json(deletedRole);
    }
    catch (error) {
        next(error);
    }
};
exports.deleteRole = deleteRole;
// User Management =======================================================
/**
 * List all users with populated shop and role information
 */
const listUser = async (req, res, next) => {
    try {
        const users = await User.find({}).populate("shop").populate("role", "name");
        res.json(users);
    }
    catch (error) {
        next(error);
    }
};
exports.listUser = listUser;
/**
 * Update a user's role and manage role associations
 */
const updateUser = async (req, res, next) => {
    try {
        // Remove the user from the old role
        const oldUser = await User.findById(req.query.id);
        if (!oldUser) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        await Role.findByIdAndUpdate(oldUser.role, { $pull: { users: oldUser._id } }, { new: true });
        const newRole = await Role.findOne({ name: req.body.role });
        if (!newRole) {
            res.status(404).json({ message: "Role not found" });
            return;
        }
        // Update the user model with the new role
        const updatedUser = await User.findByIdAndUpdate(req.query.id, { role: newRole._id }, { new: true });
        // Add the user to the new role
        await Role.findByIdAndUpdate(newRole._id, { $push: { users: updatedUser?._id } }, { new: true });
        res.json(updatedUser);
    }
    catch (error) {
        next(error);
    }
};
exports.updateUser = updateUser;
/**
 * Show a specific user by ID with populated shop and role information
 */
const showUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.query.userID)
            .populate("shop")
            .populate("role", "name");
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        res.json(user);
    }
    catch (error) {
        next(error);
    }
};
exports.showUser = showUser;
/**
 * Delete a user by ID
 */
const deleteUser = async (req, res, next) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.query.userID);
        if (!deletedUser) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        res.json(deletedUser);
    }
    catch (error) {
        next(error);
    }
};
exports.deleteUser = deleteUser;
