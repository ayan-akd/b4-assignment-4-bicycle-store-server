/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { OrderService } from './order.service';
import catchAsync from '../../utils/catchAsync';

// create order
const createOrder = catchAsync(async (req: Request, res: Response) => {
  const orderData = req.body;
  const result = await OrderService.createOrderIntoDB(orderData);
  res.status(200).json({
    success: true,
    message: 'Order created successfully',
    data: result,
  });
});


const orderRevenue = catchAsync(async (req: Request, res: Response) => {
  const result = await OrderService.calculateTotalRevenue();
  res.status(200).json({
    success: true,
    message: 'Revenue calculated successfully',
    data: result,
  });
});

export const OrderController = {
  createOrder,
  orderRevenue,
};
