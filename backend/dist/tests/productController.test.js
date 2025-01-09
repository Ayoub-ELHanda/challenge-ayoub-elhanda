"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/tests/productController.test.ts
const supertest_1 = __importDefault(require("supertest"));
const mongoose_1 = __importDefault(require("mongoose"));
const db_1 = require("../config/db");
const app_1 = __importDefault(require("../app"));
const testDB = process.env.TEST_MONGO_URI || 'mongodb://admin:password@localhost:27017/ecommerce_test';
beforeAll(async () => {
    await (0, db_1.connectDB)();
});
afterAll(async () => {
    // ✅ Check if connection is established before dropping the database
    if (mongoose_1.default.connection && mongoose_1.default.connection.readyState === 1) {
        if (mongoose_1.default.connection.db) {
            await (0, db_1.dropTestDB)();
        }
        await mongoose_1.default.disconnect();
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
        const response = await (0, supertest_1.default)(app_1.default)
            .post('/api/seller/products') // Ensure correct endpoint for seller products
            .send(productData);
        expect(response.status).toBe(201); // Expect successful creation
        expect(response.body).toHaveProperty('name'); // Check if the product has a name property
    });
});
