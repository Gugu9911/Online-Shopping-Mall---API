import express from "express";
import { createOrder, deleteOrderAndItems, getAllOrders,getOrdersByUserId } from "../controllers/order";
import passport from "passport";
import adminCheck from "../middlewares/adminCheck";

const router = express.Router();

router.post("/", passport.authenticate("jwt", { session: false }),createOrder);

router.get("/getOrder/:userId", passport.authenticate("jwt", { session: false }), getOrdersByUserId);

router.delete("/:orderId", passport.authenticate("jwt", { session: false }), adminCheck, deleteOrderAndItems);

router.get("/", passport.authenticate("jwt", { session: false }), adminCheck, getAllOrders);




export default router;