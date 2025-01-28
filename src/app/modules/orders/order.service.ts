import httpStatus from 'http-status';
import { AppError } from '../../errors/AppError';
import { BicycleModel } from '../bicycle/bicycle.model';
import { TOrder } from './order.interface';
import { OrderModel } from './order.model';
import mongoose from 'mongoose';
import { generateOrderId } from '../../utils/generateID';
import { UserModel } from '../user/user.model';
import { orderUtils } from './order.utils';

const createOrderIntoDB = async (order: TOrder, client_ip: string) => {
  const bicycleExists = await BicycleModel.isBicycleExists(
    order.product as unknown as string,
  );

  if (!bicycleExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Bicycle not found');
  }
  const remainingQuantity = bicycleExists.quantity - order.quantity;

  if (remainingQuantity < 0) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Insufficient stock. The order cannot be placed.',
    );
  }

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // (first transaction)
    const updatedBicycleQuantity = await BicycleModel.findOneAndUpdate(
      { _id: order.product },
      {
        quantity: remainingQuantity,
        inStock: remainingQuantity > 0 ? true : false,
      },
      { new: true, session },
    );

    if (!updatedBicycleQuantity) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        'Failed to update bicycle stock',
      );
    }

    // second session to create order
    // generate order id
    order.orderId = await generateOrderId();

    const newOrder = await OrderModel.create([order], { session });

    if (!newOrder?.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create Order');
    }

    await session.commitTransaction();
    await session.endSession();

    //get user
    const user = await UserModel.findById(newOrder[0].user);

    //payment integration

    const shurjopayPayload = {
      amount: newOrder[0].totalPrice,
      order_id: newOrder[0].orderId,
      currency: 'BDT',
      customer_name: user?.name,
      customer_address: newOrder[0]?.address,
      customer_email: user?.email,
      customer_phone: 'N/a',
      customer_city: 'N/a',
      client_ip,
    };

    const payment = await orderUtils.makePayment(shurjopayPayload);

    if (payment?.transactionStatus) {
      await OrderModel.updateOne(
        { _id: newOrder[0]._id },
        {
          $set: {
            transaction: {
              paymentId: payment.sp_order_id,
              transactionStatus: payment.transactionStatus,
            },
          },
        },
      );
    }

    const updatedOrder = await OrderModel.findById(newOrder[0]._id);

    return {
      order: updatedOrder,
      payment,
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};

const verifyPayment = async (paymentId: string) => {
  const payment = await orderUtils.verifyPayment(paymentId);

  if (payment.length) {
    await OrderModel.findOneAndUpdate(
      {
        'transaction.paymentId': paymentId,
      },
      {
        'transaction.bank_status': payment[0].bank_status,
        'transaction.sp_code': payment[0].sp_code,
        'transaction.sp_message': payment[0].sp_message,
        'transaction.method': payment[0].method,
        'transaction.date_time': payment[0].date_time,
        'transaction.transactionStatus': payment[0].transaction_status,
        status:
          payment[0].bank_status == 'Success'
            ? 'paid'
            : payment[0].bank_status == 'Failed'
              ? 'pending'
              : payment[0].bank_status == 'Cancel'
                ? 'cancelled'
                : '',
      },
    );
  }

  await OrderModel.findOneAndUpdate(
    { paymentId },
    { status: 'paid' },
    { new: true },
  );
  return payment;
};

const calculateTotalRevenue = async () => {
  const result = await OrderModel.aggregate([
    // stage 1
    {
      $lookup: {
        from: 'bicycles',
        localField: 'product',
        foreignField: '_id',
        as: 'bicycleDetails',
      },
    },

    // stage 2
    {
      $unwind: {
        path: '$bicycleDetails',
      },
    },

    // stage 3
    {
      $addFields: {
        totalPrice: { $multiply: ['$bicycleDetails.price', '$quantity'] },
      },
    },

    // stage 4
    {
      $group: {
        _id: null,
        totalRevenue: { $sum: '$totalPrice' },
      },
    },

    // Stage 5
    {
      $project: {
        _id: 0,
        totalRevenue: 1,
      },
    },
  ]);

  if (result.length > 0) {
    return result[0].totalRevenue;
  } else {
    return 0;
  }
};

const getAllOrdersFromDB = async () => {
  const result = await OrderModel.find({}).populate('user').populate('product');
  return result;
};

const getMyOrdersFromDB = async (userId: string) => {
  const result = await OrderModel.find({ user: userId })
    .populate('user')
    .populate('product');
  return result;
};
const changeOrderStatus = async (id: string, payload: { status: string }) => {
  const result = await OrderModel.findByIdAndUpdate(id, payload, { new: true });
  return result;
};

export const OrderService = {
  createOrderIntoDB,
  calculateTotalRevenue,
  getAllOrdersFromDB,
  getMyOrdersFromDB,
  changeOrderStatus,
  verifyPayment,
};
