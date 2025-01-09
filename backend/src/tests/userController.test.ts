// src/tests/userController.test.ts
import request from 'supertest';
import app from '../app';
import { connectDB, disconnectDB, dropTestDB } from '../config/db';
import { Role } from '../models/user'; // Make sure you import the Role model

// Clean up the database before each test
beforeEach(async () => {
    await dropTestDB(); // Clean up the DB before each test
});

// Ensure the "user" role exists before any tests run
beforeAll(async () => {
    const existingRole = await Role.findOne({ name: "user" });
    if (!existingRole) {
        const newRole = new Role({ name: "user" });
        await newRole.save(); // Create the "user" role if it doesn't exist
    }
    await connectDB(); // Connect to the test database
});

afterAll(async () => {
    await disconnectDB(); // Disconnect from the database after tests complete
});

describe('User registration and login', () => {
    it('should register a new user', async () => {
        const res = await request(app)
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
