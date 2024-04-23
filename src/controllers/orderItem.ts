import { NextFunction, Request, Response } from 'express';
import { InternalServerError } from '../errors/ApiError';
import OrderItem from '../models/OrderItem';
import orderItemService from '../services/orderItemService';
import orderServive from '../services/orderService';


export async function findOrderItemById(request: Request, response: Response, next: NextFunction) {
    try {
        const orderItem = await orderItemService.findOrderItemById(request.params.orderItemId);
        if (!orderItem) {
            response.status(404).json({ message: 'OrderItem not found' });
            return;
        }
        response.status(200).json(orderItem);
    } catch (error) {
        next(new InternalServerError());
    }
}

