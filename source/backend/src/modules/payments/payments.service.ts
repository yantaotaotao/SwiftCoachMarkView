import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../common/prisma.service';

@Injectable()
export class PaymentsService {
  constructor(private prisma: PrismaService) {}

  async getPaymentsByOrder(orderId: number) {
    return this.prisma.payment.findMany({ where: { orderId }, orderBy: { createdAt: 'desc' } });
  }

  async getPaymentByTradeNo(tradeNo: string) {
    return this.prisma.payment.findUnique({ where: { tradeNo } });
  }
}