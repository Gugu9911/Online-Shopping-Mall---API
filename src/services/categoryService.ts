import Category, {CategoryDocument} from "../models/Category";

const createCategory = async (category: CategoryDocument): Promise<CategoryDocument> => {
  return await category.save();
}

const getOneCategory = async (categoryId: string): Promise<CategoryDocument | null> => {
    const category = await Category.findById(categoryId);
    return category;
}

const getAllCategories = async (): Promise<CategoryDocument[]> => {
  return await Category.find().exec();
}

const updateCategory = async (categoryId: string, categoryData: Partial<CategoryDocument>): Promise<CategoryDocument | null> => {
    return await Category.findByIdAndUpdate(categoryId, categoryData, { new: true }).exec();
}

const deleteCategory = async (categoryId: string): Promise<CategoryDocument | null> => {
  return await Category.findByIdAndDelete(categoryId).exec();
}

export default { createCategory, deleteCategory, getOneCategory, getAllCategories, updateCategory};

