import { Types } from 'mongoose';

export interface OrderProduct {
  product: Types.ObjectId;
  name: string;
  price: number;
  quantity: number;
}
