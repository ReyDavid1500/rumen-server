import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument, Types } from 'mongoose';
import { User } from 'src/users/schemas/user.schema';
import { ShoppingCart } from 'src/shopping-cart/schemas/shopping-cart.schema';
import { CartProduct } from 'src/interfaces/order.interface';

export type OrderDocument = HydratedDocument<Order>;

@Schema({ timestamps: true })
export class Order extends Document {
  @Prop({ type: Types.ObjectId, required: true, ref: User.name })
  userId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, required: true, ref: ShoppingCart.name })
  shoppingCart: CartProduct;

  @Prop()
  address: string;

  @Prop()
  phone: string;

  @Prop()
  isCompleted: boolean = false;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
