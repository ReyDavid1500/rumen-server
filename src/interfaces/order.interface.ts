import { Product } from 'src/products/schemas/product.schema';

export interface OrderProduct {
  product: Product;
  quantity: number;
}
