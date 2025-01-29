/* eslint-disable @typescript-eslint/no-explicit-any */
import { BicycleService } from './bicycle.service';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';

// create bicycle
const createBicycle = catchAsync(async (req, res) => {
  const bicycleData = req.body;
  const result = await BicycleService.createBicycleIntoDB(bicycleData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Bicycle created successfully',
    data: result,
  });
});

// get all bicycles
const getAllBicycles = catchAsync(async (req, res) => {
  const { data, meta } = await BicycleService.getAllBicyclesFromDB(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Bicycles retrieved successfully',
    data,
    meta,
  });
});

// get single bicycle
const getSingleBicycle = catchAsync(async (req, res) => {
  const id = req.params.productId;

  const result = await BicycleService.getSingleBicycleFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Bicycle retrieved successfully',
    data: result,
  });
});

// update bicycle
const updateBicycle = catchAsync(async (req, res) => {
  const id = req.params.productId;
  const bicycle = req.body;

  const result = await BicycleService.updateBicycleIntoDB(id, bicycle);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Bicycle is updated successfully',
    data: result,
  });
});

// delete bicycle
const deleteBicycle = catchAsync(async (req, res) => {
  const id = req.params.productId;

  const result = await BicycleService.deleteBicycleFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Bicycle is deleted successfully',
    data: result,
  });
});

const getBrands = catchAsync(async (req, res) => {
  const result = await BicycleService.getBrandsFromDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Brands retrieved successfully',
    data: result,
  });
});

export const BicycleController = {
  createBicycle,
  getAllBicycles,
  getSingleBicycle,
  updateBicycle,
  deleteBicycle,
  getBrands,
};
