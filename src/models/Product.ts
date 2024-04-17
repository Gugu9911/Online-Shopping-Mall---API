import mongoose, { Document } from "mongoose";
import { transformSchema } from "../utils/transform";
import { Product } from "../types/Product";

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  price: {
    type: Number,
    default: 0,
  },
  description: {
    type: String,
    require: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Category",
  },
  image: {
    type: String,
    require: true,
  },
});


transformSchema(ProductSchema);

export type ProductDocument = Document & Product;

export default mongoose.model<ProductDocument>("Product", ProductSchema);
