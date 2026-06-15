import { Controller, Get, Put, Post, Delete, Param, Query, Body, Req } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { CarsService } from './cars.service';
import { Public } from '../../common/public.decorator';

@ApiTags('车辆')
@Controller()
export class CarsController {
  constructor(private carsService: CarsService) {}

  @Public()
  @Get('cars')
  @ApiOperation({ summary: '车辆列表（公开）' })
  getList(@Query() query: any) {
    return this.carsService.getList(query);
  }

  @Public()
  @Get('cars/hot')
  @ApiOperation({ summary: '热门车辆（公开）' })
  getHotCars() {
    return this.carsService.getHotCars();
  }

  @Public()
  @Get('banners')
  @ApiOperation({ summary: 'Banner列表（公开）' })
  getBanners() {
    return this.carsService.getBanners();
  }

  @Public()
  @Get('car/:id')
  @ApiOperation({ summary: '车辆详情（公开）' })
  getDetail(@Param('id') id: string) {
    return this.carsService.getDetail(+id);
  }

  @Public()
  @Get('car/:id/schedule')
  @ApiOperation({ summary: '车辆档期（公开）' })
  getSchedule(@Param('id') id: string, @Query('year') year: string, @Query('month') month: string) {
    return this.carsService.getSchedule(+id, +year, +month);
  }

  // Merchant endpoints
  @Get('merchant/cars')
  @ApiOperation({ summary: '商家车辆列表' })
  getMerchantCars(@Req() req: any, @Query('page') page?: number) {
    return this.carsService.getMerchantCars(req.user.merchantId, page || 1);
  }

  @Post('merchant/cars')
  @ApiOperation({ summary: '添加车辆' })
  create(@Req() req: any, @Body() body: any) {
    return this.carsService.create(req.user.merchantId, body);
  }

  @Put('merchant/cars/:id')
  @ApiOperation({ summary: '编辑车辆' })
  update(@Req() req: any, @Param('id') id: string, @Body() body: any) {
    return this.carsService.update(req.user.merchantId, +id, body);
  }

  @Post('merchant/cars/:id/toggle')
  @ApiOperation({ summary: '上架/下架车辆' })
  toggleStatus(@Req() req: any, @Param('id') id: string) {
    return this.carsService.toggleStatus(req.user.merchantId, +id);
  }

  @Delete('merchant/cars/:id')
  @ApiOperation({ summary: '删除车辆' })
  delete(@Req() req: any, @Param('id') id: string) {
    return this.carsService.delete(req.user.merchantId, +id);
  }

  @Put('merchant/cars/:id/schedule')
  @ApiOperation({ summary: '更新档期' })
  updateSchedule(@Req() req: any, @Param('id') id: string, @Body() body: { date: string; status: number }) {
    return this.carsService.updateSchedule(+id, req.user.merchantId, body.date, body.status);
  }

  @Get('merchant/fleet-packages')
  @ApiOperation({ summary: '车队套餐列表' })
  getFleetPackages(@Req() req: any) {
    return this.carsService.getFleetPackages(req.user.merchantId);
  }

  @Post('merchant/fleet-packages')
  @ApiOperation({ summary: '创建车队套餐' })
  createFleetPackage(@Req() req: any, @Body() body: any) {
    return this.carsService.createFleetPackage(req.user.merchantId, body);
  }

  @Put('merchant/fleet-packages/:id')
  @ApiOperation({ summary: '编辑车队套餐' })
  updateFleetPackage(@Req() req: any, @Param('id') id: string, @Body() body: any) {
    return this.carsService.updateFleetPackage(req.user.merchantId, +id, body);
  }

  @Delete('merchant/fleet-packages/:id')
  @ApiOperation({ summary: '删除车队套餐' })
  deleteFleetPackage(@Req() req: any, @Param('id') id: string) {
    return this.carsService.deleteFleetPackage(req.user.merchantId, +id);
  }
}