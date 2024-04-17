import express from "express";
import { getAllProducts, createProduct, deleteProduct, updateProduct, getProductById, getProductsByCategory } from "../controllers/products";


const router = express.Router();

router.get("/", getAllProducts);
router.get("/:productId", getProductById);
router.put("/:productId", updateProduct);
router.post("/", createProduct);
router.delete("/:productId", deleteProduct);
router.post("/:categoryId", getProductsByCategory);

export default router;
