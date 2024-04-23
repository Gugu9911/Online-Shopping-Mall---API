import { NextFunction, Request, Response } from 'express';
import { InternalServerError,BadRequest} from '../errors/ApiError';
import orderService from '../services/orderService';
import Order from '../models/Order';
import OrderItem from '../models/OrderItem';


export async function createOrder(request: Request, response: Response, next: NextFunction) {
    try {
        const { user, items } = request.body;
        console.log({ user, items }, 'user');
        if (!user || !items) {
            next(new BadRequest('User and items are required'));
            return;
        }
        const order = await orderService.createOrder(user, items);
        response.status(201).json(order);
    } catch (error) {
        next(new InternalServerError());
    }
}

export async function getOrdersByUserId(request: Request, response: Response, next: NextFunction) {
    try {
        const orders = await orderService.getOrdersByUserId(request.params.userId);
        console.log(orders, 'orders');
        response.status(200).json(orders);
    } catch (error) {
        next(new InternalServerError());
    }
}

export async function deleteOrderAndItems(request: Request, response: Response, next: NextFunction) {
    const orderId = request.params.orderId;

    try {
        // Find the order to ensure it exists before attempting to delete
        const order = await orderService.getOrderById(orderId);
        if (!order) {
            return response.status(404).json({ message: 'Order not found' });
        }

        // Attempt to delete all order items associated with the order
        const orderItemDeletionResults = await OrderItem.deleteMany({ _id: { $in: order.items } });
        if (orderItemDeletionResults.deletedCount === 0) {
            console.log('No order items found or deleted');
        } else {
            console.log(`${orderItemDeletionResults.deletedCount} order items deleted`);
        }

        // After deleting the order items, delete the order itself
        const orderDeleted = await Order.findByIdAndDelete(orderId);
        if (!orderDeleted) {
            return response.status(404).json({ message: 'Failed to delete order after order items' });
        }

        response.status(200).json({ message: 'Order and all associated order items deleted successfully' });
    } catch (error) {
        console.error('Error handling order and order items deletion:', error);
        next(new InternalServerError());
    }
}



// export async function deleteOrder(request: Request, response: Response, next: NextFunction) {
//     try {
//         const order = await orderService.deleteOrder(request.params.orderId);
//         if (!order) {
//             response.status(404).json({ message: 'Order not found' });
//             return;
//         }
//         response.status(200).json({ message: 'Order deleted successfully' });
//     } catch (error) {
//         next(new InternalServerError());
//     }
// }

// export async function deleteOrderItemFromOrder(request: Request, response: Response, next: NextFunction) {
//     try {
//         const order = await orderService.deleteOrderItemFromOrder(request.params.orderId, request.params.orderItemId);
//         if (!order) {
//             response.status(404).json({ message: 'Order not found' });
//             return;
//         }
//         response.status(200).json(order);
//     } catch (error) {
//         next(new InternalServerError());
//     }
// }


export async function getAllOrders(request: Request, response: Response, next: NextFunction) {
    try {
        const orders = await orderService.getAllOrders();
        response.status(200).json(orders);
    } catch (error) {
        next(new InternalServerError());
    }
}
