import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Order } from './schemas/order.schema';
import { Model } from 'mongoose';

@Injectable()
export class OrdersService {
  constructor(@InjectModel(Order.name) private orderModel: Model<Order>) {}

  async create(order: CreateOrderDto): Promise<Order> {
    return this.orderModel.create(order);
  }

  getOrders() {
    return this.orderModel
      .find()
      .populate('userId')
      .populate('products.product')
      .populate('address')
      .exec();
  }

  getOrder(id: string) {
    return this.orderModel
      .findById(id)
      .populate('userId')
      .populate('products.product')
      .populate('address')
      .exec();
  }

  update(id: string, updateOrderDto: UpdateOrderDto) {
    return this.orderModel
      .findByIdAndUpdate(id, { $set: updateOrderDto }, { new: true })
      .exec();
  }

  remove(id: string) {
    return this.orderModel.findByIdAndDelete(id);
  }
}
