import request from 'supertest';
import mongoose from 'mongoose';
import app from '../app';  // Adjust based on your actual file structure and export method
import { Product } from '../models/product'; // Ensure Product is correctly exported from your models

const baseUrl = '/api/products';

beforeAll(async () => {
  // Connect to a test database
  const url = 'mongodb://localhost:27017/testProductController';
  await mongoose.connect(url);
});

afterAll(async () => {
  // Clean up database and close connection
  if (mongoose.connection.db) {
    await mongoose.connection.db.dropDatabase();
  }
  await mongoose.disconnect();
});

afterEach(async () => {
  // Ensure each test has a clean slate by removing all data
  await Product.deleteMany({});
});

describe('Product Management', () => {
  describe('Create a product', () => {
    it('should create a product successfully', async () => {
      const productData = {
        title: 'Sample eBook',
        author: 'John Doe',
        price: 9.99,
        isbn: '1234567890',
        publisher: 'Test Publisher',
        publicationDate: new Date(),
        format: 'PDF'
      };

      const response = await request(app)
        .post(`${baseUrl}`)
        .send(productData);

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('_id');
      expect(response.body.title).toEqual('Sample eBook');
    });
  });

  describe('Get products', () => {
    it('should retrieve a list of products', async () => {
      await Product.create({
        title: 'Sample eBook',
        author: 'John Doe',
        price: 9.99,
        isbn: '1234567890',
        publisher: 'Test Publisher',
        publicationDate: new Date(),
        format: 'PDF'
      });

      const response = await request(app)
        .get(`${baseUrl}`);

      expect(response.status).toBe(200);
      expect(response.body.length).toBeGreaterThan(0);
    });
  });

  describe('Update a product', () => {
    it('should update a product successfully', async () => {
      const product = await Product.create({
        title: 'Old Title',
        author: 'John Doe',
        price: 10.99,
        isbn: '1234567890',
        publisher: 'Test Publisher',
        publicationDate: new Date(),
        format: 'ePub'
      });

      const updateData = { title: 'New Title' };
      const response = await request(app)
        .put(`${baseUrl}/${product._id}`)
        .send(updateData);

      expect(response.status).toBe(200);
      expect(response.body.title).toEqual('New Title');
    });
  });

  describe('Delete a product', () => {
    it('should delete a product successfully', async () => {
      const product = await Product.create({
        title: 'To Be Deleted',
        author: 'John Doe',
        price: 10.99,
        isbn: '1234567890',
        publisher: 'Test Publisher',
        publicationDate: new Date(),
        format: 'ePub'
      });

      const response = await request(app)
        .delete(`${baseUrl}/${product._id}`);

      expect(response.status).toBe(204);
    });
  });
});
