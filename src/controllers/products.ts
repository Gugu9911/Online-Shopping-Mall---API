import { NextFunction, Request, Response } from "express";
import { InternalServerError } from "../utils/apiError";
import productsService from "../services/productService";
import Product from "../models/Product";

export async function createProduct(request: Request, response: Response, next: NextFunction) {
  try {
    const newProduct = new Product(request.body);
    const product = await productsService.createProduct(newProduct);
    response.status(201).json(product);
  } catch (error) {
    next(new InternalServerError());
  }
}

export async function deleteProduct(request: Request, response: Response, next: NextFunction) {
  try {
    const product = await productsService.deleteProduct(request.params.productId);
    if (!product) {
      response.status(404).json({ message: "Product not found" });
      return;
    }
    response.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    next(new InternalServerError());
  }
}

export async function updateProduct(request: Request, response: Response, next: NextFunction) {
  try {
    const product = await productsService.updateProduct(request.params.productId, request.body);
    if (!product) {
      response.status(404).json({ message: "Product not found" });
      return;
    }
    response.status(200).json(product);
  } catch (error) {
    next(new InternalServerError());
  }
}

export async function getAllProducts(_: Request, response: Response, next: NextFunction) {
  try {
    const products = await productsService.getAllProducts();
    response.status(200).json(products);
  } catch (error) {
    next(new InternalServerError());
  }
}

export async function getProductById(request: Request, response: Response, next: NextFunction) {
  try {
    const product = await productsService.getOneProduct(request.params.productId);
    if (!product) {
      response.status(404).json({ message: "Product not found" });
      return;
    }
    response.status(200).json(product);
  } catch (error) {
    next(new InternalServerError());
  }
}

export async function getProductsByCategory(request: Request, response: Response, next: NextFunction) {
  try {
    const products = await productsService.findProductsByCategory(request.params.categoryId);
    console.log(products,"productsController");
    response.status(200).json(products);
  } catch (error) {
    next(new InternalServerError());
  }
}
