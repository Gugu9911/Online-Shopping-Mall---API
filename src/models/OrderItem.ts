import mongoose, { Document, Schema } from 'mongoose';

import { OrderItem } from '../types/Order';
import { transformSchema } from "../utils/transform";



export const OrderItemSchema = new Schema({
  product: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Product'
  },
  quantity: {
    type: Number,
    default: 1
  }
}); 

transformSchema(OrderItemSchema);
export type OrderItemDocument = Document & OrderItem;
export default mongoose.model<OrderItemDocument>('OrderItem', OrderItemSchema);