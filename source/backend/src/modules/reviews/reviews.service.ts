import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../common/prisma.service';

@Injectable()
export class ReviewsService {
  constructor(private prisma: PrismaService) {}

  async create(userId: number, data: {
    orderId: number; overallRating: number; carRating?: number;
    punctualityRating?: number; serviceRating?: number;
    content?: string; images?: string;
  }) {
    const order = await this.prisma.order.findFirst({ where: { id: data.orderId, userId } });
    if (!order) throw new NotFoundException('订单不存在');
    if (order.status !== 'completed') throw new BadRequestException('订单未完成，不能评价');

    const existing = await this.prisma.review.findUnique({ where: { orderId: data.orderId } });
    if (existing) throw new BadRequestException('该订单已评价');

    const review = await this.prisma.review.create({
      data: {
        orderId: data.orderId, userId, merchantId: order.merchantId, carId: order.carId,
        overallRating: data.overallRating, carRating: data.carRating,
        punctualityRating: data.punctualityRating, serviceRating: data.serviceRating,
        content: data.content, images: data.images,
      },
    });

    // Update car rating
    const avgRating = await this.prisma.review.aggregate({
      where: { carId: order.carId },
      _avg: { overallRating: true },
    });
    await this.prisma.car.update({
      where: { id: order.carId },
      data: { rating: avgRating._avg.overallRating || 5 },
    });
    return review;
  }

  async getCarReviews(carId: number, page = 1, pageSize = 10) {
    const where = { carId };
    const [items, total] = await Promise.all([
      this.prisma.review.findMany({
        where,
        include: { user: { select: { nickname: true, avatar: true } } },
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * pageSize,
        take: pageSize,
      }),
      this.prisma.review.count({ where }),
    ]);
    return { items, total, page, pageSize };
  }
}