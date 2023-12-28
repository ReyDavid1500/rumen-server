import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Address } from 'src/address/schemas/address.schema';
import { Product } from 'src/products/schemas/product.schema';

export type OrderDocument = HydratedDocument<Order>;

@Schema({ timestamps: true })
export class Order {
  @Prop({ type: Types.ObjectId, ref: 'User' })
  user: Types.ObjectId;

  @Prop({
    product: {
      type: Types.ObjectId,
      ref: 'Product',
      required: true,
    },
    quantity: { type: Number, required: true, default: 1 },
  })
  products: Types.Array<Product>;

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
