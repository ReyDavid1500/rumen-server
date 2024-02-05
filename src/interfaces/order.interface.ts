import { Types } from 'mongoose';

export interface OrderProduct {
  id: Types.ObjectId;
  name: string;
  price: number;
  quantity: number;
}

// export interface OrderAddress {
//   id: Types.ObjectId;
//   street: string;
//   number: number;
//   city: string;
//   province: string;
// }

export interface CartProduct {
  products: OrderProduct[];
  subtotal: number;
  shipping: number;
  total: number;
}
