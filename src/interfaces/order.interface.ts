import { Types } from 'mongoose';

export interface OrderProduct {
  id: Types.ObjectId;
  name: string;
  price: number;
  quantity: number;
}

export interface CartProduct {
  products: OrderProduct[];
  subtotal: number;
  shipping: number;
  total: number;
}
