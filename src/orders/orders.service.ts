import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Order } from './schemas/order.schema';
import { Model } from 'mongoose';
import { ShoppingCartService } from 'src/shopping-cart/shopping-cart.service';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(Order.name) private orderModel: Model<Order>,
    private shoppingCartService: ShoppingCartService,
  ) {}

  async createOrder(order: CreateOrderDto, userId: string): Promise<Order> {
    const { shoppingCartId } = order;

    const shoppingCart =
      await this.shoppingCartService.getShoppingCart(shoppingCartId);

    shoppingCart.isActive = false;

    await shoppingCart.save();

    const newOrder = await this.orderModel.create({
      userId,
      shoppingCart,
      ...order,
    });

    return newOrder;
  }

  getOrders() {
    return this.orderModel.find().exec();
  }

  getOrder(id: string) {
    return this.orderModel.findById(id).exec();
  }

  update(id: string, updateOrderDto: UpdateOrderDto) {
    return this.orderModel
      .findByIdAndUpdate(id, { $set: updateOrderDto }, { new: true })
      .exec();
  }

  remove(id: string) {
    return this.orderModel.findByIdAndDelete(id);
  }

  async removeProduct(id: string, productId: string) {
    const order = await this.orderModel.findById(id);
    return order.save();
  }
}
