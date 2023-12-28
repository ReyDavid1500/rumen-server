import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Address } from 'src/address/schemas/address.schema';
import { Product } from 'src/products/schemas/product.schema';
import { User } from 'src/users/schemas/user.schema';

export type OrderDocument = HydratedDocument<Order>;

@Schema()
export class Order {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;

  @Prop({
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
    quantity: { type: Number, required: true, default: 0 },
  })
  products: Product[];

  @Prop()
  totalPrice: number;

  @Prop({ type: mongoose.Schema.Types.String, ref: 'Address' })
  address: Address;

  @Prop()
  phone: string;

  @Prop()
  createdAt: Date = new Date();

  @Prop()
  updatedAt: Date = new Date();

  @Prop()
  isCompleted: boolean = false;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
