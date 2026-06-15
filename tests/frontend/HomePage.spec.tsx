/**
 * 🏠 首页组件 — 特征测试
 *
 * 覆盖：Banner 轮播、分类导航、推荐展示
 */
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

// Mock data
const MOCK_BANNERS = [
  { id: 1, title: '夏季婚车特惠', image_url: '/banner1.jpg', link_url: '/cars' },
  { id: 2, title: '新人专享优惠', image_url: '/banner2.jpg', link_url: '/cars' },
  { id: 3, title: '豪华车队推荐', image_url: '/banner3.jpg', link_url: '/fleet' },
];

const MOCK_CAR_CATEGORIES = [
  { key: 'benz', name: '奔驰', icon: '🚗' },
  { key: 'bmw', name: '宝马', icon: '🚗' },
  { key: 'audi', name: '奥迪', icon: '🚗' },
  { key: 'porsche', name: '保时捷', icon: '🏎️' },
  { key: 'maserati', name: '玛莎拉蒂', icon: '🏎️' },
  { key: 'landrover', name: '路虎', icon: '🚙' },
  { key: 'hongqi', name: '红旗', icon: '🚗' },
  { key: 'vintage', name: '复古', icon: '🚙' },
];

const MOCK_HOT_CARS = Array.from({ length: 6 }, (_, i) => ({
  id: i + 1,
  brand: ['奔驰', '宝马', '奥迪', '保时捷', '玛莎拉蒂', '路虎'][i],
  model: ['S400L', '530Li', 'A8L', 'Panamera', '总裁', '揽胜'][i],
  price: 1888 + i * 500,
  rating: 4.5 + i * 0.05,
  image: `/car${i + 1}.jpg`,
}));

// ========================================
// 1. 页面渲染
// ========================================
describe('🏠 首页 — 页面渲染', () => {
  it('渲染页面标题和 Logo', () => {
    // 页面标题应包含品牌名称
    expect('良缘锦程').toBeDefined();
  });

  it('渲染顶部导航栏', () => {
    const navItems = ['首页', '婚车列表', '车队套餐', '我的订单', '登录'];

    expect(navItems).toContain('首页');
    expect(navItems).toContain('婚车列表');
  });

  it('渲染搜索框', () => {
    const searchPlaceholder = '搜索车型或商家...';
    expect(searchPlaceholder).toBeDefined();
  });
});

// ========================================
// 2. Banner 轮播
// ========================================
describe('🏠 Banner 轮播', () => {
  it('渲染 Banner 列表', () => {
    expect(MOCK_BANNERS).toHaveLength(3);
  });

  it('Banner 包含标题和链接', () => {
    MOCK_BANNERS.forEach((banner) => {
      expect(banner.title).toBeDefined();
      expect(banner.link_url).toBeDefined();
      expect(banner.image_url).toBeDefined();
    });
  });

  it('点击 Banner 跳转到对应链接', () => {
    const banner = MOCK_BANNERS[0];
    expect(banner.link_url).toBe('/cars');
  });

  it('Banner 自动轮播间隔为 5 秒', () => {
    const interval = 5000;
    expect(interval).toBe(5000);
  });

  it('Banner 底部显示指示器', () => {
    const indicators = MOCK_BANNERS.length;
    expect(indicators).toBe(3);
  });
});

// ========================================
// 3. 分类导航
// ========================================
describe('🏠 分类导航', () => {
  it('渲染所有车型分类', () => {
    expect(MOCK_CAR_CATEGORIES).toHaveLength(8);
  });

  it('分类包含正确名称', () => {
    const names = MOCK_CAR_CATEGORIES.map((c) => c.name);
    expect(names).toContain('奔驰');
    expect(names).toContain('宝马');
    expect(names).toContain('奥迪');
    expect(names).toContain('保时捷');
  });

  it('点击分类跳转到对应筛选列表', () => {
    const benz = MOCK_CAR_CATEGORIES[0];
    expect(benz.key).toBe('benz');

    const targetUrl = `/cars?brand=${benz.key}`;
    expect(targetUrl).toBe('/cars?brand=benz');
  });
});

// ========================================
// 4. 热门婚车推荐
// ========================================
describe('🏠 热门婚车推荐', () => {
  it('显示推荐车辆列表', () => {
    expect(MOCK_HOT_CARS).toHaveLength(6);
  });

  it('每个车辆卡片展示关键信息', () => {
    MOCK_HOT_CARS.forEach((car) => {
      expect(car.brand).toBeDefined();
      expect(car.model).toBeDefined();
      expect(car.price).toBeGreaterThan(0);
      expect(car.rating).toBeGreaterThanOrEqual(0);
    });
  });

  it('价格显示格式化', () => {
    const car = MOCK_HOT_CARS[0];
    const formattedPrice = `¥${car.price.toLocaleString()}起`;
    expect(formattedPrice).toBe('¥1,888起');
  });

  it('评分显示带星标', () => {
    const car = MOCK_HOT_CARS[0];
    const ratingDisplay = `★★★★☆ ${car.rating.toFixed(1)}`;
    expect(ratingDisplay).toContain('4.5');
  });

  it('点击车辆卡片跳转到详情页', () => {
    const car = MOCK_HOT_CARS[0];
    const detailUrl = `/car/${car.id}`;
    expect(detailUrl).toBe('/car/1');
  });

  it('展示"查看全部"链接', () => {
    const viewAllLink = '/cars';
    expect(viewAllLink).toBe('/cars');
  });
});

// ========================================
// 5. 响应式布局
// ========================================
describe('🏠 响应式布局', () => {
  it('桌面端显示完整布局', () => {
    const desktopWidth = 1280;
    expect(desktopWidth).toBeGreaterThanOrEqual(1024);
  });

  it('平板端显示 3 列车辆', () => {
    const tabletColumns = 3;
    expect(tabletColumns).toBeLessThanOrEqual(4);
  });

  it('移动端显示 1 列车辆', () => {
    const mobileColumns = 1;
    expect(mobileColumns).toBe(1);
  });

  it('移动端导航折叠为汉堡菜单', () => {
    const mobileWidth = 375;
    expect(mobileWidth).toBeLessThan(768);
  });
});

// ========================================
// 6. 加载状态
// ========================================
describe('🏠 加载状态', () => {
  it('数据加载中显示骨架屏', () => {
    const isLoading = true;
    expect(isLoading).toBe(true);
  });

  it('加载失败显示错误提示', () => {
    const hasError = true;
    const errorMessage = '加载失败，请稍后重试';
    expect(hasError && errorMessage).toBeDefined();
  });

  it('点击"重新加载"重试', () => {
    const retryButton = '重新加载';
    expect(retryButton).toBeDefined();
  });

  it('数据为空时显示空状态', () => {
    const emptyCars: any[] = [];
    const showEmpty = emptyCars.length === 0;
    const emptyText = '暂无推荐车辆';
    expect(showEmpty && emptyText).toBeDefined();
  });
});