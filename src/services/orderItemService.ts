import { NotFoundError } from "../utils/apiError";
import OrderItem,{OrderItemDocument} from "../models/OrderItem";

const createOrderItem = async (orderItem: OrderItemDocument): Promise<OrderItemDocument> => {
  return await orderItem.save();
}

const deleteOrderItem = async (orderItemId: string): Promise<boolean> => {
  try {
    const deletedOrderItem = await
    OrderItem
    .findByIdAndDelete(orderItemId);
    return !!deletedOrderItem;
  } catch (error) {
    throw new NotFoundError();
  }
}

const findOrderItemById = async (orderItemId: string): Promise<OrderItemDocument | null> => {
  try {
    return await OrderItem.findById(orderItemId).populate("product");
  } catch (error) {
    throw new NotFoundError();
  }
}





export default { createOrderItem, deleteOrderItem, findOrderItemById};