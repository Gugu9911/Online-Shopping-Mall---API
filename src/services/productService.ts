import Product, {ProductDocument} from "../models/Product";

export const getAllProducts = async (): Promise<ProductDocument[]> => {
    return Product.find();
}

export const getOneProduct = async (productId: string): Promise<ProductDocument | null> => {
    return Product.findById(productId);
}

export const createProduct = async (product: ProductDocument): Promise<ProductDocument> => {
    return product.save();
}

export const updateProduct = async (productId: string, productData: Partial<ProductDocument>): Promise<ProductDocument | null> => {
    return Product.findByIdAndUpdate (productId, productData, {new: true});
}

export const deleteProduct = async (productId: string): Promise<ProductDocument | null> => {
    return Product.findByIdAndDelete(productId);
}

export const findProductsByCategory = async (categoryId: string): Promise<ProductDocument[]> => {
    console.log(categoryId);
    console.log(Product.find({category: categoryId}), "findProductsByCategoryService");
    return Product.find({category: categoryId});
}

export const findProductsByName = async (name: string): Promise<ProductDocument[]> => {
    return Product.find({ name: { $regex: new RegExp(name, 'i') } });
}



export default {getAllProducts, getOneProduct, createProduct, updateProduct, deleteProduct, findProductsByCategory, findProductsByName};