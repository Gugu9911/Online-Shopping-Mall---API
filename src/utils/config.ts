import dotenv from 'dotenv';
import { logger } from './logger';
dotenv.config();

export const config = {
  PORT: process.env.PORT || 8080,
  MONGODB_URI: process.env.NODE_ENV === 'test' 
    ? process.env.TEST_MONGODB_URI
    : process.env.MONGODB_URI
};

if (!config.MONGODB_URI) {
  logger.error('MONGODB_URI is not defined in the environment variables');
  process.exit(1); 
}

export default config;