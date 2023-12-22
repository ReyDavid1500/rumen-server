import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type addressDocument = HydratedDocument<Address>;

@Schema()
export class Address {
  @Prop({ required: true })
  street: string;

  @Prop({ required: true })
  number: number;

  @Prop({ required: true })
  city: string;

  @Prop({ required: true })
  province: string;
}

export const AddressSchema = SchemaFactory.createForClass(Address);
