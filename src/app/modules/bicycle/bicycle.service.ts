/* eslint-disable @typescript-eslint/no-explicit-any */
import { BicycleModel } from './bicycle.model';
import { TBicycle } from './bicycle.interface';
import QueryBuilder from '../../builder/QueryBuilder';
import { bicycleSearchableFields } from './bicycle.constant';
import httpStatus from 'http-status';
import { AppError } from '../../errors/AppError';

// create new bicycle here
const createBicycleIntoDB = async (bicycle: TBicycle) => {
  const newBicycle = await BicycleModel.create(bicycle);
  return newBicycle;
};

const getAllBicyclesFromDB = async (query: Record<string, unknown>) => {
  const bicycleQuery = new QueryBuilder(BicycleModel.find(), query)
    .search(bicycleSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const data = await bicycleQuery.modelQuery;
  const meta = await bicycleQuery.countTotal();

  return { data, meta };
};

const getSingleBicycleFromDB = async (id: string) => {
  // checking if bicycle exists
  const existingBicycle = BicycleModel.isBicycleExists(id);
  if (!existingBicycle) {
    throw new AppError(httpStatus.NOT_FOUND, 'Bicycle does not exist');
  }

  const result = await BicycleModel.findOne({ _id: id });
  return result;
};

const updateBicycleIntoDB = async (id: string, bicycle: Partial<TBicycle>) => {
  // checking if bicycle exists
  const existingBicycle = BicycleModel.isBicycleExists(id);
  if (!existingBicycle) {
    throw new AppError(httpStatus.NOT_FOUND, 'Bicycle does not exist');
  }

  const result = await BicycleModel.findOneAndUpdate({ _id: id }, bicycle, {
    new: true,
  });
  return result;
};

const deleteBicycleFromDB = async (id: string) => {
  // checking if bicycle exists
  const existingBicycle = BicycleModel.isBicycleExists(id);
  if (!existingBicycle) {
    throw new AppError(httpStatus.NOT_FOUND, 'Bicycle does not exist');
  }
  const result = await BicycleModel.findByIdAndDelete(id);
  return result;
};

export const BicycleService = {
  createBicycleIntoDB,
  getAllBicyclesFromDB,
  getSingleBicycleFromDB,
  updateBicycleIntoDB,
  deleteBicycleFromDB,
};
