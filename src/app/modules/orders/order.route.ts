import express from 'express';
import { OrderController } from './order.controller';
import validateRequest from '../../middlewares/validateRequest';
import { orderValidationSchema } from './order.validation';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();

router.post(
  '/orders',
  auth(USER_ROLE.user, USER_ROLE.admin),
  validateRequest(orderValidationSchema),
  OrderController.createOrder,
);

router.get('/orders/revenue', OrderController.orderRevenue);

router.get('/orders');

export const OrderRoutes = router;
