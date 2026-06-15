import { Injectable, BadRequestException, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../../common/prisma.service';

@Injectable()
export class MerchantsService {
  constructor(private prisma: PrismaService) {}

  async getDashboard(merchantId: number) {
    const todayStart = new Date(); todayStart.setHours(0,0,0,0);
    const todayEnd = new Date(); todayEnd.setHours(23,59,59,999);
    const monthStart = new Date(); monthStart.setDate(1); monthStart.setHours(0,0,0,0);

    const [pendingConfirm, inProgress, monthRevenue, carCount, recentOrders] = await Promise.all([
      this.prisma.order.count({ where: { merchantId, status: 'pending_confirm' } }),
      this.prisma.order.count({ where: { merchantId, status: 'in_progress' } }),
      this.prisma.order.aggregate({
        where: { merchantId, status: 'completed', updatedAt: { gte: monthStart } },
        _sum: { payAmount: true },
      }),
      this.prisma.car.count({ where: { merchantId, status: { not: 1 } } }),
      this.prisma.order.findMany({
        where: { merchantId },
        include: { car: { select: { brand: true, model: true } } },
        orderBy: { createdAt: 'desc' },
        take: 5,
      }),
    ]);
    return { pendingConfirm, inProgress, monthRevenue: monthRevenue._sum.payAmount || 0, carCount, recentOrders };
  }

  async getOrders(merchantId: number, status?: string, page = 1, pageSize = 10) {
    const where: any = { merchantId };
    if (status && status !== 'all') where.status = status;
    const [items, total] = await Promise.all([
      this.prisma.order.findMany({
        where,
        include: {
          car: { select: { brand: true, model: true, images: true } },
          user: { select: { nickname: true, phone: true } },
        },
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * pageSize,
        take: pageSize,
      }),
      this.prisma.order.count({ where }),
    ]);
    return { items, total, page, pageSize, totalPages: Math.ceil(total / pageSize) };
  }

  async getOrderDetail(merchantId: number, orderId: number) {
    const order = await this.prisma.order.findFirst({
      where: { id: orderId, merchantId },
      include: {
        car: true, user: { select: { nickname: true, phone: true } },
        tracking: { orderBy: { createdAt: 'desc' } }, payments: true,
      },
    });
    if (!order) throw new NotFoundException('订单不存在');
    return order;
  }

  async confirmOrder(merchantId: number, orderId: number) {
    const order = await this.prisma.order.findFirst({ where: { id: orderId, merchantId } });
    if (!order) throw new NotFoundException('订单不存在');
    if (order.status !== 'pending_confirm') throw new BadRequestException('订单状态错误');
    return this.prisma.order.update({
      where: { id: orderId },
      data: { status: 'confirmed' },
    });
  }

  async rejectOrder(merchantId: number, orderId: number, reason: string) {
    const order = await this.prisma.order.findFirst({ where: { id: orderId, merchantId } });
    if (!order) throw new NotFoundException('订单不存在');
    if (order.status !== 'pending_confirm') throw new BadRequestException('订单状态错误');
    return this.prisma.order.update({
      where: { id: orderId },
      data: { status: 'cancelled', cancelReason: reason },
    });
  }

  async completeOrder(merchantId: number, orderId: number) {
    const order = await this.prisma.order.findFirst({ where: { id: orderId, merchantId } });
    if (!order) throw new NotFoundException('订单不存在');
    if (order.status !== 'in_progress') throw new BadRequestException('订单状态错误');
    return this.prisma.order.update({
      where: { id: orderId },
      data: { status: 'completed', completedAt: new Date() },
    });
  }

  async getShopInfo(merchantId: number) {
    const merchant = await this.prisma.merchant.findUnique({
      where: { id: merchantId },
      include: { qualifications: true },
    });
    if (!merchant) throw new NotFoundException('商家不存在');
    return merchant;
  }

  async updateShop(merchantId: number, data: any) {
    return this.prisma.merchant.update({ where: { id: merchantId }, data });
  }

  async applyQualification(merchantId: number, data: { licenseImg?: string; idCardImg?: string; otherImgs?: string }) {
    const existing = await this.prisma.merchantQualification.findFirst({ where: { merchantId } });
    if (existing) {
      return this.prisma.merchantQualification.update({
        where: { id: existing.id },
        data: { ...data, status: 0, rejectReason: null },
      });
    }
    return this.prisma.merchantQualification.create({ data: { merchantId, ...data } });
  }

  async getFinance(merchantId: number) {
    const monthStart = new Date(); monthStart.setDate(1); monthStart.setHours(0,0,0,0);
    const [totalRevenue, monthRevenue, pendingSettlement, withdrawals] = await Promise.all([
      this.prisma.order.aggregate({
        where: { merchantId, status: 'completed' },
        _sum: { payAmount: true },
      }),
      this.prisma.order.aggregate({
        where: { merchantId, status: 'completed', updatedAt: { gte: monthStart } },
        _sum: { payAmount: true },
      }),
      this.prisma.order.aggregate({
        where: { merchantId, status: { in: ['pending_confirm', 'confirmed', 'in_progress'] } },
        _sum: { payAmount: true },
      }),
      this.prisma.withdrawalRecord.findMany({
        where: { merchantId },
        orderBy: { createdAt: 'desc' },
        take: 10,
      }),
    ]);
    return {
      totalRevenue: totalRevenue._sum.payAmount || 0,
      monthRevenue: monthRevenue._sum.payAmount || 0,
      pendingSettlement: pendingSettlement._sum.payAmount || 0,
      withdrawals,
    };
  }

  async applyWithdraw(merchantId: number, data: { amount: number; bankName: string; bankCardNo: string; accountName: string }) {
    const merchant = await this.prisma.merchant.findUnique({ where: { id: merchantId } });
    if (!merchant) throw new NotFoundException('商家不存在');
    return this.prisma.withdrawalRecord.create({ data: { merchantId, ...data } });
  }

  async getReviews(merchantId: number, page = 1, pageSize = 10) {
    const where = { merchantId };
    const [items, total] = await Promise.all([
      this.prisma.review.findMany({
        where,
        include: { user: { select: { nickname: true, avatar: true } }, car: { select: { brand: true, model: true } } },
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * pageSize,
        take: pageSize,
      }),
      this.prisma.review.count({ where }),
    ]);
    return { items, total, page, pageSize };
  }

  async replyReview(merchantId: number, reviewId: number, content: string) {
    const review = await this.prisma.review.findFirst({ where: { id: reviewId, merchantId } });
    if (!review) throw new NotFoundException('评价不存在');
    return this.prisma.review.update({
      where: { id: reviewId },
      data: { replyContent: content, replyAt: new Date() },
    });
  }

  // Public shop page
  async getPublicShop(shopId: number) {
    const merchant = await this.prisma.merchant.findUnique({
      where: { id: shopId },
      include: {
        cars: { where: { status: 0 }, orderBy: { sortOrder: 'asc' } },
        reviews: {
          take: 5, orderBy: { createdAt: 'desc' },
          include: { user: { select: { nickname: true, avatar: true } } },
        },
      },
    });
    if (!merchant || merchant.status !== 0) throw new NotFoundException('商家不存在');
    return merchant;
  }
}