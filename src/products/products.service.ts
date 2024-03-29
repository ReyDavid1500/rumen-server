import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Model, Types } from 'mongoose';
import { Product } from './schemas/product.schema';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
  ) {}

  async createProduct(createProductDto: CreateProductDto): Promise<Product> {
    const newProduct = new this.productModel(createProductDto);
    return await newProduct.save();
  }

  async getProducts(): Promise<Product[]> {
    const products = await this.productModel.find().exec();
    return products;
  }

  async getProduct(id: string): Promise<Product> {
    const product = await this.productModel.findById(id).exec();
    if (!product) {
      throw new NotFoundException(`Product #${id} does not exist`);
    }
    return product;
  }

  async getProductsByCategory(category: string): Promise<Product[]> {
    const products = await this.productModel.find({ category }).exec();
    if (!products) {
      throw new NotFoundException(`The category ${category} does not exist`);
    }
    return products;
  }

  async getProductToOrder(
    id: Types.ObjectId,
  ): Promise<{ name: string; price: number }> {
    const selectedProduct = await this.productModel.findById(id, {
      name: 1,
      price: 1,
    });
    return selectedProduct;
  }

  async getProductsToOrder(ids: Types.ObjectId[]): Promise<Product[]> {
    const selectedProduct = await this.productModel
      .find()
      .where('_id')
      .in(ids)
      .exec();
    return selectedProduct;
  }

  async updateProduct(
    id: string,
    updateProduct: UpdateProductDto,
  ): Promise<Product> {
    const updatedProduct = await this.productModel.findByIdAndUpdate(
      id,
      updateProduct,
      { new: true },
    );
    return updatedProduct;
  }

  async removeProduct(id: string): Promise<boolean> {
    const product = await this.productModel.findByIdAndDelete(id);
    if (!product) {
      throw new NotFoundException(`Product #${id} not found`);
    }
    return true;
  }
}
