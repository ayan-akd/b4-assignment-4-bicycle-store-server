/* eslint-disable @typescript-eslint/no-explicit-any */
import { TUser } from './user.interface';
import { UserModel } from './user.model';
import { generateUserId } from '../../utils/generateID';
import QueryBuilder from '../../builder/QueryBuilder';

// create teacher into db
const createUserIntoDB = async (payload: Partial<TUser>) => {
  // set generated id
  payload.id = await generateUserId();

  // create a user
  const newUser = await UserModel.create(payload);

  return newUser;
};

// get personal details from db
const getMeFromDB = async (email: string) => {
  const result = await UserModel.findOne({ email });
  return result;
};

// change status in user
const changeStatusIntoDB = async (id: string, payload: { status: string }) => {
  const result = await UserModel.findByIdAndUpdate(id, payload, {
    new: true,
  });
  return result;
};

const getAllUsersFromDB = async (query: Record<string, unknown>) => {
  const userQuery = new QueryBuilder(UserModel.find(), query)
    .filter()
    .sort()
    .paginate()
    .fields();
  const data = await userQuery.modelQuery;
  const meta = await userQuery.countTotal();
  return {
    data,
    meta,
  };
};

export const UserServices = {
  createUserIntoDB,
  getMeFromDB,
  changeStatusIntoDB,
  getAllUsersFromDB,
};
