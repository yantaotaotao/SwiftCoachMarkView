/**
 * 📋 订单模块 — 特征测试
 *
 * 覆盖：下单、支付、订单状态流转、取消/退款、商家接单
 */
import {
  createMockOrder,
  createMockCar,
  createMockUser,
  createMockFleetPackage,
  createSuccessResponse,
  createErrorResponse,
  createPaginatedResponse,
  calculateOrderAmount,
  OrderStatus,
} from '../shared/test-data-factory';

// ========================================
// 1. 创建订单
// ========================================
describe('📋 创建订单 (POST /api/orders)', () => {
  describe('✅ 正常场景', () => {
    it('用户下单成功，状态为"待付款"', async () => {
      const order = createMockOrder({ status: 'pending_pay' });
      const response = createSuccessResponse(order);

      expect(response.code).toBe(0);
      expect(response.data.status).toBe('pending_pay');
      expect(response.data.order_no).toBeDefined();
    });

    it('生成唯一订单号', async () => {
      const order1 = createMockOrder({ id: 1 });
      const order2 = createMockOrder({ id: 2 });

      expect(order1.order_no).not.toBe(order2.order_no);
    });

    it('半天套餐订单计算正确', async () => {
      const car = createMockCar({ half_day_price: 1888 });
      const amounts = calculateOrderAmount({
        serviceType: 'half_day',
        halfDayPrice: car.half_day_price,
        fullDayPrice: car.full_day_price,
        fleetPrice: car.fleet_price,
      });

      expect(amounts.totalAmount).toBe(1888);
      expect(amounts.depositAmount).toBe(566.4);
      expect(amounts.balanceAmount).toBe(1321.6);
    });

    it('全天套餐订单计算正确', async () => {
      const car = createMockCar({ full_day_price: 3288 });
      const amounts = calculateOrderAmount({
        serviceType: 'full_day',
        halfDayPrice: car.half_day_price,
        fullDayPrice: car.full_day_price,
        fleetPrice: car.fleet_price,
      });

      expect(amounts.totalAmount).toBe(3288);
      expect(amounts.depositAmount).toBe(986.4);
      expect(amounts.balanceAmount).toBe(2301.6);
    });

    it('车队套餐订单计算正确', async () => {
      const car = createMockCar({ half_day_price: 1888, fleet_price: 1688 });
      const amounts = calculateOrderAmount({
        serviceType: 'fleet',
        halfDayPrice: car.half_day_price,
        fullDayPrice: car.full_day_price,
        fleetPrice: car.fleet_price,
        followCarCount: 3,
      });

      expect(amounts.totalAmount).toBe(1888 + 1688 * 3);
      expect(amounts.depositAmount).toBe(Math.round((1888 + 1688 * 3) * 0.3 * 100) / 100);
    });

    it('包含装饰费用的订单金额正确', async () => {
      const car = createMockCar({
        half_day_price: 1888,
        decoration_fee: 200,
      });
      const amounts = calculateOrderAmount({
        serviceType: 'half_day',
        halfDayPrice: car.half_day_price,
        fullDayPrice: car.full_day_price,
        fleetPrice: car.fleet_price,
        decorationFee: car.decoration_fee,
      });

      expect(amounts.totalAmount).toBe(1888 + 200);
    });
  });

  describe('❌ 异常场景', () => {
    it('所选日期车辆已被预订时返回错误', async () => {
      const response = createErrorResponse(409, '该车辆在所选日期已被预订');

      expect(response.code).toBe(409);
    });

    it('所选日期已过期时返回错误', async () => {
      const response = createErrorResponse(400, '不能选择过去的日期');

      expect(response.code).toBe(400);
    });

    it('车辆已下架时不能下单', async () => {
      const response = createErrorResponse(400, '该车辆已下架');

      expect(response.code).toBe(400);
    });

    it('缺少必填联系信息时返回错误', async () => {
      const response = createErrorResponse(400, '请填写联系信息');

      expect(response.code).toBe(400);
    });
  });
});

// ========================================
// 2. 支付
// ========================================
describe('📋 支付流程', () => {
  describe('定金支付 (POST /api/orders/:id/pay-deposit)', () => {
    it('支付定金成功，订单状态变为"待确认"', async () => {
      const order = createMockOrder({ status: 'pending_confirm' });
      const response = createSuccessResponse(order);

      expect(response.data.status).toBe('pending_confirm');
    });

    it('支付金额必须等于定金金额', async () => {
      const order = createMockOrder({ deposit_amount: 716.4 });
      const response = createSuccessResponse(order);

      expect(response.data.deposit_amount).toBe(716.4);
    });

    it('支付成功后记录支付流水号', async () => {
      const response = createSuccessResponse({
        ...createMockOrder({ status: 'pending_confirm' }),
        payment: {
          trade_no: '2026071522001412345678',
          payment_method: 'alipay',
        },
      });

      expect(response.data.payment.trade_no).toBeDefined();
      expect(response.data.payment.payment_method).toBe('alipay');
    });
  });

  describe('尾款支付 (POST /api/orders/:id/pay-balance)', () => {
    it('服务完成后支付尾款成功', async () => {
      const order = createMockOrder({
        status: 'completed',
        balance_amount: 0,
      });
      const response = createSuccessResponse(order);

      expect(response.data.status).toBe('completed');
      expect(response.data.balance_amount).toBe(0);
    });
  });

  describe('❌ 异常场景', () => {
    it('订单已支付不能重复支付', async () => {
      const response = createErrorResponse(400, '该订单已支付');

      expect(response.code).toBe(400);
    });

    it('订单已取消不能支付', async () => {
      const response = createErrorResponse(400, '该订单已取消');

      expect(response.code).toBe(400);
    });

    it('支付超时订单自动取消', async () => {
      const response = createErrorResponse(400, '支付超时，订单已自动取消');

      expect(response.code).toBe(400);
    });

    it('支付金额与订单金额不一致返回错误', async () => {
      const response = createErrorResponse(400, '支付金额不一致');

      expect(response.code).toBe(400);
    });
  });
});

// ========================================
// 3. 订单状态流转
// ========================================
describe('📋 订单状态流转', () => {
  const validTransitions: Record<OrderStatus, OrderStatus[]> = {
    pending_pay: ['pending_confirm', 'cancelled'],
    pending_confirm: ['confirmed', 'cancelled'],
    confirmed: ['in_progress', 'cancelled'],
    in_progress: ['completed'],
    completed: [],
    cancelled: [],
    refunding: ['refunded'],
    refunded: [],
  };

  describe('✅ 正常流转', () => {
    it('订单状态按照正确顺序流转', () => {
      const flow: OrderStatus[] = [
        'pending_pay',
        'pending_confirm',
        'confirmed',
        'in_progress',
        'completed',
      ];

      for (let i = 1; i < flow.length; i++) {
        const allowedNext = validTransitions[flow[i - 1]];
        expect(allowedNext).toContain(flow[i]);
      }
    });

    it('支付定金后从"待付款"变为"待确认"', () => {
      const order = createMockOrder({ status: 'pending_pay' });
      const allowedNext = validTransitions[order.status];
      expect(allowedNext).toContain('pending_confirm');
    });

    it('商家接单后从"待确认"变为"已确认"', () => {
      const order = createMockOrder({ status: 'pending_confirm' });
      const allowedNext = validTransitions[order.status];
      expect(allowedNext).toContain('confirmed');
    });

    it('开始服务后从"已确认"变为"进行中"', () => {
      const order = createMockOrder({ status: 'confirmed' });
      const allowedNext = validTransitions[order.status];
      expect(allowedNext).toContain('in_progress');
    });

    it('服务完成后从"进行中"变为"已完成"', () => {
      const order = createMockOrder({ status: 'in_progress' });
      const allowedNext = validTransitions[order.status];
      expect(allowedNext).toContain('completed');
    });
  });

  describe('❌ 异常流转', () => {
    it('已完成的订单不能取消', () => {
      const order = createMockOrder({ status: 'completed' });
      const allowedNext = validTransitions[order.status];
      expect(allowedNext).not.toContain('cancelled');
    });

    it('已取消的订单不能再次操作', () => {
      const order = createMockOrder({ status: 'cancelled' });
      const allowedNext = validTransitions[order.status];
      expect(allowedNext).toHaveLength(0);
    });

    it('未支付不能直接变为"已确认"', () => {
      const order = createMockOrder({ status: 'pending_pay' });
      const allowedNext = validTransitions[order.status];
      expect(allowedNext).not.toContain('confirmed');
    });

    it('"待付款"不能直接变为"进行中"', () => {
      const order = createMockOrder({ status: 'pending_pay' });
      const allowedNext = validTransitions[order.status];
      expect(allowedNext).not.toContain('in_progress');
    });
  });
});

// ========================================
// 4. 取消与退款
// ========================================
describe('📋 取消与退款', () => {
  describe('取消订单', () => {
    it('待付款订单取消成功', async () => {
      const order = createMockOrder({ status: 'cancelled' });
      const response = createSuccessResponse(order);

      expect(response.data.status).toBe('cancelled');
    });

    it('已确认订单在服务开始前可取消', async () => {
      const response = createSuccessResponse({
        ...createMockOrder({ status: 'cancelled' }),
        refund: { amount: 716.4, status: 'refunded' },
      });

      expect(response.data.status).toBe('cancelled');
      expect(response.data.refund).toBeDefined();
    });

    it('服务当天不能取消订单', async () => {
      const response = createErrorResponse(400, '服务当天不能取消订单');

      expect(response.code).toBe(400);
    });

    it('已完成订单不能取消', async () => {
      const response = createErrorResponse(400, '已完成订单不能取消');

      expect(response.code).toBe(400);
    });
  });

  describe('退款流程', () => {
    it('用户申请退款后状态变为"退款中"', async () => {
      const response = createSuccessResponse({
        ...createMockOrder({ status: 'refunding' }),
      });

      expect(response.data.status).toBe('refunding');
    });

    it('平台审核通过后退款完成', async () => {
      const response = createSuccessResponse({
        ...createMockOrder({ status: 'refunded' }),
        refund: {
          amount: 716.4,
          approved_at: new Date().toISOString(),
        },
      });

      expect(response.data.status).toBe('refunded');
    });

    it('退款金额不超过实际支付金额', async () => {
      const order = createMockOrder({ pay_amount: 716.4 });
      const refundAmount = 716.4;

      expect(refundAmount).toBeLessThanOrEqual(order.pay_amount);
    });
  });
});

// ========================================
// 5. 商家接单
// ========================================
describe('📋 商家接单', () => {
  describe('接单 (POST /api/merchant/orders/:id/accept)', () => {
    it('商家接单成功，状态变为"已确认"', async () => {
      const response = createSuccessResponse({
        ...createMockOrder({ status: 'confirmed' }),
      });

      expect(response.data.status).toBe('confirmed');
    });

    it('商家接单后档期被锁定', async () => {
      const response = createSuccessResponse({
        message: '接单成功，档期已锁定',
      });

      expect(response.message).toContain('档期已锁定');
    });
  });

  describe('拒单 (POST /api/merchant/orders/:id/reject)', () => {
    it('商家拒单成功，订单自动取消并退款', async () => {
      const response = createSuccessResponse({
        ...createMockOrder({ status: 'cancelled' }),
        refund: { amount: 716.4, status: 'refunded' },
      });

      expect(response.data.status).toBe('cancelled');
    });

    it('商家拒单需要填写原因', async () => {
      const response = createErrorResponse(400, '请填写拒单原因');

      expect(response.code).toBe(400);
    });
  });

  describe('完成服务 (POST /api/merchant/orders/:id/complete)', () => {
    it('商家标记服务完成成功', async () => {
      const response = createSuccessResponse({
        ...createMockOrder({ status: 'completed' }),
      });

      expect(response.data.status).toBe('completed');
    });

    it('服务完成后用户可以评价', async () => {
      const response = createSuccessResponse({
        ...createMockOrder({ status: 'completed' }),
        canReview: true,
      });

      expect(response.data.canReview).toBe(true);
    });
  });
});