import { Types } from 'mongoose';

export type TOrder = {
  id: string;
  user: Types.ObjectId;
  product: Types.ObjectId;
  quantity: number;
  totalPrice: number;
  status?:
    | 'pending'
    | 'shipped'
    | 'delivered'
    | 'cancelled'
    | 'processing'
    | 'completed'
    | 'refunded';
};
