# 🚗 良缘锦程 — 婚车预订平台

> 连接新人与婚车服务商的在线预订平台，聚焦陕西汉中本地市场。

## 技术栈

| 图层 | 技术 |
|------|------|
| 前端框架 | React 18 + TypeScript |
| 构建工具 | Vite |
| UI 组件库 | Ant Design 5.x |
| UI 样式 | Tailwind CSS |
| 状态管理 | Zustand + React Query |
| 路由 | React Router 6 |
| 后端框架 | NestJS |
| ORM | Prisma |
| 数据库 | MySQL 8.0 |
| 认证 | JWT |
| 部署 | Docker + Docker Compose |

## 快速启动

### 本地开发

```bash
# 1. 启动 MySQL（需要 Docker）
docker run -d --name liangyuan-mysql \
  -e MYSQL_ROOT_PASSWORD=password \
  -e MYSQL_DATABASE=liangyuan_jincheng \
  -p 3306:3306 \
  mysql:8.0 --default-authentication-plugin=mysql_native_password

# 2. 初始化后端
cd source/backend
cp .env.example .env  # 修改数据库连接信息
npm install
npx prisma generate
npx prisma migrate dev --name init
npm run prisma:seed
npm run start:dev

# 3. 启动前端
cd source/frontend
npm install
npm run dev
```

### Docker 部署

```bash
docker-compose up -d
```

访问地址：
- 用户前台：http://localhost
- 商家后台：http://localhost/merchant/dashboard
- 管理后台：http://localhost/admin/dashboard
- API 文档：http://localhost:3000/api-docs

## 默认账号

| 角色 | 账号 | 密码 |
|------|------|------|
| 普通用户 | 13800000001 | 123456 |
| 商家 | 1390000001 | （关联用户：13800000001） |
| 管理员 | admin | admin123 |

## 项目结构

```
├── source/
│   ├── backend/          # NestJS 后端
│   │   ├── prisma/       # 数据库 Schema + 种子数据
│   │   └── src/
│   │       ├── common/   # 公共模块（Prisma、JWT、守卫）
│   │       └── modules/  # 业务模块
│   │           ├── auth/       # 认证
│   │           ├── users/      # 用户
│   │           ├── merchants/  # 商家
│   │           ├── cars/       # 车辆
│   │           ├── orders/     # 订单
│   │           ├── payments/   # 支付
│   │           ├── reviews/    # 评价
│   │           ├── coupons/    # 优惠券
│   │           ├── upload/     # 文件上传
│   │           └── admin/      # 管理后台
│   └── frontend/         # React 前端
│       └── src/
│           ├── components/    # 通用组件
│           ├── pages/         # 页面
│           │   ├── home/      # 首页
│           │   ├── cars/      # 车辆列表/详情
│           │   ├── order/     # 下单/支付
│           │   ├── user/      # 用户中心
│           │   ├── merchant/  # 商家后台
│           │   └── admin/     # 管理后台
│           └── services/      # API 服务层
├── docker-compose.yml
└── LIANGYUAN_SPEC.md     # 产品需求文档
```

## 功能概览

### 用户前台
- 首页（Banner、分类导航、热门推荐）
- 车辆列表（筛选、排序、搜索）
- 车辆详情（图片、参数、套餐、日历、评价）
- 在线下单（日期、套餐、跟车配置、费用明细）
- 订单支付
- 用户中心（订单、收藏、个人信息、浏览记录）

### 商家后台
- 工作台（数据概览、待办事项）
- 车辆管理（CRUD、上下架、档期管理）
- 订单管理（接单、拒单、完成服务）
- 财务管理（收入统计、提现申请）
- 店铺管理（信息编辑、资质认证）
- 评价管理（查看、回复）

### 管理后台
- 运营看板（数据统计）
- 用户管理（列表、封禁/解禁）
- 商家管理（审核、冻结、佣金设置）
- 车辆审核
- 订单管理（全平台订单、纠纷处理）
- 财务管理（佣金统计、提现审核）
- Banner管理
- 管理员管理
- 优惠券管理