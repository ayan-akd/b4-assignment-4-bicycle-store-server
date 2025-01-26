import { Model } from 'mongoose';

export type TBicycle = {
  name: string;
  brand: string;
  price: number;
  category: 'Mountain' | 'Road' | 'Hybrid' | 'BMX' | 'Electric';
  description: string;
  quantity: number;
  inStock?: boolean;
  image: string;
};

export interface IBicycle extends Model<TBicycle> {
  // eslint-disable-next-line no-unused-vars
  isBicycleExists(id: string): Promise<TBicycle>;
}
