import { Schema, model } from 'mongoose';
import { IBicycle, TBicycle } from './bicycle.interface';

const bicycleSchema = new Schema<TBicycle>(
  {
    name: { type: String, required: [true, 'name is required'] },
    brand: { type: String, required: [true, 'brand is required'] },
    price: { type: Number, required: [true, 'price is required'] },
    category: {
      type: String,
      enum: ['Mountain', 'Road', 'Hybrid', 'BMX', 'Electric'],
      required: [true, 'category is required'],
    },
    description: { type: String, required: [true, 'description is required'] },
    quantity: { type: Number, required: [true, 'quantity is required'] },
    inStock: { type: Boolean, required: true, default: true },
    image: { type: String, required: [true, 'image is required'] },
  },
  { timestamps: true },
);

bicycleSchema.statics.isBicycleExists = async function (
  id: string,
): Promise<TBicycle | null> {
  return await BicycleModel.findOne({ _id: id });
};

export const BicycleModel = model<TBicycle, IBicycle>('Bicycle', bicycleSchema);
