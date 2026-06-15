import { Controller, Post, Get, Param, Body, Req, Query } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { ReviewsService } from './reviews.service';
import { Public } from '../../common/public.decorator';

@ApiTags('评价')
@Controller()
export class ReviewsController {
  constructor(private reviewsService: ReviewsService) {}

  @Post('reviews')
  @ApiOperation({ summary: '提交评价' })
  create(@Req() req: any, @Body() body: any) {
    return this.reviewsService.create(req.user.id, body);
  }

  @Public()
  @Get('car/:carId/reviews')
  @ApiOperation({ summary: '车辆评价列表（公开）' })
  getCarReviews(@Param('carId') carId: string, @Query('page') page?: number) {
    return this.reviewsService.getCarReviews(+carId, page || 1);
  }
}