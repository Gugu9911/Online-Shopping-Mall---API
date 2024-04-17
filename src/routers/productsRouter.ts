import express from "express";
import { getAllProducts, createProduct, deleteProduct, updateProduct, getProductByname } from "../controllers/products";


const router = express.Router();

router.get("/", getAllProducts);
router.get("/:productId", getProductByname);
router.put("/:productId", updateProduct);
router.post("/", createProduct);
router.delete("/:productId", deleteProduct);

export default router;
