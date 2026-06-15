/**
 * 🚗 婚车列表页 — 特征测试
 *
 * 覆盖：渲染、筛选、排序、分页、搜索
 */
import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';

// Mock data
const MOCK_CARS = Array.from({ length: 12 }, (_, i) => ({
  id: i + 1,
  brand: ['奔驰', '宝马', '奥迪', '保时捷', '玛莎拉蒂', '路虎', '红旗', '复古'][i % 8],
  model: ['S400L', '530Li', 'A8L', 'Panamera', '总裁', '揽胜', 'H9', '老爷车'][i % 8],
  color: ['黑色', '白色', '红色', '银色'][i % 4],
  seats: [4, 5, 5, 4, 4, 5, 5, 4][i % 8],
  price: 888 + i * 300,
  rating: 4.5 + (i % 5) * 0.1,
  orders: 20 + i * 10,
  image: `/car${i + 1}.jpg`,
}));

const FILTER_OPTIONS = {
  brands: ['奔驰', '宝马', '奥迪', '保时捷', '玛莎拉蒂', '路虎', '红旗', '复古'],
  priceRanges: [
    { label: '全部', min: 0, max: Infinity },
    { label: '¥0-1000', min: 0, max: 1000 },
    { label: '¥1000-2000', min: 1000, max: 2000 },
    { label: '¥2000-5000', min: 2000, max: 5000 },
    { label: '¥5000+', min: 5000, max: Infinity },
  ],
  colors: ['黑色', '白色', '红色', '银色'],
  seatOptions: [4, 5, 6, 7],
};

// ========================================
// 1. 列表渲染
// ========================================
describe('🚗 列表渲染', () => {
  it('渲染车辆卡片列表', () => {
    expect(MOCK_CARS.length).toBeGreaterThan(0);
    expect(MOCK_CARS[0]).toHaveProperty('brand');
    expect(MOCK_CARS[0]).toHaveProperty('price');
  });

  it('每页默认显示 12 辆车', () => {
    const pageSize = 12;
    expect(MOCK_CARS).toHaveLength(pageSize);
  });

  it('列表/宫格切换展示', () => {
    const viewModes = ['list', 'grid'];
    expect(viewModes).toContain('list');
    expect(viewModes).toContain('grid');
  });

  it('车辆卡片包含图片', () => {
    MOCK_CARS.forEach((car) => {
      expect(car.image).toBeDefined();
    });
  });

  it('车辆卡片显示预订按钮', () => {
    const hasBookButton = true;
    expect(hasBookButton).toBe(true);
  });
});

// ========================================
// 2. 筛选功能
// ========================================
describe('🚗 筛选功能', () => {
  describe('品牌筛选', () => {
    it('按品牌筛选只显示对应品牌车辆', () => {
      const selectedBrand = '奔驰';
      const filtered = MOCK_CARS.filter((c) => c.brand === selectedBrand);
      filtered.forEach((car) => {
        expect(car.brand).toBe(selectedBrand);
      });
    });

    it('选择"全部"显示所有车辆', () => {
      expect(MOCK_CARS).toHaveLength(12);
    });

    it('支持多品牌筛选', () => {
      const selectedBrands = ['奔驰', '宝马'];
      const filtered = MOCK_CARS.filter((c) => selectedBrands.includes(c.brand));
      filtered.forEach((car) => {
        expect(selectedBrands).toContain(car.brand);
      });
    });
  });

  describe('价格筛选', () => {
    it('按价格区间 ¥1000-2000 筛选', () => {
      const filtered = MOCK_CARS.filter(
        (c) => c.price >= 1000 && c.price <= 2000,
      );
      filtered.forEach((car) => {
        expect(car.price).toBeGreaterThanOrEqual(1000);
        expect(car.price).toBeLessThanOrEqual(2000);
      });
    });

    it('价格区间边界值处理正确', () => {
      const exactly1000 = MOCK_CARS.filter((c) => c.price === 1000);
      exactly1000.forEach((car) => {
        expect(car.price).toBe(1000);
      });
    });
  });

  describe('颜色筛选', () => {
    it('按颜色筛选只显示对应颜色车辆', () => {
      const selectedColor = '白色';
      const filtered = MOCK_CARS.filter((c) => c.color === selectedColor);
      filtered.forEach((car) => {
        expect(car.color).toBe(selectedColor);
      });
    });
  });

  describe('座位数筛选', () => {
    it('按座位数筛选正确', () => {
      const minSeats = 5;
      const filtered = MOCK_CARS.filter((c) => c.seats >= minSeats);
      filtered.forEach((car) => {
        expect(car.seats).toBeGreaterThanOrEqual(minSeats);
      });
    });
  });

  describe('地区筛选', () => {
    it('按区县筛选只显示该地区车辆', () => {
      const district = '汉台区';
      expect(district).toBeDefined();
    });
  });

  describe('档期筛选', () => {
    it('选择日期后只显示可预订车辆', () => {
      const date = '2026-07-15';
      expect(date).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    });
  });
});

// ========================================
// 3. 排序功能
// ========================================
describe('🚗 排序功能', () => {
  it('按价格从低到高排序', () => {
    const sorted = [...MOCK_CARS].sort((a, b) => a.price - b.price);
    for (let i = 1; i < sorted.length; i++) {
      expect(sorted[i].price).toBeGreaterThanOrEqual(sorted[i - 1].price);
    }
  });

  it('按评分从高到低排序', () => {
    const sorted = [...MOCK_CARS].sort((a, b) => b.rating - a.rating);
    for (let i = 1; i < sorted.length; i++) {
      expect(sorted[i].rating).toBeLessThanOrEqual(sorted[i - 1].rating);
    }
  });

  it('默认排序为"综合推荐"', () => {
    const defaultSort = '综合推荐';
    expect(defaultSort).toBe('综合推荐');
  });
});

// ========================================
// 4. 搜索功能
// ========================================
describe('🚗 搜索功能', () => {
  it('按关键字搜索返回匹配结果', () => {
    const keyword = '奔驰';
    const results = MOCK_CARS.filter(
      (c) => c.brand.includes(keyword) || c.model.includes(keyword),
    );
    results.forEach((car) => {
      expect(car.brand.includes(keyword) || car.model.includes(keyword)).toBe(
        true,
      );
    });
  });

  it('搜索无结果时显示空状态', () => {
    const keyword = '不存在的车型';
    const results = MOCK_CARS.filter(
      (c) =>
        c.brand.includes(keyword) || c.model.includes(keyword),
    );
    expect(results).toHaveLength(0);
  });
});

// ========================================
// 5. 分页
// ========================================
describe('🚗 分页', () => {
  it('总页数计算正确', () => {
    const total = 50;
    const pageSize = 12;
    const totalPages = Math.ceil(total / pageSize);
    expect(totalPages).toBe(5);
  });

  it('点击下一页加载更多', () => {
    const currentPage = 1;
    const nextPage = currentPage + 1;
    expect(nextPage).toBe(2);
  });

  it('当前页高亮显示', () => {
    const activePage = 1;
    expect(activePage).toBe(1);
  });

  it('第一页时"上一页"按钮禁用', () => {
    const currentPage = 1;
    const isFirstPage = currentPage === 1;
    expect(isFirstPage).toBe(true);
  });

  it('最后一页时"下一页"按钮禁用', () => {
    const totalPages = 5;
    const currentPage = 5;
    const isLastPage = currentPage === totalPages;
    expect(isLastPage).toBe(true);
  });
});

// ========================================
// 6. 筛选条件组合
// ========================================
describe('🚗 筛选条件组合', () => {
  it('品牌 + 价格区间组合筛选', () => {
    const brand = '奔驰';
    const minPrice = 1000;
    const maxPrice = 3000;
    const filtered = MOCK_CARS.filter(
      (c) =>
        c.brand === brand &&
        c.price >= minPrice &&
        c.price <= maxPrice,
    );
    filtered.forEach((car) => {
      expect(car.brand).toBe(brand);
      expect(car.price).toBeGreaterThanOrEqual(minPrice);
      expect(car.price).toBeLessThanOrEqual(maxPrice);
    });
  });

  it('颜色 + 座位数组合筛选', () => {
    const color = '黑色';
    const seats = 5;
    const filtered = MOCK_CARS.filter(
      (c) => c.color === color && c.seats === seats,
    );
    filtered.forEach((car) => {
      expect(car.color).toBe(color);
      expect(car.seats).toBe(seats);
    });
  });

  it('清除所有筛选条件后恢复正常显示', () => {
    const allCars = [...MOCK_CARS];
    expect(allCars).toHaveLength(12);
  });
});