import { Types } from 'mongoose';

export interface OrderProduct {
  product: Types.ObjectId;
  quantity: number;
}
