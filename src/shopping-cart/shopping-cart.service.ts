import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateShoppingCartDto } from './dto/create-shopping-cart.dto';
import { UpdateShoppingCartDto } from './dto/update-shopping-cart.dto';
import { InjectModel } from '@nestjs/mongoose';
import { ShoppingCart } from './schemas/shopping-cart.schema';
import { Model } from 'mongoose';
import { ProductsService } from 'src/products/products.service';
import { OrderProduct } from 'src/interfaces/order.interface';

@Injectable()
export class ShoppingCartService {
  constructor(
    @InjectModel(ShoppingCart.name)
    private ShoppingCartModel: Model<ShoppingCart>,
    private productsService: ProductsService,
  ) {}

  async createNewShoppingCart(
    products: CreateShoppingCartDto[],
  ): Promise<ShoppingCart> {
    const addedProducts: OrderProduct[] = await Promise.all(
      products.map(async (item) => {
        const { productId, quantity } = item;
        const product = await this.productsService.getProductToOrder(productId);
        return {
          id: productId,
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

    const cart = await this.ShoppingCartModel.create({
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
    const cart = await this.ShoppingCartModel.findById(cartId);
    console.log('cart: ', cart);

    if (!cart) {
      throw new NotFoundException('Shopping cart not found');
    } else {
      for (const item of productsDto) {
        const { productId, quantity } = item;
        console.log('payload quantity: ', quantity);
        const productsInCart = cart.products.map((product) => product);
        console.log('Products in cart: ', productsInCart);

        const existingProduct = cart.products.find(
          (product) => product.id === productId,
        );

        if (existingProduct) {
          existingProduct.quantity = quantity;
        } else {
          const product =
            await this.productsService.getProductToOrder(productId);

          const newProduct: OrderProduct = {
            id: productId,
            name: product.name,
            price: product.price,
            quantity,
          };
          cart.products = [...productsInCart, newProduct];
        }
      }
    }

    const totalPrice = cart.products.reduce(
      (acc, curr) => acc + curr.price * curr.quantity,
      0,
    );

    cart.subtotal = totalPrice;
    cart.total = cart.subtotal + cart.shipping;

    cart.save();

    return cart;
  }

  getShoppingCart(cartId: string) {
    const cart = this.ShoppingCartModel.findById(cartId);

    return cart;
  }
}
