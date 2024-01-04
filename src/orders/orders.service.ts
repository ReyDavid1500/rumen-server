import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { AddProductsToOrderDto, UpdateOrderDto } from './dto/update-order.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Order } from './schemas/order.schema';
import { Model } from 'mongoose';
import { ProductsService } from 'src/products/products.service';
import { AddressService } from 'src/address/address.service';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(Order.name) private orderModel: Model<Order>,
    private productsService: ProductsService,
    private addressService: AddressService,
  ) {}

  async createOrder(order: CreateOrderDto): Promise<Order> {
    const { products, userId } = order;
    const productsId = products.map((product) => {
      return {
        id: product.product,
        quantity: product.quantity,
      };
    });

    const selectedProducts = await Promise.all(
      productsId.map(async (productId) => {
        return {
          product: await this.productsService.getProductToOrder(productId.id),
          id: productId.id,
          quantity: productId.quantity,
        };
      }),
    );

    const orderProducts = selectedProducts.map((selectProduct) => {
      return {
        id: selectProduct.id,
        name: selectProduct.product.name,
        price: selectProduct.product.price,
        quantity: selectProduct.quantity,
      };
    });

    const totalPrice = orderProducts.reduce((acc, product) => {
      return acc + product.price * product.quantity;
    }, 0);

    console.log(totalPrice);

    const selectedAddress = await this.addressService.getUserAddresses(userId);

    const newOrder = {
      ...order,
      userId,
      products: orderProducts,
      address: selectedAddress,
      totalPrice: totalPrice,
    };

    console.log(newOrder);
    return await this.orderModel.create(newOrder);
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

  async addProducts(id: string, products: AddProductsToOrderDto[]) {
    console.log(products);
    const order = await this.orderModel.findById(id);
    return order.save();
  }
}
