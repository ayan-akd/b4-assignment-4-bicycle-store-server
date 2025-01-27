import httpStatus from 'http-status';
import { AppError } from '../../errors/AppError';
import { BicycleModel } from '../bicycle/bicycle.model';
import { TOrder } from './order.interface';
import { OrderModel } from './order.model';
import mongoose from 'mongoose';
import { generateOrderId } from '../../utils/generateID';

const createOrderIntoDB = async (order: TOrder) => {
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

    return newOrder[0];

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
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

export const OrderService = {
  createOrderIntoDB,
  calculateTotalRevenue,
};
