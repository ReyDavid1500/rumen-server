import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
  UseGuards,
  Req,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { MongoIdPipe } from 'src/common/mongo-id/mongo-id.pipe';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/models/roles.models';

@UseGuards(AuthGuard('jwt'))
@ApiTags('Orders')
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Roles(Role.CUSTOMER)
  @Post()
  create(@Body() createOrderDto: CreateOrderDto, @Req() request: any) {
    return this.ordersService.createOrder(createOrderDto, request.user.sub);
  }

  @Get()
  findAll() {
    return this.ordersService.getOrders();
  }

  @Get(':id')
  findOne(@Param('id', MongoIdPipe) id: string) {
    return this.ordersService.getOrder(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() payload: UpdateOrderDto) {
    return this.ordersService.update(id, payload);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ordersService.remove(id);
  }

  @Delete(':id/product/:productId')
  removeProduct(
    @Param('id', MongoIdPipe) id: string,
    @Param('productId', MongoIdPipe) productId: string,
  ) {
    return this.ordersService.removeProduct(id, productId);
  }
}
