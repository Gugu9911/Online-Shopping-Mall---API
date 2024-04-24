import express from "express";
import { getAllProducts, createProduct, deleteProduct, updateProduct, getProductById, getProductsByCategory, getProductsByName} from "../controllers/products";
import adminCheck from "../middlewares/adminCheck";
import passport from "passport";

const router = express.Router();

router.get("/", getAllProducts);
router.get("/by-id/:productId", getProductById);
router.put("/:productId", passport.authenticate("jwt", { session: false }), adminCheck, updateProduct);
router.post("/", passport.authenticate("jwt", { session: false }), adminCheck, createProduct);
router.delete("/:productId", passport.authenticate("jwt", { session: false }), adminCheck, deleteProduct);
router.post("/:categoryId", getProductsByCategory);
router.get("/by-name/:name", getProductsByName);

export default router;
