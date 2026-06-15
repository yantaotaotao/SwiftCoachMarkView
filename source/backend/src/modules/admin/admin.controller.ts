import { Controller, Get, Post, Put, Delete, Param, Query, Body } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { AdminService } from './admin.service';

@ApiTags('管理后台')
@Controller('admin')
export class AdminController {
  constructor(private adminService: AdminService) {}

  @Get('dashboard')
  @ApiOperation({ summary: '运营看板' })
  getDashboard() {
    return this.adminService.getDashboard();
  }

  @Get('users')
  @ApiOperation({ summary: '用户列表' })
  getUsers(@Query('page') page?: number, @Query('keyword') keyword?: string) {
    return this.adminService.getUsers(page || 1, 20, keyword);
  }

  @Post('users/:id/toggle')
  @ApiOperation({ summary: '封禁/解禁用户' })
  toggleUserStatus(@Param('id') id: string) {
    return this.adminService.toggleUserStatus(+id);
  }

  @Get('merchants')
  @ApiOperation({ summary: '商家列表' })
  getMerchants(@Query('page') page?: number, @Query('authStatus') authStatus?: string) {
    return this.adminService.getMerchants(page || 1, 20, authStatus ? +authStatus : undefined);
  }

  @Post('merchants/:id/audit')
  @ApiOperation({ summary: '审核商家' })
  auditMerchant(@Param('id') id: string, @Body() body: { action: 'approve' | 'reject'; reason?: string }) {
    return this.adminService.auditMerchant(+id, body.action, body.reason);
  }

  @Post('merchants/:id/toggle')
  @ApiOperation({ summary: '冻结/解冻商家' })
  toggleMerchantStatus(@Param('id') id: string) {
    return this.adminService.toggleMerchantStatus(+id);
  }

  @Put('merchants/:id/commission')
  @ApiOperation({ summary: '设置佣金比例' })
  setMerchantCommission(@Param('id') id: string, @Body('rate') rate: number) {
    return this.adminService.setMerchantCommission(+id, rate);
  }

  @Get('cars')
  @ApiOperation({ summary: '车辆列表' })
  getCars(@Query('page') page?: number, @Query('status') status?: string) {
    return this.adminService.getCars(page || 1, 20, status ? +status : undefined);
  }

  @Post('cars/:id/audit')
  @ApiOperation({ summary: '审核车辆' })
  auditCar(@Param('id') id: string, @Body('action') action: 'approve' | 'reject') {
    return this.adminService.auditCar(+id, action);
  }

  @Get('orders')
  @ApiOperation({ summary: '订单列表' })
  getOrders(@Query('page') page?: number, @Query('status') status?: string, @Query('keyword') keyword?: string) {
    return this.adminService.getOrders(page || 1, 20, status, keyword);
  }

  @Get('finance')
  @ApiOperation({ summary: '财务概览' })
  getFinance() {
    return this.adminService.getFinance();
  }

  @Post('withdrawals/:id/audit')
  @ApiOperation({ summary: '审核提现' })
  auditWithdrawal(@Param('id') id: string, @Body() body: { action: 'approve' | 'reject'; remark?: string }) {
    return this.adminService.auditWithdrawal(+id, body.action, body.remark);
  }

  @Get('banners')
  @ApiOperation({ summary: 'Banner列表' })
  getBanners() {
    return this.adminService.getBanners();
  }

  @Post('banners')
  @ApiOperation({ summary: '创建Banner' })
  createBanner(@Body() body: any) {
    return this.adminService.createBanner(body);
  }

  @Put('banners/:id')
  @ApiOperation({ summary: '编辑Banner' })
  updateBanner(@Param('id') id: string, @Body() body: any) {
    return this.adminService.updateBanner(+id, body);
  }

  @Delete('banners/:id')
  @ApiOperation({ summary: '删除Banner' })
  deleteBanner(@Param('id') id: string) {
    return this.adminService.deleteBanner(+id);
  }

  @Get('admins')
  @ApiOperation({ summary: '管理员列表' })
  getAdmins() {
    return this.adminService.getAdmins();
  }

  @Post('admins')
  @ApiOperation({ summary: '创建管理员' })
  createAdmin(@Body() body: any) {
    return this.adminService.createAdmin(body);
  }

  @Get('coupons')
  @ApiOperation({ summary: '优惠券列表' })
  getCoupons() {
    return this.adminService.getCoupons();
  }

  @Post('coupons')
  @ApiOperation({ summary: '创建优惠券' })
  createCoupon(@Body() body: any) {
    return this.adminService.createCoupon(body);
  }

  @Put('coupons/:id')
  @ApiOperation({ summary: '编辑优惠券' })
  updateCoupon(@Param('id') id: string, @Body() body: any) {
    return this.adminService.updateCoupon(+id, body);
  }
}