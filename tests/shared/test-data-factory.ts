/**
 * 良缘锦程 — 测试数据工厂
 * 
 * 用于创建测试所需的模拟数据
 */

// ============ 用户相关 ============

export interface MockUser {
  id: number;
  phone: string;
  nickname: string;
  avatar: string;
  status: number;
  token?: string;
}

export function createMockUser(overrides?: Partial<MockUser>): MockUser {
  return {
    id: 1,
    phone: '13800138001',
    nickname: '测试用户',
    avatar: 'https://example.com/avatar.png',
    status: 0,
    ...overrides,
  };
}

export function createMockUserList(count: number = 10): MockUser[] {
  return Array.from({ length: count }, (_, i) =>
    createMockUser({
      id: i + 1,
      phone: `138001380${String(i + 1).padStart(2, '0')}`,
      nickname: `用户${i + 1}`,
    })
  );
}

// ============ 商家相关 ============

export interface MockMerchant {
  id: number;
  user_id: number;
  shop_name: string;
  shop_logo: string;
  contacts: string;
  phone: string;
  province: string;
  city: string;
  district: string;
  address: string;
  description: string;
  commission_rate: number;
  auth_status: number;
  status: number;
  total_orders: number;
  total_revenue: number;
  rating: number;
}

export function createMockMerchant(overrides?: Partial<MockMerchant>): MockMerchant {
  return {
    id: 1,
    user_id: 1,
    shop_name: '汉中至尊婚车车队',
    shop_logo: 'https://example.com/shop_logo.png',
    contacts: '张经理',
    phone: '13900139001',
    province: '陕西省',
    city: '汉中市',
    district: '汉台区',
    address: '滨江路88号',
    description: '汉中本地专业婚车服务，车型齐全，服务周到',
    commission_rate: 10.00,
    auth_status: 1,
    status: 0,
    total_orders: 128,
    total_revenue: 256000.00,
    rating: 4.8,
    ...overrides,
  };
}

export function createMockMerchantList(count: number = 5): MockMerchant[] {
  const districts = ['汉台区', '南郑区', '城固县', '洋县', '勉县'];
  return Array.from({ length: count }, (_, i) =>
    createMockMerchant({
      id: i + 1,
      user_id: i + 1,
      shop_name: `汉中${['豪华', '至尊', '温馨', '经典', '华丽'][i]}婚车车队`,
      district: districts[i % districts.length],
      rating: 4.5 + Math.random() * 0.5,
    })
  );
}

// ============ 车辆相关 ============

export type CarStatus = 0 | 1 | 2; // 0:上架 1:下架 2:待审核
export type ServiceType = 'half_day' | 'full_day' | 'fleet';

export interface MockCar {
  id: number;
  merchant_id: number;
  brand: string;
  model: string;
  year: number;
  color: string;
  seats: number;
  transmission: string;
  fuel_type: string;
  description: string;
  images: string[];
  half_day_price: number;
  full_day_price: number;
  fleet_price: number;
  deposit: number;
  decoration_fee: number;
  status: CarStatus;
  total_orders: number;
  rating: number;
}

export function createMockCar(overrides?: Partial<MockCar>): MockCar {
  return {
    id: 1,
    merchant_id: 1,
    brand: '奔驰',
    model: 'S400L',
    year: 2023,
    color: '黑色',
    seats: 5,
    transmission: '自动',
    fuel_type: '汽油',
    description: '2023款奔驰S400L，豪华商务座驾，适合做主婚车',
    images: [
      'https://example.com/car1_01.jpg',
      'https://example.com/car1_02.jpg',
      'https://example.com/car1_03.jpg',
    ],
    half_day_price: 1888.00,
    full_day_price: 3288.00,
    fleet_price: 1688.00,
    deposit: 500.00,
    decoration_fee: 200.00,
    status: 0,
    total_orders: 128,
    rating: 4.8,
    ...overrides,
  };
}

export const MOCK_CAR_BRANDS = ['奔驰', '宝马', '奥迪', '保时捷', '玛莎拉蒂', '路虎', '红旗', '复古'];
export const MOCK_CAR_COLORS = ['黑色', '白色', '红色', '银色'];
export const MOCK_CAR_SEATS = [4, 5, 6, 7];

export const MOCK_CAR_MODELS: Record<string, string[]> = {
  '奔驰': ['S400L', 'S450L', 'E300L', 'GLE450'],
  '宝马': ['750Li', '740Li', '530Li', 'X5'],
  '奥迪': ['A8L', 'A6L', 'Q7'],
  '保时捷': ['Panamera', 'Cayenne', '911'],
  '玛莎拉蒂': ['总裁', 'Levante', 'Ghibli'],
  '路虎': ['揽胜', '发现5', '星脉'],
  '红旗': ['H9', 'HS7', 'E-HS9'],
  '复古': ['老爷车', '甲壳虫', 'MINI'],
};

export function createMockCarList(count: number = 12, merchantId: number = 1): MockCar[] {
  const cars: MockCar[] = [];
  for (let i = 0; i < count; i++) {
    const brand = MOCK_CAR_BRANDS[i % MOCK_CAR_BRANDS.length];
    const models = MOCK_CAR_MODELS[brand];
    const model = models[i % models.length];
    cars.push(
      createMockCar({
        id: i + 1,
        merchant_id: merchantId,
        brand,
        model,
        year: 2020 + (i % 5),
        color: MOCK_CAR_COLORS[i % MOCK_CAR_COLORS.length],
        seats: MOCK_CAR_SEATS[i % MOCK_CAR_SEATS.length],
        half_day_price: 888 + i * 200,
        full_day_price: 1688 + i * 300,
        rating: 4.5 + (i % 5) * 0.1,
        total_orders: 20 + i * 10,
      })
    );
  }
  return cars;
}

// ============ 订单相关 ============

export type OrderStatus =
  | 'pending_pay'
  | 'pending_confirm'
  | 'confirmed'
  | 'in_progress'
  | 'completed'
  | 'cancelled'
  | 'refunding'
  | 'refunded';

export interface MockOrder {
  id: number;
  order_no: string;
  user_id: number;
  merchant_id: number;
  car_id: number;
  fleet_package_id: number | null;
  follow_car_count: number;
  service_date: string;
  service_type: ServiceType;
  pickup_time: string;
  pickup_address: string;
  ceremony_address: string;
  contact_name: string;
  contact_phone: string;
  remark: string;
  decoration_required: boolean;
  total_amount: number;
  deposit_amount: number;
  balance_amount: number;
  commission_amount: number;
  pay_amount: number;
  status: OrderStatus;
  created_at: string;
}

const ORDER_STATUS_FLOW: OrderStatus[] = [
  'pending_pay',
  'pending_confirm',
  'confirmed',
  'in_progress',
  'completed',
];

export function createMockOrder(overrides?: Partial<MockOrder>): MockOrder {
  const totalAmount = overrides?.total_amount ?? 2388;
  const depositRate = 0.3;
  return {
    id: 1,
    order_no: `LY${Date.now()}${Math.random().toString(36).slice(2, 8).toUpperCase()}`,
    user_id: 1,
    merchant_id: 1,
    car_id: 1,
    fleet_package_id: null,
    follow_car_count: 0,
    service_date: '2026-07-15',
    service_type: 'half_day',
    pickup_time: '08:00',
    pickup_address: '汉中市汉台区XX小区',
    ceremony_address: '汉中市汉台区XX酒店',
    contact_name: '张先生',
    contact_phone: '13800138001',
    remark: '需要红色装饰花',
    decoration_required: true,
    total_amount: totalAmount,
    deposit_amount: Math.round(totalAmount * depositRate * 100) / 100,
    balance_amount: Math.round(totalAmount * (1 - depositRate) * 100) / 100,
    commission_amount: Math.round(totalAmount * 0.1 * 100) / 100,
    pay_amount: totalAmount,
    status: 'pending_pay',
    created_at: new Date().toISOString(),
    ...overrides,
  };
}

export function createMockOrderList(count: number = 5): MockOrder[] {
  return Array.from({ length: count }, (_, i) => ({
    ...createMockOrder({
      id: i + 1,
      order_no: `LY${Date.now()}${String(i + 1).padStart(4, '0')}`,
      status: ORDER_STATUS_FLOW[Math.min(i, ORDER_STATUS_FLOW.length - 1)] as OrderStatus,
      service_date: new Date(Date.now() + (i + 1) * 86400000).toISOString().split('T')[0],
    }),
  }));
}

// ============ 车队套餐相关 ============

export interface MockFleetPackage {
  id: number;
  merchant_id: number;
  name: string;
  main_car_id: number;
  follow_car_model: string;
  follow_car_count: number;
  half_day_price: number;
  full_day_price: number;
  description: string;
  is_active: boolean;
}

export function createMockFleetPackage(
  overrides?: Partial<MockFleetPackage>,
): MockFleetPackage {
  return {
    id: 1,
    merchant_id: 1,
    name: '豪华奔驰车队',
    main_car_id: 1,
    follow_car_model: '奔驰E300L',
    follow_car_count: 3,
    half_day_price: 6666.00,
    full_day_price: 10888.00,
    description: '奔驰S400L主婚车 + 3辆奔驰E300L跟车，气派非凡',
    is_active: true,
    ...overrides,
  };
}

// ============ 评价相关 ============

export interface MockReview {
  id: number;
  order_id: number;
  user_id: number;
  merchant_id: number;
  car_id: number;
  overall_rating: number;
  car_rating: number;
  punctuality_rating: number;
  service_rating: number;
  content: string;
  images: string[];
  reply_content: string | null;
  created_at: string;
}

export function createMockReview(overrides?: Partial<MockReview>): MockReview {
  return {
    id: 1,
    order_id: 1,
    user_id: 1,
    merchant_id: 1,
    car_id: 1,
    overall_rating: 5,
    car_rating: 5,
    punctuality_rating: 5,
    service_rating: 5,
    content: '车辆很新，准时到达，服务态度非常好！推荐！',
    images: [],
    reply_content: '感谢您的评价，祝您新婚快乐！',
    created_at: '2026-05-20T10:30:00.000Z',
    ...overrides,
  };
}

// ============ API 响应模拟 ============

export interface MockApiResponse<T = any> {
  code: number;
  message: string;
  data: T;
  timestamp: number;
}

export function createSuccessResponse<T>(data: T): MockApiResponse<T> {
  return {
    code: 0,
    message: 'success',
    data,
    timestamp: Date.now(),
  };
}

export function createErrorResponse(
  code: number = 400,
  message: string = '请求失败',
): MockApiResponse<null> {
  return {
    code,
    message,
    data: null,
    timestamp: Date.now(),
  };
}

export function createPaginatedResponse<T>(
  items: T[],
  total: number = items.length,
  page: number = 1,
  pageSize: number = 10,
) {
  return createSuccessResponse({
    items,
    total,
    page,
    pageSize,
    totalPages: Math.ceil(total / pageSize),
  });
}

// ============ 价格计算工具 ============

export function calculateOrderAmount(params: {
  serviceType: ServiceType;
  halfDayPrice: number;
  fullDayPrice: number;
  fleetPrice: number;
  followCarCount?: number;
  decorationFee?: number;
  depositRate?: number;
}): {
  totalAmount: number;
  depositAmount: number;
  balanceAmount: number;
  commissionAmount: number;
} {
  const {
    serviceType,
    halfDayPrice,
    fullDayPrice,
    fleetPrice,
    followCarCount = 0,
    decorationFee = 0,
    depositRate = 0.3,
  } = params;

  let baseAmount: number;
  switch (serviceType) {
    case 'half_day':
      baseAmount = halfDayPrice;
      break;
    case 'full_day':
      baseAmount = fullDayPrice;
      break;
    case 'fleet':
      baseAmount = halfDayPrice + fleetPrice * followCarCount;
      break;
  }

  const totalAmount = baseAmount + decorationFee;
  const depositAmount = Math.round(totalAmount * depositRate * 100) / 100;
  const balanceAmount = totalAmount - depositAmount;
  const commissionAmount = Math.round(totalAmount * 0.1 * 100) / 100;

  return { totalAmount, depositAmount, balanceAmount, commissionAmount };
}