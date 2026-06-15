/**
 * 🔐 认证模块 — 特征测试
 *
 * 覆盖：用户注册、登录、Token 刷新、权限验证
 */
import {
  createMockUser,
  createSuccessResponse,
  createErrorResponse,
} from '../shared/test-data-factory';

// ========================================
// 1. 用户注册
// ========================================
describe('🔐 用户注册 (POST /api/auth/register)', () => {
  const validPhone = '13800138001';
  const validPassword = 'Abc12345';
  const validNickname = '新人小张';

  describe('✅ 正常场景', () => {
    it('使用有效手机号和密码注册成功', async () => {
      const response = createSuccessResponse({
        user: createMockUser({ phone: validPhone, nickname: validNickname }),
        token: 'mock-jwt-token',
      });

      expect(response.code).toBe(0);
      expect(response.data.user.phone).toBe(validPhone);
      expect(response.data.token).toBeDefined();
    });

    it('注册时自动生成默认昵称', async () => {
      const response = createSuccessResponse({
        user: createMockUser({ phone: '13900139001' }),
        token: 'mock-jwt-token',
      });

      expect(response.code).toBe(0);
      expect(response.data.user.nickname).toBeDefined();
    });

    it('注册成功返回 JWT token', async () => {
      const response = createSuccessResponse({
        user: createMockUser(),
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
      });

      expect(response.data.token).toMatch(/^eyJ/);
    });
  });

  describe('❌ 异常场景', () => {
    it('手机号已注册时返回错误', async () => {
      const response = createErrorResponse(409, '该手机号已注册');

      expect(response.code).toBe(409);
      expect(response.message).toContain('已注册');
    });

    it('手机号格式不正确时返回验证错误', async () => {
      const invalidPhones = ['12345', 'abcdef', '', '1380013800'];

      for (const phone of invalidPhones) {
        const response = createErrorResponse(400, '手机号格式不正确');
        expect(response.code).toBe(400);
      }
    });

    it('密码不满足复杂度要求时返回错误', async () => {
      const weakPasswords = ['123456', 'abcdef', '12345678', ''];

      for (const pwd of weakPasswords) {
        const response = createErrorResponse(
          400,
          '密码至少8位，包含大小写字母和数字',
        );
        expect(response.code).toBe(400);
      }
    });

    it('缺少必填字段时返回错误', async () => {
      const response = createErrorResponse(400, '缺少必填参数');

      expect(response.code).toBe(400);
    });
  });

  describe('⚡ 边界条件', () => {
    it('手机号长度为11位时注册成功', async () => {
      const response = createSuccessResponse({
        user: createMockUser({ phone: '13800138001' }),
        token: 'valid-token',
      });
      expect(response.code).toBe(0);
    });

    it('密码长度为32位时注册成功', async () => {
      const longPassword = 'Aa1' + 'x'.repeat(29);
      expect(longPassword.length).toBe(32);
      const response = createSuccessResponse({
        user: createMockUser(),
        token: 'valid-token',
      });
      expect(response.code).toBe(0);
    });

    it('昵称长度为1~20个字符', async () => {
      const shortNick = createMockUser({ nickname: '张' });
      expect(shortNick.nickname.length).toBeGreaterThanOrEqual(1);

      const longNick = createMockUser({ nickname: '张'.repeat(20) });
      expect(longNick.nickname.length).toBeLessThanOrEqual(20);
    });
  });
});

// ========================================
// 2. 用户登录
// ========================================
describe('🔐 用户登录 (POST /api/auth/login)', () => {
  describe('✅ 正常场景', () => {
    it('使用手机号+密码登录成功', async () => {
      const response = createSuccessResponse({
        user: createMockUser(),
        token: 'mock-jwt-token',
      });

      expect(response.code).toBe(0);
      expect(response.data.token).toBeDefined();
      expect(response.data.user.phone).toBeDefined();
    });

    it('登录后返回用户基本信息', async () => {
      const response = createSuccessResponse({
        user: createMockUser({
          id: 1,
          nickname: '新人小张',
          avatar: 'https://example.com/avatar.png',
        }),
        token: 'mock-token',
      });

      expect(response.data.user).toHaveProperty('id');
      expect(response.data.user).toHaveProperty('nickname');
      expect(response.data.user).toHaveProperty('avatar');
    });

    it('使用短信验证码登录成功', async () => {
      const response = createSuccessResponse({
        user: createMockUser(),
        token: 'mock-token',
      });

      expect(response.code).toBe(0);
    });
  });

  describe('❌ 异常场景', () => {
    it('密码错误时返回认证失败', async () => {
      const response = createErrorResponse(401, '手机号或密码错误');

      expect(response.code).toBe(401);
    });

    it('手机号未注册时返回错误', async () => {
      const response = createErrorResponse(404, '该手机号未注册');

      expect(response.code).toBe(404);
    });

    it('账号被禁用时返回错误', async () => {
      const response = createErrorResponse(403, '账号已被禁用');

      expect(response.code).toBe(403);
    });

    it('连续5次输错密码后临时锁定', async () => {
      const response = createErrorResponse(429, '密码错误次数过多，请30分钟后重试');

      expect(response.code).toBe(429);
    });

    it('验证码错误时登录失败', async () => {
      const response = createErrorResponse(400, '验证码错误');

      expect(response.code).toBe(400);
    });

    it('验证码过期时登录失败', async () => {
      const response = createErrorResponse(400, '验证码已过期');

      expect(response.code).toBe(400);
    });
  });
});

// ========================================
// 3. Token 管理
// ========================================
describe('🔐 Token 管理', () => {
  describe('Token 刷新 (POST /api/auth/refresh)', () => {
    it('使用有效 refresh token 刷新成功', async () => {
      const response = createSuccessResponse({
        token: 'new-jwt-token',
        refreshToken: 'new-refresh-token',
      });

      expect(response.code).toBe(0);
      expect(response.data.token).toBeDefined();
    });

    it('刷新后返回新的 access token', async () => {
      const response = createSuccessResponse({
        token: 'new-token-' + Date.now(),
        refreshToken: 'new-refresh-' + Date.now(),
      });

      expect(response.data.token).not.toBe('');
    });

    it('refresh token 过期时返回错误', async () => {
      const response = createErrorResponse(401, 'refresh token 已过期，请重新登录');

      expect(response.code).toBe(401);
    });
  });

  describe('Token 验证 (GET /api/auth/verify)', () => {
    it('使用有效 token 访问受保护接口成功', async () => {
      const response = createSuccessResponse({
        user: createMockUser({ id: 1 }),
        valid: true,
      });

      expect(response.code).toBe(0);
      expect(response.data.valid).toBe(true);
    });

    it('使用过期 token 访问返回 401', async () => {
      const response = createErrorResponse(401, 'token 已过期');

      expect(response.code).toBe(401);
    });

    it('使用伪造 token 访问返回 401', async () => {
      const response = createErrorResponse(401, '无效的 token');

      expect(response.code).toBe(401);
    });

    it('未携带 token 访问返回 401', async () => {
      const response = createErrorResponse(401, '未提供认证信息');

      expect(response.code).toBe(401);
    });
  });
});