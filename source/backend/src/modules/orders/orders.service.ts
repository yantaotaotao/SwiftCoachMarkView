import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../common/prisma.service';
import { ORDER_STATUS } from '../../common/constants';

@Injectable()
export class OrdersService {
  constructor(private prisma: PrismaService) {}

  async create(userId: number, data: {
    merchantId: number; carId: number; fleetPackageId?: number;
    serviceDate: string; serviceType: string; pickupTime: string;
    pickupAddress: string; ceremonyAddress: string;
    contactName: string; contactPhone: string;
    remark?: string; decorationRequired?: boolean;
    followCarCount?: number; couponId?: number;
  }) {
    const car = await this.prisma.car.findUnique({ where: { id: data.carId }, include: { merchant: true } });
    if (!car) throw new NotFoundException('车辆不存在');
    if (car.status !== 0) throw new BadRequestException('车辆已下架');

    const merchant = car.merchant;
    let totalAmount = 0;
    if (data.serviceType === 'half_day') totalAmount = Number(car.halfDayPrice);
    else if (data.serviceType === 'full_day') totalAmount = Number(car.fullDayPrice);
    else if (data.serviceType === 'fleet') {
      totalAmount = Number(car.fleetPrice || car.halfDayPrice);
      if (data.followCarCount) totalAmount += data.followCarCount * Number(car.fleetPrice || 800);
    }

    const depositAmount = Math.round(totalAmount * 0.3);
    const balanceAmount = totalAmount - depositAmount;
    const commissionAmount = parseFloat((totalAmount * Number(merchant.commissionRate) / 100).toFixed(2));

    let discountAmount = 0;
    if (data.couponId) {
      const coupon = await this.prisma.userCoupon.findFirst({
        where: { id: data.couponId, userId, usedAt: null },
        include: { coupon: true },
      });
      if (coupon) {
        if (coupon.coupon.type === 'fixed') discountAmount = Number(coupon.coupon.value);
        else discountAmount = Math.round(totalAmount * Number(coupon.coupon.value) / 100);
      }
    }

    const payAmount = totalAmount - discountAmount;
    const orderNo = `LY${Date.now()}${String(Math.random()).slice(2, 6)}`;

    const order = await this.prisma.order.create({
      data: {
        orderNo, userId, merchantId: data.merchantId, carId: data.carId,
        fleetPackageId: data.fleetPackageId, followCarCount: data.followCarCount,
        serviceDate: new Date(data.serviceDate), serviceType: data.serviceType,
        pickupTime: data.pickupTime, pickupAddress: data.pickupAddress,
        ceremonyAddress: data.ceremonyAddress, contactName: data.contactName,
        contactPhone: data.contactPhone, remark: data.remark,
        decorationRequired: data.decorationRequired ? 1 : 0,
        totalAmount, depositAmount, balanceAmount, commissionAmount,
        couponId: data.couponId, discountAmount, payAmount,
        status: ORDER_STATUS.PENDING_PAY,
        tracking: {
          create: { fromStatus: null, toStatus: ORDER_STATUS.PENDING_PAY, operatorType: 'user', operatorId: userId, remark: '创建订单' },
        },
      },
      include: { tracking: true },
    });

    // Create schedule entries
    if (order.status === ORDER_STATUS.PENDING_PAY) {
      await this.prisma.carSchedule.create({
        data: { carId: data.carId, date: new Date(data.serviceDate), status: 1, orderId: order.id },
      });
    }
    return order;
  }

  async cancel(userId: number, orderId: number, reason?: string) {
    const order = await this.prisma.order.findFirst({ where: { id: orderId, userId } });
    if (!order) throw new NotFoundException('订单不存在');
    if (![ORDER_STATUS.PENDING_PAY, ORDER_STATUS.PENDING_CONFIRM].includes(order.status)) {
      throw new BadRequestException('当前状态不允许取消');
    }
    return this.prisma.order.update({
      where: { id: orderId },
      data: { status: ORDER_STATUS.CANCELLED, cancelReason: reason },
    });
  }

  async pay(orderNo: string, userId: number, method: string) {
    const order = await this.prisma.order.findUnique({ where: { orderNo } });
    if (!order) throw new NotFoundException('订单不存在');
    if (order.status !== ORDER_STATUS.PENDING_PAY) throw new BadRequestException('订单状态错误');

    const payment = await this.prisma.payment.create({
      data: {
        orderId: order.id, type: 'deposit', amount: order.depositAmount,
        paymentMethod: method, status: 'success', paidAt: new Date(),
        outTradeNo: `OUT${Date.now()}`,
      },
    });
    await this.prisma.order.update({
      where: { id: order.id },
      data: { status: ORDER_STATUS.PENDING_CONFIRM, paidAt: new Date() },
    });
    return payment;
  }
}