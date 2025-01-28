import { Types } from 'mongoose';

export type TOrder = {
  orderId: string;
  user: Types.ObjectId;
  product: Types.ObjectId;
  quantity: number;
  totalPrice: number;
  address?: string;
  status?: 'pending' | 'shipped' | 'delivered' | 'cancelled' | 'paid';
  transaction?: {
    paymentId?: string;
    transactionStatus?: string;
    bank_status?: string;
    sp_code?: string;
    sp_message?: string;
    method?: string;
    date_time?: string;
  }
};
