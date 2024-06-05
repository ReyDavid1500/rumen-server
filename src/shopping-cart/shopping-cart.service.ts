import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateShoppingCartDto } from './dto/create-shopping-cart.dto';
import { InjectModel } from '@nestjs/mongoose';
import { ShoppingCart } from './schemas/shopping-cart.schema';
import { Model, Types } from 'mongoose';
import { ProductsService } from 'src/products/products.service';
import { OrderProduct } from 'src/interfaces/order.interface';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class ShoppingCartService {
  constructor(
    @InjectModel(ShoppingCart.name)
    private shoppingCartModel: Model<ShoppingCart>,
    private productsService: ProductsService,
    private usersService: UsersService,
  ) {}

  async createNewShoppingCart(
    userId: string,
    productsDto: CreateShoppingCartDto[],
  ): Promise<ShoppingCart> {
    const user = await this.usersService.getUser(userId);
    const { _id } = user;
    const addedProducts: OrderProduct[] = await Promise.all(
      productsDto.map(async (item) => {
        const { id, quantity } = item;
        const product = await this.productsService.getProductToOrder(id);
        return {
          id,
          name: product.name,
          price: product.price,
          quantity,
        };
      }),
    );

    const totalPrice = addedProducts.reduce(
      (acc, curr) => acc + curr.price * curr.quantity,
      0,
    );

    const shipping = 3000;

    const total = totalPrice + shipping;

    const cart = await this.shoppingCartModel.create({
      userId: _id,
      products: addedProducts,
      subtotal: totalPrice,
      shipping: shipping,
      total,
    });
    return cart;
  }

  async addProductsToCart(
    cartId: string,
    productsDto: CreateShoppingCartDto[],
  ): Promise<ShoppingCart> {
    const cart = await this.shoppingCartModel.findById(cartId);

    if (!cart) {
      throw new NotFoundException('Shopping cart not found');
    }
    const productsIds = productsDto.map((product) => product.id);
    const products = await this.productsService.getProductsToOrder(productsIds);
    const addedProducts = products.map((product) => {
      const quantity = productsDto.find(
        (item) => item.id === product._id,
      ).quantity;
      return {
        id: product._id,
        name: product.name,
        price: product.price,
        quantity,
      };
    });

    cart.products = addedProducts;
    const totalPrice = addedProducts.reduce(
      (acc, curr) => acc + curr.price * curr.quantity,
      0,
    );
    cart.subtotal = totalPrice;
    cart.total = cart.subtotal + cart.shipping;

    cart.save();

    return cart;
  }

  async getShoppingCart(cartId: string) {
    const cart = await this.shoppingCartModel.findById(cartId);

    return cart;
  }

  async getShoppingCartByUserId(userId: string) {
    const cart = await this.shoppingCartModel
      .findOne({
        userId: new Types.ObjectId(userId),
        isActive: true,
      })
      .exec();
    if (!cart) {
      throw new NotFoundException('Cart not found');
    }
    return cart;
  }

  async deleteProductFromCart(cartId: string, productId: string) {
    const cart = await this.shoppingCartModel.findById(cartId);

    if (!cart) {
      throw new NotFoundException('Shopping cart not found');
    }
    const updatedProducts = cart.products.filter(
      (product) => product.id.toString() !== productId,
    );
    cart.products = updatedProducts;

    const totalPrice = cart.products.reduce(
      (acc, curr) => acc + curr.price * curr.quantity,
      0,
    );

    cart.subtotal = totalPrice;
    cart.total = cart.subtotal + cart.shipping;

    cart.save();

    return cart;
  }
}
