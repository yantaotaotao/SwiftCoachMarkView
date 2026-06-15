import { Controller, Post, Get, Param, Body, Req, HttpCode, HttpStatus, Query } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { OrdersService } from './orders.service';

@ApiTags('订单')
@Controller('orders')
export class OrdersController {
  constructor(private ordersService: OrdersService) {}

  @Post()
  @ApiOperation({ summary: '创建订单' })
  create(@Req() req: any, @Body() body: any) {
    return this.ordersService.create(req.user.id, body);
  }

  @Post(':id/cancel')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: '取消订单' })
  cancel(@Req() req: any, @Param('id') id: string, @Body('reason') reason?: string) {
    return this.ordersService.cancel(req.user.id, +id, reason);
  }

  @Post(':orderNo/pay')
  @ApiOperation({ summary: '支付订单' })
  pay(@Req() req: any, @Param('orderNo') orderNo: string, @Body('method') method: string) {
    return this.ordersService.pay(orderNo, req.user.id, method || 'alipay');
  }
}