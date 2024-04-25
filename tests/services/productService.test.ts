import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import Product from '../../src/models/Product';
import productService from '../../src/services/productService';

describe('Product Service Tests', () => {
  let mongoServer: MongoMemoryServer;

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    await mongoose.connect(uri);
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
  });

  beforeEach(async () => {
    await Product.deleteMany({});
  });

  // Test creating a product
  it('should create a product', async () => {
    const productData = {
      name: 'Laptop',
      price: 999.99,
      description: 'High-performance laptop',
      category: new mongoose.Types.ObjectId(), // Simulate category ID
      image: 'http://example.com/laptop.png'
    };

    const product = new Product(productData);
    const savedProduct = await productService.createProduct(product);
    expect(savedProduct).toHaveProperty('_id');
    expect(savedProduct.name).toEqual('Laptop');
  });

  // Test fetching all products
  it('should fetch all products', async () => {
    await productService.createProduct(new Product({ name: 'Laptop', price: 999.99, description: 'High-performance laptop', category: new mongoose.Types.ObjectId(), image: 'http://example.com/laptop.png' }));
    await productService.createProduct(new Product({ name: 'Smartphone', price: 499.99, description: 'Latest model smartphone', category: new mongoose.Types.ObjectId(), image: 'http://example.com/smartphone.png' }));

    const products = await productService.getAllProducts();
    expect(products.length).toEqual(2);
  });

  // Test updating a product
  it('should update a product', async () => {
    const product = await productService.createProduct(new Product({ name: 'Tablet', price: 199.99, description: 'Portable tablet', category: new mongoose.Types.ObjectId(), image: 'http://example.com/tablet.png' }));
    const updatedProduct = await productService.updateProduct(product._id.toString(), { price: 299.99 });

    expect(updatedProduct?.price).toEqual(299.99);
  });

  // Test deleting a product
  it('should delete a product', async () => {
    const product = await productService.createProduct(new Product({ name: 'Camera', price: 299.99, description: 'High-quality camera', category: new mongoose.Types.ObjectId(), image: 'http://example.com/camera.png' }));
    const deletedProduct = await productService.deleteProduct(product._id.toString());

    expect(deletedProduct).not.toBeNull();
    const foundProduct = await Product.findById(product._id);
    expect(foundProduct).toBeNull();
  });

  // Test finding products by category
  it('should find products by category', async () => {
    const categoryId = new mongoose.Types.ObjectId();
    await productService.createProduct(new Product({ name: 'Monitor', price: 150.00, description: '24-inch monitor', category: categoryId, image: 'http://example.com/monitor.png' }));

    const products = await productService.findProductsByCategory(categoryId.toString());
    expect(products.length).toEqual(1);
    expect(products[0].category.toString()).toEqual(categoryId.toString());
  });

  // Test finding products by name
  it('should find products by name', async () => {
    await productService.createProduct(new Product({ name: 'Mouse', price: 25.99, description: 'Wireless mouse', category: new mongoose.Types.ObjectId(), image: 'http://example.com/mouse.png' }));

    const products = await productService.findProductsByName('mouse');
    expect(products.length).toEqual(1);
    expect(products[0].name).toEqual('Mouse');
  });
});
