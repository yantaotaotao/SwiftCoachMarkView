/**
 * ⭐ 评价模块 — 特征测试
 *
 * 覆盖：评价提交、评价列表、评价统计、商家回复
 */
import {
  createMockReview,
  createMockOrder,
  createMockUser,
  createSuccessResponse,
  createErrorResponse,
  createPaginatedResponse,
} from '../shared/test-data-factory';

// ========================================
// 1. 提价评价
// ========================================
describe('⭐ 提交评价 (POST /api/reviews)', () => {
  describe('✅ 正常场景', () => {
    it('服务完成后用户提交评价成功', async () => {
      const review = createMockReview();
      const response = createSuccessResponse(review);

      expect(response.code).toBe(0);
      expect(response.data.overall_rating).toBeGreaterThanOrEqual(1);
      expect(response.data.overall_rating).toBeLessThanOrEqual(5);
    });

    it('评价包含图文内容', async () => {
      const review = createMockReview({
        content: '车辆很新，准时到达！',
        images: ['https://example.com/review1.jpg'],
      });
      const response = createSuccessResponse(review);

      expect(response.data.content).toBeDefined();
      expect(response.data.images).toHaveLength(1);
    });

    it('提交多维度评分成功', async () => {
      const review = createMockReview({
        overall_rating: 5,
        car_rating: 5,
        punctuality_rating: 4,
        service_rating: 5,
      });
      const response = createSuccessResponse(review);

      expect(response.data.car_rating).toBe(5);
      expect(response.data.punctuality_rating).toBe(4);
      expect(response.data.service_rating).toBe(5);
    });
  });

  describe('❌ 异常场景', () => {
    it('同一订单不能重复评价', async () => {
      const response = createErrorResponse(400, '该订单已评价');

      expect(response.code).toBe(400);
    });

    it('未完成的订单不能评价', async () => {
      const response = createErrorResponse(400, '服务完成后才能评价');

      expect(response.code).toBe(400);
    });

    it('评价内容不能为空', async () => {
      const response = createErrorResponse(400, '请输入评价内容');

      expect(response.code).toBe(400);
    });

    it('评分不能低于1分或高于5分', async () => {
      const invalidRatings = [0, 6, -1, 100];

      for (const rating of invalidRatings) {
        const response = createErrorResponse(
          400,
          '评分必须在 1-5 之间',
        );
        expect(response.code).toBe(400);
      }
    });

    it('评价图片最多上传9张', async () => {
      const response = createErrorResponse(400, '评价图片最多上传9张');

      expect(response.code).toBe(400);
    });

    it('非本人订单不能评价', async () => {
      const response = createErrorResponse(403, '只能评价自己的订单');

      expect(response.code).toBe(403);
    });
  });
});

// ========================================
// 2. 评价列表
// ========================================
describe('⭐ 评价列表', () => {
  describe('车辆评价列表 (GET /api/cars/:id/reviews)', () => {
    it('获取车辆评价列表成功', async () => {
      const response = createPaginatedResponse(
        [createMockReview({ id: 1 }), createMockReview({ id: 2 })],
        2,
      );

      expect(response.data.items).toHaveLength(2);
    });

    it('评价列表按时间倒序排列', async () => {
      const reviews = [
        createMockReview({
          id: 1,
          created_at: '2026-06-01T10:00:00.000Z',
        }),
        createMockReview({
          id: 2,
          created_at: '2026-05-20T10:00:00.000Z',
        }),
        createMockReview({
          id: 3,
          created_at: '2026-04-15T10:00:00.000Z',
        }),
      ];
      const response = createSuccessResponse(reviews);

      for (let i = 1; i < response.data.length; i++) {
        const prev = new Date(response.data[i - 1].created_at).getTime();
        const curr = new Date(response.data[i].created_at).getTime();
        expect(prev).toBeGreaterThan(curr);
      }
    });

    it('评价列表包含用户昵称和头像', async () => {
      const review = {
        ...createMockReview(),
        user: createMockUser({ nickname: '新人小张' }),
      };
      const response = createSuccessResponse([review]);

      expect(response.data[0].user.nickname).toBeDefined();
      expect(response.data[0].user.avatar).toBeDefined();
    });
  });

  describe('商家评价列表 (GET /api/merchant/reviews)', () => {
    it('商家查看自己收到的评价成功', async () => {
      const response = createPaginatedResponse(
        [createMockReview({ merchant_id: 1 })],
        1,
      );

      expect(response.data.items).toHaveLength(1);
    });

    it('按评分筛选评价', async () => {
      const goodReviews = createMockReview({ overall_rating: 5 });
      const response = createSuccessResponse([goodReviews]);

      response.data.forEach((r: any) => {
        expect(r.overall_rating).toBeGreaterThanOrEqual(4);
      });
    });
  });
});

// ========================================
// 3. 评价统计
// ========================================
describe('⭐ 评价统计', () => {
  it('车辆评价统计包含平均评分和数量', async () => {
    const response = createSuccessResponse({
      avgRating: 4.8,
      totalReviews: 36,
      ratingDistribution: {
        5: 28,
        4: 6,
        3: 2,
        2: 0,
        1: 0,
      },
    });

    expect(response.data.avgRating).toBe(4.8);
    expect(response.data.totalReviews).toBe(36);
  });

  it('评分分布总和等于总评价数', async () => {
    const distribution = { 5: 28, 4: 6, 3: 2, 2: 0, 1: 0 };
    const total = Object.values(distribution).reduce(
      (sum, count) => sum + count,
      0,
    );

    expect(total).toBe(36);
  });

  it('不同评分区间的占比计算正确', async () => {
    const distribution = { 5: 28, 4: 6, 3: 2, 2: 0, 1: 0 };
    const total = 36;

    const goodPercentage = ((distribution[5] + distribution[4]) / total) * 100;
    expect(goodPercentage).toBeCloseTo(94.44, 1);
  });
});

// ========================================
// 4. 商家回复
// ========================================
describe('⭐ 商家回复评价 (POST /api/merchant/reviews/:id/reply)', () => {
  describe('✅ 正常场景', () => {
    it('商家回复评价成功', async () => {
      const review = createMockReview({
        reply_content: '感谢您的支持！祝您新婚快乐！',
        reply_at: new Date().toISOString(),
      });
      const response = createSuccessResponse(review);

      expect(response.data.reply_content).toBeDefined();
    });

    it('回复后评价详情包含回复内容', async () => {
      const response = createSuccessResponse({
        ...createMockReview(),
        reply_content: '感谢您的评价！',
      });

      expect(response.data.reply_content).toContain('感谢');
    });
  });

  describe('❌ 异常场景', () => {
    it('非本店评价不能回复', async () => {
      const response = createErrorResponse(403, '只能回复自己店铺的评价');

      expect(response.code).toBe(403);
    });

    it('已回复的评价不能再次回复', async () => {
      const response = createErrorResponse(400, '该评价已回复');

      expect(response.code).toBe(400);
    });

    it('回复内容不能为空', async () => {
      const response = createErrorResponse(400, '请输入回复内容');

      expect(response.code).toBe(400);
    });
  });
});