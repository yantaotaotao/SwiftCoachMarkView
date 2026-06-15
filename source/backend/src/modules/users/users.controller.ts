import { Controller, Get, Put, Param, Query, Body, Req } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { UsersService } from './users.service';

@ApiTags('用户')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('profile')
  @ApiOperation({ summary: '获取个人信息' })
  getProfile(@Req() req: any) {
    return this.usersService.getProfile(req.user.id);
  }

  @Put('profile')
  @ApiOperation({ summary: '更新个人信息' })
  updateProfile(@Req() req: any, @Body() body: { nickname?: string; avatar?: string }) {
    return this.usersService.updateProfile(req.user.id, body);
  }

  @Get('orders')
  @ApiOperation({ summary: '我的订单列表' })
  @ApiQuery({ name: 'status', required: false })
  @ApiQuery({ name: 'page', required: false })
  getOrders(@Req() req: any, @Query('status') status?: string, @Query('page') page?: number) {
    return this.usersService.getOrders(req.user.id, status, page || 1);
  }

  @Get('orders/:id')
  @ApiOperation({ summary: '订单详情' })
  getOrderDetail(@Req() req: any, @Param('id') id: string) {
    return this.usersService.getOrderDetail(req.user.id, +id);
  }

  @Get('favorites')
  @ApiOperation({ summary: '我的收藏' })
  getFavorites(@Req() req: any, @Query('page') page?: number) {
    return this.usersService.getFavorites(req.user.id, page || 1);
  }

  @Put('favorites/:carId')
  @ApiOperation({ summary: '切换收藏' })
  toggleFavorite(@Req() req: any, @Param('carId') carId: string) {
    return this.usersService.toggleFavorite(req.user.id, +carId);
  }

  @Get('coupons')
  @ApiOperation({ summary: '我的优惠券' })
  getCoupons(@Req() req: any) {
    return this.usersService.getCoupons(req.user.id);
  }
}