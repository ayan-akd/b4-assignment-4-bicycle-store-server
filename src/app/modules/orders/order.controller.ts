/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { OrderService } from './order.service';
import catchAsync from '../../utils/catchAsync';

// create order
const createOrder = catchAsync(async (req: Request, res: Response) => {
  const orderData = req.body;
  const result = await OrderService.createOrderIntoDB(orderData, req.ip!);
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

const getAllOrders = catchAsync(async (req: Request, res: Response) => {
  const { data, meta } = await OrderService.getAllOrdersFromDB(req.query);
  res.status(200).json({
    success: true,
    message: 'Orders retrieved successfully',
    data,
    meta,
  });
});

const getMyOrders = catchAsync(async (req: Request, res: Response) => {
  //use params  
  const userId = req.params.userId;
  const result = await OrderService.getMyOrdersFromDB(userId);
  res.status(200).json({
    success: true,
    message: 'Orders retrieved successfully',
    data: result,
  });
});

const changeOrderStatus = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await OrderService.changeOrderStatus(id, req.body);
  res.status(200).json({
    success: true,
    message: 'Order status updated successfully',
    data: result,
  });
});

const verifyPayment = catchAsync(async (req: Request, res: Response) => {
  const { paymentId } = req.params;
  const result = await OrderService.verifyPayment(paymentId);
  res.status(200).json({
    success: true,
    message: 'Payment verified successfully',
    data: result,
  });
});

export const OrderController = {
  createOrder,
  orderRevenue,
  getAllOrders,
  getMyOrders,
  changeOrderStatus,
  verifyPayment,
};
