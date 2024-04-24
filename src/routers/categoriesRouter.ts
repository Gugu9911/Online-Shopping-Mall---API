import express from "express";
import { createCategory, getAllCategories, deleteCategory, updateCategory, getCategoryByName } from "../controllers/categories";
import adminCheck from "../middlewares/adminCheck";
import passport from "passport";

const router = express.Router();

router.get("/", getAllCategories);
router.post("/", passport.authenticate("jwt", { session: false }), adminCheck, createCategory);
router.get("/:name", getCategoryByName);
router.delete("/:categoryId", passport.authenticate("jwt", { session: false }), adminCheck, deleteCategory);
router.put("/:categoryId", passport.authenticate("jwt", { session: false }), adminCheck, updateCategory);

export default router;
