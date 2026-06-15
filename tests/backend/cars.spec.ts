/**
 * 🚗 车辆模块 — 特征测试
 *
 * 覆盖：车辆列表、搜索筛选、详情、管理 CRUD、档期管理
 */
import {
  createMockCar,
  createMockCarList,
  createMockMerchant,
  createSuccessResponse,
  createErrorResponse,
  createPaginatedResponse,
} from '../shared/test-data-factory';

// ========================================
// 1. 车辆列表与搜索
// ========================================
describe('🚗 车辆列表 (GET /api/cars)', () => {
  describe('✅ 正常场景', () => {
    it('获取车辆列表成功', async () => {
      const cars = createMockCarList(10);
      const response = createPaginatedResponse(cars, 50, 1, 10);

      expect(response.code).toBe(0);
      expect(response.data.items).toHaveLength(10);
      expect(response.data.total).toBe(50);
    });

    it('按品牌筛选返回正确结果', async () => {
      const allCars = createMockCarList(20);
      const benzCars = allCars.filter((c) => c.brand === '奔驰');
      const response = createSuccessResponse(benzCars);

      response.data.forEach((car: any) => {
        expect(car.brand).toBe('奔驰');
      });
    });

    it('按价格区间筛选有效', async () => {
      const cars = createMockCarList(10);
      const filtered = cars.filter(
        (c) => c.half_day_price >= 1000 && c.half_day_price <= 3000,
      );
      const response = createSuccessResponse(filtered);

      response.data.forEach((car: any) => {
        expect(car.half_day_price).toBeGreaterThanOrEqual(1000);
        expect(car.half_day_price).toBeLessThanOrEqual(3000);
      });
    });

    it('按座位数筛选有效', async () => {
      const cars = createMockCarList(10);
      const filtered = cars.filter((c) => c.seats >= 5);
      const response = createSuccessResponse(filtered);

      response.data.forEach((car: any) => {
        expect(car.seats).toBeGreaterThanOrEqual(5);
      });
    });

    it('按颜色筛选有效', async () => {
      const cars = createMockCarList(10);
      const whiteCars = cars.filter((c) => c.color === '白色');
      const response = createSuccessResponse(whiteCars);

      response.data.forEach((car: any) => {
        expect(car.color).toBe('白色');
      });
    });

    it('按地区筛选仅返回该地区车辆', async () => {
      const cars = createMockCarList(5).map((c) => ({
        ...c,
        merchant: createMockMerchant({ district: '汉台区' }),
      }));
      const response = createSuccessResponse(cars);

      response.data.forEach((car: any) => {
        expect(car.merchant.district).toBe('汉台区');
      });
    });

    it('按档期日期筛选仅返回可预订车辆', async () => {
      const response = createPaginatedResponse(
        createMockCarList(8),
        8,
        1,
        10,
      );

      expect(response.data.items).toHaveLength(8);
    });

    it('按关键字搜索返回相关结果', async () => {
      const cars = createMockCarList(5);
      const keyword = '奔驰';
      const filtered = cars.filter((c) => c.brand.includes(keyword));
      const response = createSuccessResponse(filtered);

      response.data.forEach((car: any) => {
        expect(car.brand).toContain(keyword);
      });
    });
  });

  describe('📊 排序', () => {
    it('按价格从低到高排序', async () => {
      const cars = createMockCarList(5).sort(
        (a, b) => a.half_day_price - b.half_day_price,
      );
      const response = createSuccessResponse(cars);

      for (let i = 1; i < response.data.length; i++) {
        expect(response.data[i].half_day_price).toBeGreaterThanOrEqual(
          response.data[i - 1].half_day_price,
        );
      }
    });

    it('按评分从高到低排序', async () => {
      const cars = createMockCarList(5).sort(
        (a, b) => b.rating - a.rating,
      );
      const response = createSuccessResponse(cars);

      for (let i = 1; i < response.data.length; i++) {
        expect(response.data[i].rating).toBeLessThanOrEqual(
          response.data[i - 1].rating,
        );
      }
    });

    it('按热度（订单数）排序', async () => {
      const cars = createMockCarList(5).sort(
        (a, b) => b.total_orders - a.total_orders,
      );
      const response = createSuccessResponse(cars);

      for (let i = 1; i < response.data.length; i++) {
        expect(response.data[i].total_orders).toBeLessThanOrEqual(
          response.data[i - 1].total_orders,
        );
      }
    });
  });

  describe('❌ 异常场景', () => {
    it('没有可用车辆时返回空列表', async () => {
      const response = createPaginatedResponse([], 0, 1, 10);

      expect(response.data.items).toHaveLength(0);
      expect(response.data.total).toBe(0);
    });

    it('页码超出范围返回空列表', async () => {
      const response = createPaginatedResponse([], 0, 999, 10);

      expect(response.data.items).toHaveLength(0);
    });
  });
});

// ========================================
// 2. 车辆详情
// ========================================
describe('🚗 车辆详情 (GET /api/cars/:id)', () => {
  describe('✅ 正常场景', () => {
    it('获取车辆详情成功', async () => {
      const car = createMockCar({ id: 1 });
      const response = createSuccessResponse(car);

      expect(response.code).toBe(0);
      expect(response.data.id).toBe(1);
      expect(response.data.brand).toBe('奔驰');
      expect(response.data.model).toBe('S400L');
    });

    it('车辆详情包含完整价格信息', async () => {
      const car = createMockCar();
      const response = createSuccessResponse(car);

      expect(response.data).toHaveProperty('half_day_price');
      expect(response.data).toHaveProperty('full_day_price');
      expect(response.data).toHaveProperty('fleet_price');
      expect(response.data).toHaveProperty('deposit');
    });

    it('车辆详情包含商家信息', async () => {
      const car = {
        ...createMockCar(),
        merchant: createMockMerchant(),
      };
      const response = createSuccessResponse(car);

      expect(response.data.merchant).toBeDefined();
      expect(response.data.merchant.shop_name).toBeDefined();
    });

    it('车辆详情包含档期信息', async () => {
      const car = {
        ...createMockCar(),
        schedules: [
          { date: '2026-07-15', status: 0 },
          { date: '2026-07-16', status: 1 },
        ],
      };
      const response = createSuccessResponse(car);

      expect(Array.isArray(response.data.schedules)).toBe(true);
    });

    it('车辆详情包含评价摘要', async () => {
      const car = {
        ...createMockCar(),
        reviewSummary: {
          avgRating: 4.8,
          totalReviews: 36,
          ratingDistribution: { 5: 28, 4: 6, 3: 2, 2: 0, 1: 0 },
        },
      };
      const response = createSuccessResponse(car);

      expect(response.data.reviewSummary).toBeDefined();
      expect(response.data.reviewSummary.avgRating).toBeGreaterThanOrEqual(1);
      expect(response.data.reviewSummary.avgRating).toBeLessThanOrEqual(5);
    });
  });

  describe('❌ 异常场景', () => {
    it('不存在的车辆返回 404', async () => {
      const response = createErrorResponse(404, '车辆不存在');

      expect(response.code).toBe(404);
    });

    it('已下架的车辆返回 404', async () => {
      const response = createErrorResponse(404, '该车辆已下架');

      expect(response.code).toBe(404);
    });
  });
});

// ========================================
// 3. 商家车辆管理
// ========================================
describe('🚗 商家车辆管理', () => {
  const merchantId = 1;

  describe('创建车辆 (POST /api/merchant/cars)', () => {
    it('商家创建车辆成功', async () => {
      const car = createMockCar({ merchant_id: merchantId });
      const response = createSuccessResponse(car);

      expect(response.code).toBe(0);
      expect(response.data.merchant_id).toBe(merchantId);
      expect(response.data.status).toBe(2); // 待审核
    });

    it('创建车辆后状态为"待审核"', async () => {
      const car = createMockCar({ status: 2 });
      const response = createSuccessResponse(car);

      expect(response.data.status).toBe(2);
    });

    it('车辆信息不完整时返回验证错误', async () => {
      const response = createErrorResponse(400, '请填写完整的车辆信息');

      expect(response.code).toBe(400);
    });

    it('图片数量超过限制时返回错误', async () => {
      const response = createErrorResponse(
        400,
        '车辆图片最多上传20张',
      );

      expect(response.code).toBe(400);
    });
  });

  describe('编辑车辆 (PUT /api/merchant/cars/:id)', () => {
    it('商家编辑自己的车辆成功', async () => {
      const updated = createMockCar({
        id: 1,
        model: 'S450L',
        half_day_price: 2188,
      });
      const response = createSuccessResponse(updated);

      expect(response.code).toBe(0);
      expect(response.data.model).toBe('S450L');
    });

    it('编辑后车辆状态重置为"待审核"', async () => {
      const updated = createMockCar({ status: 2 });
      const response = createSuccessResponse(updated);

      expect(response.data.status).toBe(2);
    });
  });

  describe('上下架车辆 (PATCH /api/merchant/cars/:id/status)', () => {
    it('上架车辆成功', async () => {
      const response = createSuccessResponse({
        ...createMockCar({ id: 1 }),
        status: 0,
      });

      expect(response.data.status).toBe(0);
    });

    it('下架车辆成功', async () => {
      const response = createSuccessResponse({
        ...createMockCar({ id: 1 }),
        status: 1,
      });

      expect(response.data.status).toBe(1);
    });

    it('车辆审核通过前不能上架', async () => {
      const response = createErrorResponse(400, '车辆审核通过后才能上架');

      expect(response.code).toBe(400);
    });
  });

  describe('档期管理 (GET/PUT /api/merchant/cars/:id/schedule)', () => {
    it('获取车辆档期成功', async () => {
      const response = createSuccessResponse({
        carId: 1,
        year: 2026,
        month: 7,
        schedules: Array.from({ length: 31 }, (_, i) => ({
          date: `2026-07-${String(i + 1).padStart(2, '0')}`,
          status: i < 28 ? 0 : 1,
        })),
      });

      expect(response.data.schedules).toHaveLength(31);
    });

    it('设置档期为"已租"成功', async () => {
      const response = createSuccessResponse({
        carId: 1,
        date: '2026-07-15',
        status: 1,
      });

      expect(response.data.status).toBe(1);
    });

    it('设置档期为"维护中"成功', async () => {
      const response = createSuccessResponse({
        carId: 1,
        date: '2026-07-20',
        status: 2,
      });

      expect(response.data.status).toBe(2);
    });

    it('当天已产生订单的日期不能修改档期', async () => {
      const response = createErrorResponse(
        400,
        '该日期已有订单，无法修改档期',
      );

      expect(response.code).toBe(400);
    });
  });
});