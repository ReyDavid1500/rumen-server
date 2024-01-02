import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument, Types } from 'mongoose';

export type addressDocument = HydratedDocument<Address>;

@Schema({ timestamps: true })
export class Address extends Document {
  @Prop({ type: Types.ObjectId, ref: 'User' })
  userId: Types.ObjectId;

  @Prop({ required: true })
  street: string;

  @Prop({ required: true })
  number: number;

  @Prop({ required: true })
  city: string;

  @Prop({ required: true })
  province: string;

  @Prop({ default: false })
  isDeleted: boolean;

  @Prop({ default: false })
  isChosen: boolean;
}

export const AddressSchema = SchemaFactory.createForClass(Address);
