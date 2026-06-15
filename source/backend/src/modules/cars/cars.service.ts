import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../common/prisma.service';

@Injectable()
export class CarsService {
  constructor(private prisma: PrismaService) {}

  async getList(query: {
    brand?: string; type?: string; minPrice?: number; maxPrice?: number;
    seats?: number; color?: string; district?: string; keyword?: string;
    sortBy?: string; page?: number; pageSize?: number;
  }) {
    const { brand, type, minPrice, maxPrice, seats, color, district, keyword, sortBy, page = 1, pageSize = 12 } = query;
    const where: any = { status: 0 };
    if (brand) where.brand = brand;
    if (color) where.color = color;
    if (seats) where.seats = seats;
    if (keyword) {
      where.OR = [
        { brand: { contains: keyword } },
        { model: { contains: keyword } },
      ];
    }
    if (district) {
      where.merchant = { district };
    }

    let orderBy: any = { sortOrder: 'asc' };
    if (sortBy === 'price_asc') orderBy = { halfDayPrice: 'asc' };
    else if (sortBy === 'price_desc') orderBy = { halfDayPrice: 'desc' };
    else if (sortBy === 'rating') orderBy = { rating: 'desc' };
    else if (sortBy === 'newest') orderBy = { createdAt: 'desc' };

    const [items, total] = await Promise.all([
      this.prisma.car.findMany({
        where,
        include: { merchant: { select: { id: true, shopName: true, district: true, rating: true } } },
        orderBy,
        skip: (page - 1) * pageSize,
        take: pageSize,
      }),
      this.prisma.car.count({ where }),
    ]);
    return { items, total, page, pageSize, totalPages: Math.ceil(total / pageSize) };
  }

  async getDetail(carId: number) {
    const car = await this.prisma.car.findUnique({
      where: { id: carId },
      include: {
        merchant: { select: { id: true, shopName: true, phone: true, address: true, rating: true, totalOrders: true, createdAt: true } },
        reviews: {
          take: 10, orderBy: { createdAt: 'desc' },
          include: { user: { select: { nickname: true, avatar: true } } },
        },
      },
    });
    if (!car) throw new NotFoundException('车辆不存在');
    return car;
  }

  async getSchedule(carId: number, year: number, month: number) {
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0);
    return this.prisma.carSchedule.findMany({
      where: { carId, date: { gte: startDate, lte: endDate } },
    });
  }

  // Merchant car management
  async getMerchantCars(merchantId: number, page = 1, pageSize = 20) {
    const where = { merchantId };
    const [items, total] = await Promise.all([
      this.prisma.car.findMany({ where, orderBy: { createdAt: 'desc' }, skip: (page - 1) * pageSize, take: pageSize }),
      this.prisma.car.count({ where }),
    ]);
    return { items, total, page, pageSize };
  }

  async create(merchantId: number, data: any) {
    return this.prisma.car.create({
      data: { ...data, merchantId, status: 2 }, // default: pending review
    });
  }

  async update(merchantId: number, carId: number, data: any) {
    const car = await this.prisma.car.findFirst({ where: { id: carId, merchantId } });
    if (!car) throw new NotFoundException('车辆不存在');
    return this.prisma.car.update({ where: { id: carId }, data: { ...data, status: 2 } });
  }

  async toggleStatus(merchantId: number, carId: number) {
    const car = await this.prisma.car.findFirst({ where: { id: carId, merchantId } });
    if (!car) throw new NotFoundException('车辆不存在');
    const newStatus = car.status === 0 ? 1 : 0;
    return this.prisma.car.update({ where: { id: carId }, data: { status: newStatus } });
  }

  async delete(merchantId: number, carId: number) {
    const car = await this.prisma.car.findFirst({ where: { id: carId, merchantId } });
    if (!car) throw new NotFoundException('车辆不存在');
    return this.prisma.car.delete({ where: { id: carId } });
  }

  async updateSchedule(carId: number, merchantId: number, date: string, status: number) {
    const car = await this.prisma.car.findFirst({ where: { id: carId, merchantId } });
    if (!car) throw new NotFoundException('车辆不存在');
    const dateObj = new Date(date);
    return this.prisma.carSchedule.upsert({
      where: { carId_date: { carId, date: dateObj } },
      update: { status },
      create: { carId, date: dateObj, status },
    });
  }

  async getFleetPackages(merchantId: number) {
    return this.prisma.fleetPackage.findMany({
      where: { merchantId, isActive: 1 },
      include: { mainCar: { select: { brand: true, model: true, color: true } } },
    });
  }

  async createFleetPackage(merchantId: number, data: any) {
    return this.prisma.fleetPackage.create({ data: { ...data, merchantId } });
  }

  async updateFleetPackage(merchantId: number, pkgId: number, data: any) {
    const pkg = await this.prisma.fleetPackage.findFirst({ where: { id: pkgId, merchantId } });
    if (!pkg) throw new NotFoundException('套餐不存在');
    return this.prisma.fleetPackage.update({ where: { id: pkgId }, data });
  }

  async deleteFleetPackage(merchantId: number, pkgId: number) {
    const pkg = await this.prisma.fleetPackage.findFirst({ where: { id: pkgId, merchantId } });
    if (!pkg) throw new NotFoundException('套餐不存在');
    return this.prisma.fleetPackage.delete({ where: { id: pkgId } });
  }

  // Public: hot cars for homepage
  async getHotCars(limit = 8) {
    return this.prisma.car.findMany({
      where: { status: 0 },
      orderBy: [{ totalOrders: 'desc' }, { rating: 'desc' }],
      take: limit,
      include: { merchant: { select: { district: true, shopName: true } } },
    });
  }

  async getBanners() {
    return this.prisma.banner.findMany({
      where: { status: 0 },
      orderBy: { sortOrder: 'asc' },
    });
  }
}