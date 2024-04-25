import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import Order from '../../src/models/Order';
import OrderItem from '../../src/models/OrderItem';
import Product from '../../src/models/Product'; // Corrected assumption
import User from '../../src/models/User'; // Corrected assumption
import orderService from '../../src/services/orderService';

describe('Order Service Tests', () => {
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
    await Order.deleteMany({});
    await OrderItem.deleteMany({});
    await User.deleteMany({});
    await Product.deleteMany({});
  });

  // Test creating an order
  it('should create an order', async () => {
    const user = await User.create({
      email: 'user@example.com',
      name: 'Test User'
    });

    const product = await Product.create({
      name: 'Product 1',
      price: 100
    });

    const items = [{
      product: product._id,
      quantity: 2
    }];

    const order = await orderService.createOrder(user._id.toString(), items);
    expect(order).toHaveProperty('_id');
    expect(order.items.length).toBe(1);
  });

  // Test for deleting a non-existing order
  it('should fail to delete a non-existing order', async () => {
    const fakeOrderId = new mongoose.Types.ObjectId();
    const result = await orderService.deleteOrder(fakeOrderId.toString());
    expect(result).toBeFalsy();
  });

});
