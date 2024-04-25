import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import User from '../../src/models/User';
import userService from '../../src/services/userService';

describe('User Service Tests', () => {
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
    await User.deleteMany({});
  });

  // Test creating a user
  it('should create a user', async () => {
    const userData = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      password: 'password123',
      userName: 'john_doe',
      role: 'customer'
    };

    const user = new User(userData);
    const savedUser = await userService.createUser(user);
    expect(savedUser).toHaveProperty('_id');
    expect(savedUser.email).toEqual('john.doe@example.com');
  });

  // Test fetching all users
  it('should fetch all users', async () => {
    await userService.createUser(new User({ firstName: 'John', lastName: 'Doe', email: 'john@example.com', password: 'password', userName: 'john_doe', role: 'customer' }));
    await userService.createUser(new User({ firstName: 'Jane', lastName: 'Doe', email: 'jane@example.com', password: 'password', userName: 'jane_doe', role: 'admin' }));

    const users = await userService.getAllUsers();
    expect(users.length).toEqual(2);
  });

// Test updating a user
it('should update a user', async () => {
    const user = await userService.createUser(new User({
      firstName: 'John',
      lastName: 'Doe',
      email: 'update@example.com',
      password: 'password',
      userName: 'update_user',
      role: 'customer'
    }));
  
    // Correct the field name to match the schema
    const updatedUser = await userService.updateUser(user._id.toString(), { firstName: 'Updated' });
  
    expect(updatedUser?.firstName).toEqual('Updated');
  });
  
  

  // Test deleting a user
  it('should delete a user', async () => {
    const user = await userService.createUser(new User({ firstName: 'John', lastName: 'Doe', email: 'delete@example.com', password: 'password', userName: 'delete_user', role: 'customer' }));
    const result = await userService.deleteUser(user._id.toString());

    expect(result).toBeTruthy();
    const deletedUser = await User.findById(user._id);
    expect(deletedUser).toBeNull();
  });

  // Test finding a user by ID
  it('should find a user by ID', async () => {
    const user = await userService.createUser(new User({ firstName: 'John', lastName: 'Doe', email: 'findbyid@example.com', password: 'password', userName: 'findbyid_user', role: 'customer' }));
    const foundUser = await userService.findUserByID(user._id.toString());

    expect(foundUser).not.toBeNull();
    expect(foundUser?._id.toString()).toEqual(user._id.toString());
  });

  // Test finding a user by email
  it('should find a user by email', async () => {
    const user = await userService.createUser(new User({ firstName: 'John', lastName: 'Doe', email: 'findbyemail@example.com', password: 'password', userName: 'findbyemail_user', role: 'customer' }));
    const foundUser = await userService.findUserByEmail('findbyemail@example.com');

    expect(foundUser).not.toBeNull();
    expect(foundUser?.email).toEqual('findbyemail@example.com');
  });
});
