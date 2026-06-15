import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../common/prisma.service';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AdminService {
  constructor(private prisma: PrismaService) {}

  async getDashboard() {
    const todayStart = new Date(); todayStart.setHours(0, 0, 0, 0);
    const monthStart = new Date(); monthStart.setDate(1); monthStart.setHours(0, 0, 0, 0);

    const [userCount, merchantCount, carCount, orderCount, monthOrderCount, monthGmv] = await Promise.all([
      this.prisma.user.count(),
      this.prisma.merchant.count(),
      this.prisma.car.count(),
      this.prisma.order.count(),
      this.prisma.order.count({ where: { createdAt: { gte: monthStart } } }),
      this.prisma.order.aggregate({
        where: { status: 'completed', createdAt: { gte: monthStart } },
        _sum: { payAmount: true },
      }),
    ]);

    const pendingAuditMerchants = await this.prisma.merchant.count({ where: { authStatus: 0 } });
    const pendingAuditCars = await this.prisma.car.count({ where: { status: 2 } });
    const pendingWithdrawals = await this.prisma.withdrawalRecord.count({ where: { status: 'pending' } });

    return {
      userCount, merchantCount, carCount, orderCount,
      monthOrderCount, monthGmv: monthGmv._sum.payAmount || 0,
      pendingAuditMerchants, pendingAuditCars, pendingWithdrawals,
    };
  }

  // Users
  async getUsers(page = 1, pageSize = 20, keyword?: string) {
    const where: any = {};
    if (keyword) {
      where.OR = [
        { phone: { contains: keyword } },
        { nickname: { contains: keyword } },
      ];
    }
    const [items, total] = await Promise.all([
      this.prisma.user.findMany({
        where, orderBy: { createdAt: 'desc' },
        skip: (page - 1) * pageSize, take: pageSize,
        select: { id: true, phone: true, nickname: true, avatar: true, status: true, createdAt: true, _count: { select: { orders: true } } },
      }),
      this.prisma.user.count({ where }),
    ]);
    return { items, total, page, pageSize };
  }

  async toggleUserStatus(userId: number) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new NotFoundException('用户不存在');
    return this.prisma.user.update({
      where: { id: userId },
      data: { status: user.status === 0 ? 1 : 0 },
    });
  }

  // Merchants
  async getMerchants(page = 1, pageSize = 20, authStatus?: number) {
    const where: any = {};
    if (authStatus !== undefined) where.authStatus = authStatus;
    const [items, total] = await Promise.all([
      this.prisma.merchant.findMany({
        where, orderBy: { createdAt: 'desc' },
        skip: (page - 1) * pageSize, take: pageSize,
        include: { user: { select: { phone: true } }, qualifications: true },
      }),
      this.prisma.merchant.count({ where }),
    ]);
    return { items, total, page, pageSize };
  }

  async auditMerchant(merchantId: number, action: 'approve' | 'reject', rejectReason?: string) {
    const merchant = await this.prisma.merchant.findUnique({ where: { id: merchantId } });
    if (!merchant) throw new NotFoundException('商家不存在');
    return this.prisma.merchant.update({
      where: { id: merchantId },
      data: {
        authStatus: action === 'approve' ? 1 : 2,
        ...(action === 'reject' ? { qualifications: { updateMany: { where: { merchantId }, data: { status: 2, rejectReason } } } } : {}),
      },
    });
  }

  async toggleMerchantStatus(merchantId: number) {
    const merchant = await this.prisma.merchant.findUnique({ where: { id: merchantId } });
    if (!merchant) throw new NotFoundException('商家不存在');
    return this.prisma.merchant.update({
      where: { id: merchantId },
      data: { status: merchant.status === 0 ? 1 : 0 },
    });
  }

  async setMerchantCommission(merchantId: number, rate: number) {
    return this.prisma.merchant.update({
      where: { id: merchantId },
      data: { commissionRate: rate },
    });
  }

  // Cars
  async getCars(page = 1, pageSize = 20, status?: number) {
    const where: any = {};
    if (status !== undefined) where.status = status;
    const [items, total] = await Promise.all([
      this.prisma.car.findMany({
        where, orderBy: { createdAt: 'desc' },
        skip: (page - 1) * pageSize, take: pageSize,
        include: { merchant: { select: { shopName: true } } },
      }),
      this.prisma.car.count({ where }),
    ]);
    return { items, total, page, pageSize };
  }

  async auditCar(carId: number, action: 'approve' | 'reject') {
    const car = await this.prisma.car.findUnique({ where: { id: carId } });
    if (!car) throw new NotFoundException('车辆不存在');
    return this.prisma.car.update({
      where: { id: carId },
      data: { status: action === 'approve' ? 0 : 1 },
    });
  }

  // Orders
  async getOrders(page = 1, pageSize = 20, status?: string, keyword?: string) {
    const where: any = {};
    if (status && status !== 'all') where.status = status;
    if (keyword) {
      where.OR = [
        { orderNo: { contains: keyword } },
        { contactPhone: { contains: keyword } },
        { contactName: { contains: keyword } },
      ];
    }
    const [items, total] = await Promise.all([
      this.prisma.order.findMany({
        where, orderBy: { createdAt: 'desc' },
        skip: (page - 1) * pageSize, take: pageSize,
        include: {
          user: { select: { nickname: true, phone: true } },
          merchant: { select: { shopName: true } },
          car: { select: { brand: true, model: true } },
        },
      }),
      this.prisma.order.count({ where }),
    ]);
    return { items, total, page, pageSize };
  }

  // Finance
  async getFinance() {
    const totalRevenue = await this.prisma.order.aggregate({
      where: { status: 'completed' },
      _sum: { payAmount: true, commissionAmount: true },
    });
    const totalCommission = totalRevenue._sum.commissionAmount || 0;
    const pendingWithdrawals = await this.prisma.withdrawalRecord.findMany({
      where: { status: 'pending' },
      include: { merchant: { select: { shopName: true } } },
    });
    return {
      totalRevenue: totalRevenue._sum.payAmount || 0,
      totalCommission,
      pendingWithdrawals,
    };
  }

  async auditWithdrawal(withdrawalId: number, action: 'approve' | 'reject', remark?: string) {
    const record = await this.prisma.withdrawalRecord.findUnique({ where: { id: withdrawalId } });
    if (!record) throw new NotFoundException('提现记录不存在');
    const status = action === 'approve' ? 'completed' : 'rejected';
    return this.prisma.withdrawalRecord.update({
      where: { id: withdrawalId },
      data: { status, auditRemark: remark, auditAt: new Date(), ...(action === 'approve' ? { completedAt: new Date() } : {}) },
    });
  }

  // Content
  async getBanners() {
    return this.prisma.banner.findMany({ orderBy: { sortOrder: 'asc' } });
  }

  async createBanner(data: any) {
    return this.prisma.banner.create({ data });
  }

  async updateBanner(bannerId: number, data: any) {
    return this.prisma.banner.update({ where: { id: bannerId }, data });
  }

  async deleteBanner(bannerId: number) {
    return this.prisma.banner.delete({ where: { id: bannerId } });
  }

  // Settings
  async getAdmins() {
    return this.prisma.admin.findMany({
      select: { id: true, username: true, realName: true, phone: true, role: true, status: true, createdAt: true },
    });
  }

  async createAdmin(data: { username: string; password: string; realName?: string; phone?: string; role?: string }) {
    const existing = await this.prisma.admin.findUnique({ where: { username: data.username } });
    if (existing) throw new BadRequestException('用户名已存在');
    const passwordHash = await bcrypt.hash(data.password, 10);
    return this.prisma.admin.create({
      data: { ...data, passwordHash },
      select: { id: true, username: true, realName: true, role: true, createdAt: true },
    });
  }

  // Coupons
  async getCoupons() {
    return this.prisma.coupon.findMany({ orderBy: { createdAt: 'desc' } });
  }

  async createCoupon(data: any) {
    return this.prisma.coupon.create({ data });
  }

  async updateCoupon(couponId: number, data: any) {
    return this.prisma.coupon.update({ where: { id: couponId }, data });
  }
}