import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument, Types } from 'mongoose';
import { Address } from 'src/address/schemas/address.schema';
import { OrderProduct } from 'src/interfaces/order.interface';
import { User } from 'src/users/schemas/user.schema';

export type OrderDocument = HydratedDocument<Order>;

@Schema({ timestamps: true })
export class Order extends Document {
  @Prop({ type: Types.ObjectId, required: true, ref: 'User' })
  user: User;

  @Prop({
    product: {
      type: Types.ObjectId,
      ref: 'Product',
      required: true,
    },
    quantity: { type: Number, required: true, default: 1 },
  })
  products: OrderProduct[];

  @Prop()
  totalPrice: number;

  @Prop({ type: Types.ObjectId, ref: 'Address' })
  address: Address;

  @Prop()
  phone: string;

  @Prop()
  isCompleted: boolean = false;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
