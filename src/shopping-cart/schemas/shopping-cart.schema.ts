import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { OrderProduct } from 'src/interfaces/order.interface';
import { User } from 'src/users/schemas/user.schema';

@Schema({ timestamps: true })
export class ShoppingCart extends Document {
  // @Prop({ type: Types.ObjectId, required: true, ref: User.name })
  // userId: Types.ObjectId;

  @Prop({ type: Types.ObjectId })
  products: OrderProduct[];

  @Prop()
  subtotal: number;

  @Prop({ default: 3000 })
  shipping: number;

  @Prop()
  total: number;
}

export const ShoppingCartSchema = SchemaFactory.createForClass(ShoppingCart);
