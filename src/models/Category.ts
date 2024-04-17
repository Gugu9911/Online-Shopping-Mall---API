import mongoose, { Document } from "mongoose";

import { transformSchema } from "../utils/transform";
import { Category } from "../types/Category";

export const CategorySchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
});

transformSchema(CategorySchema);

export type CategoryDocument = Document & Category;

export default mongoose.model<CategoryDocument>("Categories", CategorySchema);
