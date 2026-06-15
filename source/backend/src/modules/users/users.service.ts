import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../common/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async getProfile(userId: number) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        phone: true,
        nickname: true,
        avatar: true,
        status: true,
        createdAt: true,
        merchant: {
          select: { id: true, shopName: true, authStatus: true, status: true },
        },
      },
    });
    if (!user) throw new NotFoundException('用户不存在');
    return user;
  }

  async updateProfile(userId: number, data: { nickname?: string; avatar?: string }) {
    return this.prisma.user.update({
      where: { id: userId },
      data,
      select: { id: true, phone: true, nickname: true, avatar: true },
    });
  }

  async getOrders(userId: number, status?: string, page = 1, pageSize = 10) {
    const where: any = { userId };
    if (status && status !== 'all') where.status = status;
    const [items, total] = await Promise.all([
      this.prisma.order.findMany({
        where,
        include: { car: { select: { brand: true, model: true, images: true } } },
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * pageSize,
        take: pageSize,
      }),
      this.prisma.order.count({ where }),
    ]);
    return { items, total, page, pageSize, totalPages: Math.ceil(total / pageSize) };
  }

  async getOrderDetail(userId: number, orderId: number) {
    const order = await this.prisma.order.findFirst({
      where: { id: orderId, userId },
      include: {
        car: true,
        merchant: { select: { id: true, shopName: true, phone: true, address: true } },
        tracking: { orderBy: { createdAt: 'desc' } },
        payments: true,
        fleetPackage: true,
      },
    });
    if (!order) throw new NotFoundException('订单不存在');
    return order;
  }

  async getFavorites(userId: number, page = 1, pageSize = 20) {
    const where = { userId };
    const [items, total] = await Promise.all([
      this.prisma.favorite.findMany({
        where,
        include: { car: { include: { merchant: { select: { shopName: true, district: true } } } } },
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * pageSize,
        take: pageSize,
      }),
      this.prisma.favorite.count({ where }),
    ]);
    return { items, total, page, pageSize };
  }

  async toggleFavorite(userId: number, carId: number) {
    const existing = await this.prisma.favorite.findUnique({
      where: { userId_carId: { userId, carId } },
    });
    if (existing) {
      await this.prisma.favorite.delete({ where: { id: existing.id } });
      return { favorited: false };
    }
    await this.prisma.favorite.create({ data: { userId, carId } });
    return { favorited: true };
  }

  async getCoupons(userId: number) {
    return this.prisma.userCoupon.findMany({
      where: { userId },
      include: { coupon: true },
      orderBy: { createdAt: 'desc' },
    });
  }
}