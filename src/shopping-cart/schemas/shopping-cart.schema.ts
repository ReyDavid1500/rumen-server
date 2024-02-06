import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { OrderProduct } from 'src/interfaces/order.interface';

@Schema({ timestamps: true })
export class ShoppingCart extends Document {
  @Prop({ type: Types.ObjectId })
  products: OrderProduct[];

  @Prop()
  subtotal: number;

  @Prop()
  shipping: number;

  @Prop()
  total: number;
}

export const ShoppingCartSchema = SchemaFactory.createForClass(ShoppingCart);
