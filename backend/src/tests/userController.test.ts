// src/__tests__/userController.test.ts
import request from 'supertest';
import app from '../app'; // Make sure to export your Express app correctly
import mongoose from '../config/db';

// Before all tests, connect to your test database
beforeAll(async () => {
  await mongoose.connect('mongodb://admin:password@localhost:27017/ecommerce_test');
});

// After all tests, disconnect and clean up the database
afterAll(async () => {
  await mongoose.connection.close();
});

describe('User registration and login', () => {
  it('should register a new user', async () => {
    const res = await request(app)
      .post('/user/register')
      .send({
        username: 'newuser',
        email: 'newuser@example.com',
        password: 'password123'
      });
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('email', 'newuser@example.com');
  });

  it('should login the user', async () => {
    const res = await request(app)
      .post('/user/login')
      .send({
        email: 'newuser@example.com',
        password: 'password123'
      });
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('token');
  });
});
