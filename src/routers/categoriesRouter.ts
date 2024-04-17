import express from "express";
import { createCategory, getAllCategories, deleteCategory, updateCategory, getCategoryByName } from "../controllers/categories";
import adminCheck from "../middlewares/adminCheck";


const router = express.Router();

router.get("/", getAllCategories);
router.post("/", createCategory);
router.get("/:name", getCategoryByName);
router.delete("/:name", deleteCategory);
router.put("/:name", updateCategory);

export default router;
