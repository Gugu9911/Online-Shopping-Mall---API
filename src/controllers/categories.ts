import { NextFunction, Request, Response } from "express";
import { InternalServerError } from "../utils/apiError";
import categoryService from "../services/categoryService";
import Category from "../models/Category";

export async function createCategory(request: Request, response: Response, next: NextFunction) {
  try {
    const newCategory = new Category(request.body);
    const category = await categoryService.createCategory(newCategory);
    response.status(201).json(category);
  } catch (error) {
    next(new InternalServerError());
  }
}

export async function deleteCategory(request: Request, response: Response, next: NextFunction) {
  try {
    const category = await categoryService.deleteCategory(request.params.categoryId);
    if (!category) {
      response.status(404).json({ message: "Category not found" });
      return;
    }
    response.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    next(new InternalServerError());
  }
}

export async function updateCategory(request: Request, response: Response, next: NextFunction) {
  try {
    const category = await categoryService.updateCategory(request.params.categoryId, request.body);
    if (!category) {
      response.status(404).json({ message: "Category not found" });
      return;
    }
    response.status(200).json(category);
  } catch (error) {
    next(new InternalServerError());
  }
}

export async function getAllCategories(_: Request, response: Response, next: NextFunction) {
  try {
    const categories = await categoryService.getAllCategories();
    response.status(200).json(categories);
  } catch (error) {
    next(new InternalServerError());
  }
}

export async function getCategoryByName(request: Request, response: Response, next: NextFunction) {
  try {
    const category = await categoryService.getOneCategory(request.params.categoryId);
    if (!category) {
      response.status(404).json({ message: "Category not found" });
      return;
    }
    response.status(200).json(category);
  } catch (error) {
    next(new InternalServerError());
  }
}
