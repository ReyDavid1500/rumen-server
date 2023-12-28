import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { User } from 'src/users/schemas/user.schema';

export type addressDocument = HydratedDocument<Address>;

@Schema()
export class Address {
  @Prop({ type: mongoose.Schema.ObjectId, ref: 'User' })
  userId: User;

  @Prop({ required: true })
  street: string;

  @Prop({ required: true })
  number: number;

  @Prop({ required: true })
  city: string;

  @Prop({ required: true })
  province: string;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;

  @Prop({ default: false })
  isDeleted: boolean;

  @Prop({ default: false })
  isSelected: boolean;
}

export const AddressSchema = SchemaFactory.createForClass(Address);
