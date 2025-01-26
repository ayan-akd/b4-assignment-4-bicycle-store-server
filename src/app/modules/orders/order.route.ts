import express from 'express';
import { OrderController } from './order.controller';
import validateRequest from '../../middlewares/validateRequest';
import { orderValidationSchema } from './order.validation';

const router = express.Router();

router.post(
  '/orders',
  validateRequest(orderValidationSchema),
  OrderController.createOrder,
);

router.get('/orders/revenue', OrderController.orderRevenue);

router.get('/orders');

export const OrderRoutes = router;
