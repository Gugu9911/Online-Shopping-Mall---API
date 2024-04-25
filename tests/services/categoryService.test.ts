import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import Category from '../../src/models/Category';
import categoryService from '../../src/services/categoryService';

describe('Category Service Tests', () => {
  let mongoServer: MongoMemoryServer;

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    await mongoose.connect(uri);  // Corrected connect call without deprecated options
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
  });

  beforeEach(async () => {
    await Category.deleteMany({});
  });

  // Test creating a category
  it('should create a category', async () => {
    const categoryData = { name: 'Technology' };
    const category = new Category(categoryData);
    const savedCategory = await categoryService.createCategory(category);
    expect(savedCategory).toHaveProperty('_id');
    expect(savedCategory.name).toEqual('Technology');
  });

  // Test getting a category by ID
  it('should get a single category by ID', async () => {
    const category = new Category({ name: 'Entertainment' });
    await category.save();
    const foundCategory = await categoryService.getOneCategory(category._id.toString());
    expect(foundCategory).not.toBeNull();
    expect(foundCategory?.name).toEqual('Entertainment');
  });

  // Test getting all categories
  it('should get all categories', async () => {
    await Category.create([{ name: 'Entertainment' }, { name: 'Technology' }]);
    const categories = await categoryService.getAllCategories();
    expect(categories.length).toEqual(2);
  });

  // Test updating a category
  it('should update a category', async () => {
    const category = new Category({ name: 'Old Name' });
    await category.save();
    const updatedCategory = await categoryService.updateCategory(category._id.toString(), { name: 'New Name' });
    expect(updatedCategory?.name).toEqual('New Name');
  });

  // Test deleting a category
  it('should delete a category', async () => {
    const category = new Category({ name: 'Delete Me' });
    await category.save();
    const deletedCategory = await categoryService.deleteCategory(category._id.toString());
    const foundCategory = await Category.findById(category._id);
    expect(deletedCategory).not.toBeNull();
    expect(foundCategory).toBeNull();
  });
});
