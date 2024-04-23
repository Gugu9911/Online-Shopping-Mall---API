import express from "express";
import { findOrderItemById} from "../controllers/orderItem";
import passport from "passport";

const router = express.Router();

router.get("/:orderItemId",passport.authenticate("jwt", { session: false }),findOrderItemById)

export default router;