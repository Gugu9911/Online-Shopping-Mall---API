import express from "express";
import { createCategory, getAllCategories, deleteCategory, updateCategory, getCategoryByName } from "../controllers/categories";
import adminCheck from "../middlewares/adminCheck";


const router = express.Router();

router.get("/", getAllCategories);
router.post("/", createCategory);
router.get("/:name", getCategoryByName);
router.delete("/:categoryId", deleteCategory);
router.put("/:categoryId", updateCategory);

export default router;
