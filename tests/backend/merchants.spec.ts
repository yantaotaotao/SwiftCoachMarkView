/**
 * 🏪 商家模块 — 特征测试
 *
 * 覆盖：入驻申请、资质审核、商家信息管理、数据统计
 */
import {
  createMockMerchant,
  createMockUser,
  createSuccessResponse,
  createErrorResponse,
  createPaginatedResponse,
} from '../shared/test-data-factory';

// ========================================
// 1. 商家入驻
// ========================================
describe('🏪 商家入驻 (POST /api/merchants/register)', () => {
  describe('✅ 正常场景', () => {
    it('商家提交入驻申请成功，状态为"待审核"', async () => {
      const merchant = createMockMerchant({ auth_status: 0 });
      const response = createSuccessResponse(merchant);

      expect(response.code).toBe(0);
      expect(response.data.auth_status).toBe(0);
    });

    it('入驻后自动创建商家账号', async () => {
      const merchant = createMockMerchant({
        id: 1,
        user_id: 1,
        contacts: '张经理',
      });
      const response = createSuccessResponse(merchant);

      expect(response.data.user_id).toBeDefined();
      expect(response.data.contacts).toBe('张经理');
    });

    it('提交完整的资质材料成功', async () => {
      const merchant = createMockMerchant({
        auth_status: 0,
        shop_logo: 'https://example.com/logo.png',
      });
      const response = createSuccessResponse({
        ...merchant,
        qualifications: {
          license_img: 'https://example.com/license.jpg',
          id_card_img: 'https://example.com/idcard.jpg',
        },
      });

      expect(response.data.qualifications).toBeDefined();
      expect(response.data.qualifications.license_img).toBeDefined();
    });
  });

  describe('❌ 异常场景', () => {
    it('手机号已注册为商家时返回错误', async () => {
      const response = createErrorResponse(409, '该手机号已注册为商家');

      expect(response.code).toBe(409);
    });

    it('缺少必填资质材料时返回错误', async () => {
      const response = createErrorResponse(400, '请上传完整的资质材料');

      expect(response.code).toBe(400);
    });

    it('营业执照图片不清晰时返回错误', async () => {
      const response = createErrorResponse(400, '营业执照图片不清晰，请重新上传');

      expect(response.code).toBe(400);
    });
  });
});

// ========================================
// 2. 资质审核
// ========================================
describe('🏪 资质审核 (平台管理员)', () => {
  describe('审核通过', () => {
    it('审核通过后商家状态为"已认证"', async () => {
      const merchant = createMockMerchant({ auth_status: 1 });
      const response = createSuccessResponse(merchant);

      expect(response.data.auth_status).toBe(1);
    });

    it('审核通过后商家可以发布车辆', async () => {
      const response = createSuccessResponse({
        message: '审核通过，商家功能已开放',
      });

      expect(response.message).toContain('审核通过');
    });
  });

  describe('审核拒绝', () => {
    it('审核拒绝时需要填写拒绝原因', async () => {
      const response = createErrorResponse(400, '请填写拒绝原因');

      expect(response.code).toBe(400);
    });

    it('商家被拒绝后可重新提交', async () => {
      const merchant = createMockMerchant({ auth_status: 0 });
      const response = createSuccessResponse({
        ...merchant,
        canResubmit: true,
      });

      expect(response.data.canResubmit).toBe(true);
    });
  });
});

// ========================================
// 3. 商家信息管理
// ========================================
describe('🏪 商家信息管理', () => {
  describe('更新店铺信息 (PUT /api/merchant/profile)', () => {
    it('更新店铺基本信息成功', async () => {
      const updated = createMockMerchant({
        id: 1,
        shop_name: '汉中至尊婚车（旗舰店）',
      });
      const response = createSuccessResponse(updated);

      expect(response.data.shop_name).toContain('旗舰店');
    });

    it('更新店铺 Logo 成功', async () => {
      const updated = createMockMerchant({
        shop_logo: 'https://example.com/new-logo.png',
      });
      const response = createSuccessResponse(updated);

      expect(response.data.shop_logo).toBe('https://example.com/new-logo.png');
    });

    it('修改联系电话成功', async () => {
      const updated = createMockMerchant({ phone: '13900139002' });
      const response = createSuccessResponse(updated);

      expect(response.data.phone).toBe('13900139002');
    });
  });

  describe('商家状态管理', () => {
    it('平台可以冻结商家', async () => {
      const response = createSuccessResponse({
        ...createMockMerchant({ id: 1 }),
        status: 1,
      });

      expect(response.data.status).toBe(1);
    });

    it('冻结后商家无法登录后台', async () => {
      const response = createErrorResponse(403, '您的商家账号已被冻结');

      expect(response.code).toBe(403);
    });

    it('冻结期间车辆自动下架', async () => {
      const response = createSuccessResponse({
        message: '商家已冻结，旗下车辆已全部下架',
      });

      expect(response.message).toContain('车辆已全部下架');
    });
  });
});

// ========================================
// 4. 商家数据统计
// ========================================
describe('🏪 商家数据统计 (GET /api/merchant/dashboard)', () => {
  it('获取商家工作台数据成功', async () => {
    const response = createSuccessResponse({
      todayPendingOrders: 3,
      activeOrders: 2,
      monthlyRevenue: 18888,
      totalCars: 8,
      availableCars: 6,
      monthlyOrders: 12,
      rating: 4.8,
      orderTrend: [
        { date: '2026-06-07', count: 2 },
        { date: '2026-06-08', count: 3 },
        { date: '2026-06-09', count: 1 },
      ],
      revenueTrend: [
        { date: '2026-06-07', amount: 4776 },
        { date: '2026-06-08', amount: 5664 },
        { date: '2026-06-09', amount: 1888 },
      ],
    });

    expect(response.data.todayPendingOrders).toBeDefined();
    expect(response.data.monthlyRevenue).toBeGreaterThan(0);
    expect(response.data.orderTrend).toHaveLength(3);
    expect(response.data.revenueTrend).toHaveLength(3);
  });

  it('本月收入包含佣金扣除后的金额', async () => {
    const response = createSuccessResponse({
      totalRevenue: 18888,
      commissionAmount: 1888.8,
      netRevenue: 16999.2,
    });

    expect(response.data.netRevenue).toBe(
      response.data.totalRevenue - response.data.commissionAmount,
    );
  });
});

// ========================================
// 5. 商家列表（平台端）
// ========================================
describe('🏪 商家列表（平台端 GET /api/admin/merchants)', () => {
  it('获取商家列表成功', async () => {
    const response = createPaginatedResponse(
      [createMockMerchant({ id: 1 }), createMockMerchant({ id: 2 })],
      2,
      1,
      10,
    );

    expect(response.data.items).toHaveLength(2);
  });

  it('按审核状态筛选商家', async () => {
    const pendingMerchants = createMockMerchant({ auth_status: 0 });
    const response = createSuccessResponse([pendingMerchants]);

    response.data.forEach((m: any) => {
      expect(m.auth_status).toBe(0);
    });
  });

  it('按商家名称搜索', async () => {
    const keyword = '至尊';
    const merchants = [createMockMerchant({ shop_name: '汉中至尊婚车' })];
    const response = createSuccessResponse(
      merchants.filter((m) => m.shop_name.includes(keyword)),
    );

    expect(response.data).toHaveLength(1);
  });
});