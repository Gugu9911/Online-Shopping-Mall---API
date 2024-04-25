import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';

export type MongoHelper = {
  closeDatabase: () => Promise<void>;
  clearDatabase: () => Promise<void>;
};

async function connect(): Promise<MongoHelper> {
  const mongodb = await MongoMemoryServer.create();


  // Connect to the generated URI
  mongoose.connect('mongodb://localhost:27017/testdb'); // Removed deprecated options

  return {
    // Clear the database: delete all data, but keep collections
    clearDatabase: async () => {
      const collections = mongoose.connection.collections;
      for (const key in collections) {
        const collection = collections[key];
        await collection.deleteMany({});
      }
    },
    // Close the database: close mongoose connection and stop MongoDB memory server
    closeDatabase: async () => {
      await mongoose.connection.dropDatabase();
      await mongoose.connection.close();
      await mongodb.stop();
    }
  };
}

export default connect;
