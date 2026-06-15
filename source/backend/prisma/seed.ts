import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 开始填充种子数据...');

  // Admin
  const adminPassword = await bcrypt.hash('admin123', 10);
  await prisma.admin.create({
    data: {
      username: 'admin',
      passwordHash: adminPassword,
      realName: '超级管理员',
      phone: '13800000000',
      role: 'super_admin',
    },
  });
  console.log('✅ 创建管理员: admin / admin123');

  // Users
  const userPassword = await bcrypt.hash('123456', 10);
  const users = [];
  for (let i = 0; i < 5; i++) {
    const user = await prisma.user.create({
      data: {
        phone: `1380000000${i + 1}`,
        passwordHash: userPassword,
        nickname: `用户${i + 1}`,
      },
    });
    users.push(user);
  }
  console.log('✅ 创建 5 个用户 (密码: 123456)');

  // Merchants
  const merchants = [];
  const shopData = [
    { name: '汉中至尊婚车车队', district: '汉台区', desc: '汉中本土高端婚车服务商，拥有奔驰宝马奥迪等全系车型。' },
    { name: '汉中豪华婚车行', district: '南郑区', desc: '专注婚车租赁10年，服务超1000对新人，品质保证。' },
    { name: '汉中温馨婚车租赁', district: '城固县', desc: '价格透明，服务周到，让您的婚礼更加完美。' },
  ];

  for (let i = 0; i < shopData.length; i++) {
    const merchant = await prisma.merchant.create({
      data: {
        userId: users[i].id,
        shopName: shopData[i].name,
        contacts: `张经理`,
        phone: `1390000000${i + 1}`,
        city: '汉中市',
        district: shopData[i].district,
        address: `${shopData[i].district}中心街XX号`,
        description: shopData[i].desc,
        authStatus: 1,
        status: 0,
        rating: 4.8 + i * 0.1,
        totalOrders: 50 + i * 20,
        totalRevenue: 100000 + i * 50000,
      },
    });
    merchants.push(merchant);
  }
  console.log('✅ 创建 3 个商家');

  // Cars
  const carData = [
    { brand: '奔驰', model: 'S400L', color: '黑色', seats: 5, halfDay: 1888, fullDay: 3288, fleetPrice: 1500 },
    { brand: '宝马', model: '530Li', color: '白色', seats: 5, halfDay: 1688, fullDay: 2888, fleetPrice: 1200 },
    { brand: '奥迪', model: 'A8L', color: '黑色', seats: 4, halfDay: 1588, fullDay: 2688, fleetPrice: 1100 },
    { brand: '保时捷', model: 'Panamera', color: '红色', seats: 4, halfDay: 2888, fullDay: 4888, fleetPrice: 2500 },
    { brand: '玛莎拉蒂', model: '总裁', color: '白色', seats: 4, halfDay: 3888, fullDay: 6888, fleetPrice: 3000 },
    { brand: '路虎', model: '揽胜', color: '黑色', seats: 5, halfDay: 2588, fullDay: 4588, fleetPrice: 2000 },
    { brand: '红旗', model: 'H9', color: '黑色', seats: 5, halfDay: 1288, fullDay: 2288, fleetPrice: 1000 },
    { brand: '奔驰', model: 'E300L', color: '白色', seats: 5, halfDay: 1388, fullDay: 2388, fleetPrice: 1000 },
    { brand: '宝马', model: 'X5', color: '黑色', seats: 5, halfDay: 1988, fullDay: 3488, fleetPrice: 1600 },
    { brand: '奥迪', model: 'A6L', color: '黑色', seats: 5, halfDay: 1188, fullDay: 2088, fleetPrice: 900 },
  ];

  const cars = [];
  for (let i = 0; i < carData.length; i++) {
    const car = await prisma.car.create({
      data: {
        merchantId: merchants[i % 3].id,
        brand: carData[i].brand,
        model: carData[i].model,
        year: 2023,
        color: carData[i].color,
        seats: carData[i].seats,
        transmission: '自动',
        fuelType: '汽油',
        description: `${carData[i].brand} ${carData[i].model}，外观大气，内饰豪华，是婚车的理想选择。`,
        images: JSON.stringify([`/cars/${carData[i].brand}_${carData[i].model}.jpg`]),
        halfDayPrice: carData[i].halfDay,
        fullDayPrice: carData[i].fullDay,
        fleetPrice: carData[i].fleetPrice,
        deposit: 500,
        status: 0,
        totalOrders: 30 + i * 5,
        rating: 4.5 + (i % 5) * 0.1,
        sortOrder: i,
      },
    });
    cars.push(car);
  }
  console.log('✅ 创建 10 辆车');

  // Fleet packages
  await prisma.fleetPackage.create({
    data: {
      merchantId: merchants[0].id,
      name: '豪华奔驰车队',
      mainCarId: cars[0].id,
      followCarModel: '奔驰E300L',
      followCarCount: 3,
      halfDayPrice: 6666,
      fullDayPrice: 9999,
      description: '奔驰S400L主婚车 + 3辆奔驰E300L跟车，彰显豪华气场。',
    },
  });
  console.log('✅ 创建 1 个车队套餐');

  // Banners
  const banners = [
    { title: '夏季婚车特惠', imageUrl: '/banners/summer.jpg', linkUrl: '/cars', sortOrder: 1 },
    { title: '新人专享优惠', imageUrl: '/banners/new.jpg', linkUrl: '/cars', sortOrder: 2 },
    { title: '豪华车队推荐', imageUrl: '/banners/fleet.jpg', linkUrl: '/cars?type=fleet', sortOrder: 3 },
  ];
  for (const banner of banners) {
    await prisma.banner.create({ data: banner });
  }
  console.log('✅ 创建 3 个 Banner');

  // Coupons
  const coupon = await prisma.coupon.create({
    data: {
      name: '新人专享100元券',
      type: 'fixed',
      value: 100,
      minAmount: 1000,
      totalCount: 100,
      startDate: new Date(),
      endDate: new Date('2026-12-31'),
    },
  });
  console.log('✅ 创建 1 张优惠券');
  console.log('🎉 种子数据填充完成！');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });