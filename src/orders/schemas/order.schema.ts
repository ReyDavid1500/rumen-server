import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument, Types } from 'mongoose';
import { OrderAddress, OrderProduct } from '../../interfaces/order.interface';
import { User } from 'src/users/schemas/user.schema';

export type OrderDocument = HydratedDocument<Order>;

@Schema({ timestamps: true })
export class Order extends Document {
  @Prop({ type: Types.ObjectId, required: true, ref: User.name })
  userId: Types.ObjectId;

  @Prop({ type: Object, required: true })
  products: OrderProduct[];

  @Prop()
  totalPrice: number;

  @Prop({ type: Object, required: true })
  address: OrderAddress;

  @Prop()
  phone: string;

  @Prop()
  isCompleted: boolean = false;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
