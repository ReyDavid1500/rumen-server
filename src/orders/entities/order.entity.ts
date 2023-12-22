import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Product } from 'src/products/entities/product.entity';

export type OrderDocument = HydratedDocument<Order>;

@Schema()
export class Order {
  @Prop()
  userId: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Product' })
  products: Product[]; // Crar entidad para que se consulte los productos para el pedido y queden guardados!

  @Prop()
  totalPrice: number;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;

  @Prop()
  isCompleted: boolean;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
