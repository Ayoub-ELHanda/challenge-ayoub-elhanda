"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/tests/userController.test.ts
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../app"));
const db_1 = require("../config/db");
const user_1 = require("../models/user"); // Make sure you import the Role model
// Clean up the database before each test
beforeEach(async () => {
    await (0, db_1.dropTestDB)(); // Clean up the DB before each test
});
// Ensure the "user" role exists before any tests run
beforeAll(async () => {
    const existingRole = await user_1.Role.findOne({ name: "user" });
    if (!existingRole) {
        const newRole = new user_1.Role({ name: "user" });
        await newRole.save(); // Create the "user" role if it doesn't exist
    }
    await (0, db_1.connectDB)(); // Connect to the test database
});
afterAll(async () => {
    await (0, db_1.disconnectDB)(); // Disconnect from the database after tests complete
});
describe('User registration and login', () => {
    it('should register a new user', async () => {
        const res = await (0, supertest_1.default)(app_1.default)
            .post('/api/user/register')
            .send({
            username: 'testuser',
            email: 'testuser@example.com', // Ensure it's unique for each test run
            password: 'password123'
        });
        console.log(res.body); // Log the response body for debugging
        expect(res.status).toBe(201); // Expect successful registration
        expect(res.body).toHaveProperty('email'); // Expect the user object to contain email
    });
});
