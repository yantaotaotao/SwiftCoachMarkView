import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../common/prisma.service';

@Injectable()
export class CouponsService {
  constructor(private prisma: PrismaService) {}

  async getAvailable(userId: number) {
    const now = new Date();
    return this.prisma.coupon.findMany({
      where: {
        isActive: 1,
        startDate: { lte: now },
        endDate: { gte: now },
        totalCount: { gt: 0 },
        usedCount: { lt: this.prisma.coupon.fields.totalCount },
      },
    });
  }

  async claim(userId: number, couponId: number) {
    const coupon = await this.prisma.coupon.findUnique({ where: { id: couponId } });
    if (!coupon) throw new Error('优惠券不存在');
    if (coupon.usedCount >= coupon.totalCount) throw new Error('优惠券已领完');

    const existing = await this.prisma.userCoupon.findFirst({ where: { userId, couponId } });
    if (existing) throw new Error('已领取过该优惠券');

    await this.prisma.coupon.update({
      where: { id: couponId },
      data: { usedCount: { increment: 1 } },
    });
    return this.prisma.userCoupon.create({ data: { userId, couponId } });
  }
}