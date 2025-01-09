// src/tests/productController.test.ts
import request from 'supertest';
import mongoose from 'mongoose';
import { connectDB, disconnectDB, dropTestDB } from '../config/db';

import app from '../app';

const testDB = process.env.TEST_MONGO_URI || 'mongodb://admin:password@localhost:27017/ecommerce_test';

beforeAll(async () => {
    await connectDB();
});

afterAll(async () => {
    // ✅ Check if connection is established before dropping the database
    if (mongoose.connection && mongoose.connection.readyState === 1) {
        if (mongoose.connection.db) {
            await dropTestDB();
        }
        await mongoose.disconnect();
    }
});

describe('Product Management', () => {
    it('should create a product successfully', async () => {
      const productData = {
        name: 'Test Product',
        price: '100',
        description: 'A test product',
        categories: ['Category1', 'Category2'],
      };
  
      const response = await request(app)
        .post('/api/seller/products')  // Ensure correct endpoint for seller products
        .send(productData);
  
      expect(response.status).toBe(201);  // Expect successful creation
      expect(response.body).toHaveProperty('name');  // Check if the product has a name property
    });
  });