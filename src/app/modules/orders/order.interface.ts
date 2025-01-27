import { Types } from 'mongoose';

export type TOrder = {
  orderId: string;
  user: Types.ObjectId;
  product: Types.ObjectId;
  quantity: number;
  totalPrice: number;
  address?: string;
};
