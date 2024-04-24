import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import Category from '../../src/models/Category';
import categoryService from '../../src/services/categoryService';

require('dotenv').config({ path: '../.env.test' });


describe('Category Service Tests', () => {
  let mongoServer: any;

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();
    await mongoose.connect(mongoUri);
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
  });

  afterEach(async () => {
    await Category.deleteMany();
  });

  // Test creating a category
  it('should create a category', async () => {
    const mockCategory = new Category({ name: 'Tech' });
    const savedCategory = await categoryService.createCategory(mockCategory);
    expect(savedCategory._id).toBeDefined();
    expect(savedCategory.name).toBe('Tech');
  });

  // Test retrieving a single category
  it('should retrieve a single category by ID', async () => {
    const mockCategory = new Category({ name: 'Tech' });
    const savedCategory = await mockCategory.save();

    const foundCategory = await categoryService.getOneCategory(savedCategory._id.toString());
    expect(foundCategory).not.toBeNull();
    expect(foundCategory?.name).toBe('Tech');
  });

  // Test retrieving all categories
  it('should retrieve all categories', async () => {
    const mockCategory1 = new Category({ name: 'Tech' });
    const mockCategory2 = new Category({ name: 'Lifestyle' });
    await mockCategory1.save();
    await mockCategory2.save();

    const categories = await categoryService.getAllCategories();
    expect(categories.length).toBe(2);
    expect(categories[0].name).toBe('Tech');
    expect(categories[1].name).toBe('Lifestyle');
  });

  // Test updating a category
  it('should update a category', async () => {
    const mockCategory = new Category({ name: 'Tech' });
    const savedCategory = await mockCategory.save();
    const updatedCategory = await categoryService.updateCategory(savedCategory._id.toString(), { name: 'Technology' });

    expect(updatedCategory).not.toBeNull();
    expect(updatedCategory?.name).toBe('Technology');
  });

  // Test deleting a category
  it('should delete a category', async () => {
    const mockCategory = new Category({ name: 'Tech' });
    const savedCategory = await mockCategory.save();

    const deletedCategory = await categoryService.deleteCategory(savedCategory._id.toString());
    expect(deletedCategory).not.toBeNull();
    expect(deletedCategory?._id).toEqual(savedCategory._id);

    const result = await Category.findById(savedCategory._id);
    expect(result).toBeNull();
  });
});
