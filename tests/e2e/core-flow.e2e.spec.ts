/**
 * 🔄 核心流程 E2E 测试
 *
 * 覆盖三个核心用户旅程：
 * 1. 浏览 → 搜索 → 详情 → 收藏
 * 2. 下单 → 支付 → 查看订单
 * 3. 商家接单 → 完成服务 → 评价
 */
import { test, expect } from '@playwright/test';

// ========================================
// 流程1：用户浏览与收藏
// ========================================
test.describe('🔄 流程1：用户浏览与收藏', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('首页 → 列表页 → 详情页 → 收藏', async ({ page }) => {
    // 1. 首页加载
    await expect(page).toHaveTitle(/良缘锦程/);
    await expect(page.locator('.banner')).toBeVisible();

    // 2. 点击"婚车列表"导航
    await page.click('text=婚车列表');
    await expect(page).toHaveURL(/\/cars/);

    // 3. 查看车辆列表
    await expect(page.locator('.car-card')).toHaveCount(12);

    // 4. 使用品牌筛选
    await page.click('text=奔驰');
    await page.waitForResponse(/\/api\/cars/);

    // 5. 点击进入详情页
    await page.click('.car-card >> nth=0');
    await expect(page).toHaveURL(/\/car\/\d+/);

    // 6. 查看车辆详情
    await expect(page.locator('.car-info')).toBeVisible();
    await expect(page.locator('.price-section')).toBeVisible();

    // 7. 点击收藏
    await page.click('text=收藏');
    await expect(page.locator('.favorited')).toBeVisible();
  });

  test('搜索 → 筛选 → 排序', async ({ page }) => {
    // 1. 进入列表页
    await page.goto('/cars');
    await expect(page.locator('.filter-bar')).toBeVisible();

    // 2. 按价格筛选
    await page.click('text=¥1000-2000');
    await page.waitForResponse(/\/api\/cars/);

    // 3. 按评分排序
    await page.selectOption('.sort-select', 'rating');
    await page.waitForResponse(/\/api\/cars/);

    // 4. 搜索关键词
    await page.fill('input[placeholder*="搜索"]', '奔驰');
    await page.press('input[placeholder*="搜索"]', 'Enter');
    await page.waitForResponse(/\/api\/cars/);

    // 5. 结果都包含"奔驰"
    const results = page.locator('.car-card');
    const count = await results.count();
    for (let i = 0; i < count; i++) {
      await expect(results.nth(i)).toContainText('奔驰');
    }
  });
});

// ========================================
// 流程2：下单与支付
// ========================================
test.describe('🔄 流程2：下单与支付', () => {
  test('详情页 → 下单 → 支付 → 查看订单', async ({ page }) => {
    // 1. 登录（使用测试账号）
    await page.goto('/login');
    await page.fill('input[name="phone"]', '13800138001');
    await page.fill('input[name="code"]', '666666');
    await page.click('button[type="submit"]');
    await expect(page).toHaveURL('/');

    // 2. 进入车辆详情页
    await page.goto('/car/1');
    await expect(page.locator('.car-detail')).toBeVisible();

    // 3. 选择半天套餐
    await page.click('text=半天套餐');

    // 4. 点击"立即预订"
    await page.click('text=立即预订');
    await expect(page).toHaveURL(/\/order\/create/);

    // 5. 填写订单表单
    await page.fill('input[name="contact_name"]', '张先生');
    await page.fill('input[name="contact_phone"]', '13800138001');
    await page.fill('input[name="pickup_address"]', '汉中市汉台区XX小区');
    await page.fill('input[name="ceremony_address"]', '汉中市汉台区XX酒店');
    await page.fill('textarea[name="remark"]', '需要红色装饰花');

    // 6. 确认费用明细
    await expect(page.locator('.fee-detail')).toBeVisible();
    await expect(page.locator('.total-amount')).toContainText('¥');

    // 7. 提交订单
    await page.click('text=提交订单');

    // 8. 跳转到支付页
    await expect(page).toHaveURL(/\/order\/pay/);
    await expect(page.locator('.payment-qrcode')).toBeVisible();

    // 9. 模拟支付成功
    await page.click('text=支付成功');
    await expect(page).toHaveURL(/\/user\/orders\/\d+/);
    await expect(page.locator('.order-status')).toContainText('待确认');
  });

  test('订单列表中查看已支付订单', async ({ page }) => {
    // 1. 进入我的订单
    await page.goto('/user/orders');

    // 2. 查看待确认订单 Tab
    await page.click('text=待确认');
    await page.waitForResponse(/\/api\/orders/);

    // 3. 点击进入订单详情
    await page.click('.order-card >> nth=0');
    await expect(page).toHaveURL(/\/user\/orders\/\d+/);

    // 4. 查看订单详情信息
    await expect(page.locator('.order-info')).toBeVisible();
    await expect(page.locator('.status-timeline')).toBeVisible();
  });
});

// ========================================
// 流程3：商家接单与评价
// ========================================
test.describe('🔄 流程3：商家接单 → 完成服务 → 评价', () => {
  test('商家登录 → 接单 → 完成服务', async ({ page }) => {
    // 1. 商家登录
    await page.goto('/merchant/login');
    await page.fill('input[name="phone"]', '13900139001');
    await page.fill('input[name="password"]', 'test123456');
    await page.click('button[type="submit"]');
    await expect(page).toHaveURL('/merchant/dashboard');

    // 2. 查看待确认订单
    await expect(page.locator('.pending-count')).toContainText('3');

    // 3. 进入订单管理
    await page.click('text=订单管理');
    await expect(page).toHaveURL('/merchant/orders');

    // 4. 查看待确认订单详情
    await page.click('.order-row >> nth=0');
    await expect(page.locator('.order-detail')).toBeVisible();

    // 5. 确认接单
    await page.click('text=确认接单');
    await expect(page.locator('.success-message')).toContainText('接单成功');

    // 6. 服务完成后标记完成
    await page.click('text=标记完成');
    await expect(page.locator('.success-message')).toContainText('服务已完成');
  });

  test('用户评价 → 商家回复', async ({ page }) => {
    // 1. 用户登录
    await page.goto('/login');
    await page.fill('input[name="phone"]', '13800138001');
    await page.fill('input[name="code"]', '666666');
    await page.click('button[type="submit"]');

    // 2. 进入已完成的订单
    await page.goto('/user/orders');
    await page.click('text=已完成');
    await page.waitForResponse(/\/api\/orders/);

    // 3. 点击"去评价"
    await page.click('text=去评价');
    await expect(page).toHaveURL(/\/review\/create/);

    // 4. 填写评价
    await page.click('.star-rating >> nth=4'); // 5星
    await page.fill('textarea[name="content"]', '车辆很新，准时到达，服务周到！');

    // 5. 提交评价
    await page.click('text=提交评价');
    await expect(page.locator('.success-message')).toContainText('评价成功');

    // 6. 商家登录并回复评价
    await page.goto('/merchant/login');
    await page.fill('input[name="phone"]', '13900139001');
    await page.fill('input[name="password"]', 'test123456');
    await page.click('button[type="submit"]');

    // 7. 进入评价管理
    await page.click('text=评价管理');
    await expect(page).toHaveURL('/merchant/reviews');

    // 8. 回复评价
    await page.click('.review-item >> nth=0');
    await page.fill('textarea[name="reply"]', '感谢您的支持！祝您新婚快乐！');
    await page.click('text=回复');
    await expect(page.locator('.success-message')).toContainText('回复成功');
  });
});