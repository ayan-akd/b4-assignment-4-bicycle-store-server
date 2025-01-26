/* eslint-disable @typescript-eslint/no-explicit-any */
import { TUser } from './user.interface';
import { UserModel } from './user.model';
import { generateUserId } from '../../utils/generateID';

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

export const UserServices = {
  createUserIntoDB,
  getMeFromDB,
  changeStatusIntoDB,
};
