import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument, Types } from 'mongoose';
import { Address } from 'src/address/schemas/address.schema';
import { OrderProduct } from 'src/interfaces/order.interface';
import { Product } from 'src/products/schemas/product.schema';
import { User } from 'src/users/schemas/user.schema';

export type OrderDocument = HydratedDocument<Order>;

@Schema({ timestamps: true })
export class Order extends Document {
  @Prop({ type: Types.ObjectId, required: true, ref: User.name })
  userId: Types.ObjectId;

  @Prop({
    type: [
      {
        product: {
          type: Types.ObjectId,
          ref: Product.name,
          required: true,
        },
        quantity: { type: Number, required: true, default: 1 },
      },
    ],
  })
  products: Types.Array<OrderProduct>;

  @Prop()
  totalPrice: number;

  @Prop({ type: Types.ObjectId, ref: Address.name, required: true })
  address: Types.ObjectId;

  @Prop()
  phone: string;

  @Prop()
  isCompleted: boolean = false;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
