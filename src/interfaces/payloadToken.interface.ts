import { Types } from 'mongoose';

export interface PayloadToken {
  username: string;
  sub: Types.ObjectId;
}
