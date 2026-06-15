/**
 * 后端测试全局配置
 */

// 设置测试环境变量
process.env.NODE_ENV = 'test';
process.env.JWT_SECRET = 'test-jwt-secret-for-testing';
process.env.JWT_EXPIRES_IN = '1h';
process.env.DATABASE_URL = 'mysql://test:test@localhost:3306/liangyuan_jincheng_test';

// 设置时区
process.env.TZ = 'Asia/Shanghai';

// 全局 mock 控制台输出
global.console = {
  ...console,
  log: jest.fn(),
  debug: jest.fn(),
  info: jest.fn(),
  warn: jest.fn(),
  error: jest.fn(),
};

// 全局测试超时
jest.setTimeout(30000);