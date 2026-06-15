import { Controller, Get, Put, Post, Param, Query, Body, Req, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { MerchantsService } from './merchants.service';

@ApiTags('商家')
@Controller('merchant')
export class MerchantsController {
  constructor(private merchantsService: MerchantsService) {}

  @Get('dashboard')
  @ApiOperation({ summary: '商家工作台' })
  getDashboard(@Req() req: any) {
    return this.merchantsService.getDashboard(req.user.merchantId);
  }

  @Get('orders')
  @ApiOperation({ summary: '订单列表' })
  getOrders(@Req() req: any, @Query('status') status?: string, @Query('page') page?: number) {
    return this.merchantsService.getOrders(req.user.merchantId, status, page || 1);
  }

  @Get('orders/:id')
  @ApiOperation({ summary: '订单详情' })
  getOrderDetail(@Req() req: any, @Param('id') id: string) {
    return this.merchantsService.getOrderDetail(req.user.merchantId, +id);
  }

  @Post('orders/:id/confirm')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: '接单' })
  confirmOrder(@Req() req: any, @Param('id') id: string) {
    return this.merchantsService.confirmOrder(req.user.merchantId, +id);
  }

  @Post('orders/:id/reject')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: '拒单' })
  rejectOrder(@Req() req: any, @Param('id') id: string, @Body('reason') reason: string) {
    return this.merchantsService.rejectOrder(req.user.merchantId, +id, reason);
  }

  @Post('orders/:id/complete')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: '完成服务' })
  completeOrder(@Req() req: any, @Param('id') id: string) {
    return this.merchantsService.completeOrder(req.user.merchantId, +id);
  }

  @Get('shop')
  @ApiOperation({ summary: '店铺信息' })
  getShopInfo(@Req() req: any) {
    return this.merchantsService.getShopInfo(req.user.merchantId);
  }

  @Put('shop')
  @ApiOperation({ summary: '更新店铺信息' })
  updateShop(@Req() req: any, @Body() body: any) {
    return this.merchantsService.updateShop(req.user.merchantId, body);
  }

  @Post('qualification')
  @ApiOperation({ summary: '提交资质认证' })
  applyQualification(@Req() req: any, @Body() body: any) {
    return this.merchantsService.applyQualification(req.user.merchantId, body);
  }

  @Get('finance')
  @ApiOperation({ summary: '财务总览' })
  getFinance(@Req() req: any) {
    return this.merchantsService.getFinance(req.user.merchantId);
  }

  @Post('withdraw')
  @ApiOperation({ summary: '申请提现' })
  applyWithdraw(@Req() req: any, @Body() body: any) {
    return this.merchantsService.applyWithdraw(req.user.merchantId, body);
  }

  @Get('reviews')
  @ApiOperation({ summary: '评价列表' })
  getReviews(@Req() req: any, @Query('page') page?: number) {
    return this.merchantsService.getReviews(req.user.merchantId, page || 1);
  }

  @Post('reviews/:id/reply')
  @ApiOperation({ summary: '回复评价' })
  replyReview(@Req() req: any, @Param('id') id: string, @Body('content') content: string) {
    return this.merchantsService.replyReview(req.user.merchantId, +id, content);
  }

  // Public endpoints
  @Get('public/:id')
  @ApiOperation({ summary: '公开店铺信息' })
  getPublicShop(@Param('id') id: string) {
    return this.merchantsService.getPublicShop(+id);
  }
}