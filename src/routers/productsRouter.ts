import express from "express";
import { getAllProducts, createProduct, deleteProduct, updateProduct, getProductById, getProductsByCategory, getProductsByName} from "../controllers/products";


const router = express.Router();

router.get("/", getAllProducts);
router.get("/by-id/:productId", getProductById);
router.put("/:productId", updateProduct);
router.post("/", createProduct);
router.delete("/:productId", deleteProduct);
router.post("/:categoryId", getProductsByCategory);
router.get("/by-name/:name", getProductsByName);

export default router;
