import Order, {OrderDocument} from "../models/Order";
import OrderItem,{OrderItemDocument} from "../models/OrderItem";
import { OrderItem as OrderItemInterface } from "../types/Order";

const createOrder = async (userId:string, items:OrderItemInterface[]) => {
  try {
    // Validate inputs
    if (!userId || !items || items.length === 0) {
      throw new Error("Invalid user ID or items list.");
    }

    // Create and save OrderItem documents
    const orderItems = await Promise.all(items.map(async item => {
      const orderItem = new OrderItem({
        product: item.product,
        quantity: item.quantity
      });
      return await orderItem.save();
    }));

    // Create and save the Order document
    const order = new Order({
      user: userId,
      items: orderItems.map(item => item._id) // Use ._id to reference the MongoDB default ID field
    });
    await order.save();

    return order;
  } catch (error) {
    console.error('Error creating order:', error);
    throw new Error('Failed to create order');
  }
};

const getOrdersByUserId = async (userId: string): Promise<OrderDocument[]> => {
  try {
    return await Order.find({ user: userId }).populate({
      path: 'items', 
      model: 'OrderItem', 
      populate: { 
        path: 'product', 
        model: 'Product'
      }
    });
  } catch (error) {
    throw new Error("Failed to fetch orders");
  }
}

const deleteOrderItemsFromOrder = async (orderId: string, orderItemIds: string[]): Promise<OrderDocument | null> => {
  try {
    return await Order.findByIdAndUpdate(
      orderId, 
      { $pullAll: { items: orderItemIds } }, // Use $pullAll to remove multiple items
      { new: true }
    );
  } catch (error) {
    throw new Error("Failed to delete order items from order");
  }
}

const getOrderById = async (orderId: string): Promise<OrderDocument | null> => {
  try {
    return await Order.findById(orderId);
  } catch (error) {
    throw new Error("Failed to fetch order");
  }
}

const deleteOrder = async (orderId: string): Promise<boolean> => {
  try {
    const deletedOrder = await Order.findByIdAndDelete(orderId).populate('items');
    return !!deletedOrder;
  } catch (error) {
    throw new Error("Failed to delete order");
  }
}

const getAllOrders = async (): Promise<OrderDocument[]> => {
  try {
    return await Order.find().populate({
      path: 'items', 
      model: 'OrderItem', 
      populate: { 
        path: 'product', 
        model: 'Product'
      }
    });
  } catch (error) {
    throw new Error("Failed to fetch orders");
  }
}




export default { createOrder,deleteOrderItemsFromOrder, getAllOrders, getOrdersByUserId, deleteOrder, getOrderById};