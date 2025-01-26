import { OrderModel } from '../modules/orders/order.model';
import { UserModel } from '../modules/user/user.model';

// order id
export const generateOrderId = async () => {
  const findLastOrderId = async () => {
    const lastOrder = await OrderModel.findOne(
      {},
      {
        id: 1,
        _id: 0,
      },
    )
      .sort({
        createdAt: -1,
      })
      .lean();

    return lastOrder?.id ? lastOrder.id.substring(2) : undefined;
  };
  let currentId = (0).toString();
  const lastOrderId = await findLastOrderId();

  if (lastOrderId) {
    currentId = lastOrderId.substring(2);
  }

  let incrementId = (Number(currentId) + 1).toString().padStart(4, '0');

  incrementId = `Order-${incrementId}`;
  return incrementId;
};

// user id
export const generateUserId = async () => {
  const findLastUserId = async () => {
    const lastUser = await UserModel.findOne(
      {},
      {
        id: 1,
        _id: 0,
      },
    )
      .sort({
        createdAt: -1,
      })
      .lean();

    return lastUser?.id ? lastUser.id.substring(2) : undefined;
  };
  let currentId = (0).toString();
  const lastOrderId = await findLastUserId();

  if (lastOrderId) {
    currentId = lastOrderId.substring(2);
  }

  let incrementId = (Number(currentId) + 1).toString().padStart(4, '0');

  incrementId = `User-${incrementId}`;
  return incrementId;
};
