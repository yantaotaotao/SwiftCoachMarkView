# 🚗 良缘锦程 — 婚车预订平台产品需求规格说明书

> **版本**：v2.0  
> **最后更新**：2026-06-13  
> **目标城市**：陕西省汉中市

---

## 目录

1. [项目概述](#一项目概述)
2. [产品定位](#二产品定位)
3. [功能需求 — Web 用户前台](#三功能需求--web-用户前台)
4. [功能需求 — Web 商家后台](#四功能需求--web-商家后台)
5. [功能需求 — Web 平台管理后台](#五功能需求--web-平台管理后台)
6. [数据库设计](#六数据库设计)
7. [技术栈](#七技术栈)
8. [非功能性需求](#八非功能性需求)
9. [MVP 开发计划](#九mvp-开发计划)
10. [页面路由汇总](#十页面路由汇总)

---

## 一、项目概述

### 1.1 项目背景

搭建一个连接 **新人（用户）** 与 **婚车服务商** 的在线预订平台，聚焦陕西汉中本地市场，为汉中及周边区县新人提供便捷、可靠的婚车租赁服务。

### 1.2 产品名称

**良缘锦程** — 寓意新人的美好姻缘由此开启，前程似锦。

### 1.3 目标用户

| 角色 | 说明 | 访问端 |
|------|------|--------|
| **普通用户（新人）** | 浏览、搜索、预订婚车 | Web 前台 |
| **商家/车队** | 发布婚车、管理订单 | Web 商家后台 |
| **平台管理员** | 审核、运营、数据统计 | Web 管理后台 |

### 1.4 商业模式

- **平台抽佣制**：每笔订单按比例抽取佣金（佣金比例后台可配置）
- 后期可扩展：商家入驻费、广告位收费

### 1.5 目标地域

**陕西省汉中市**，覆盖以下区县：

| 区县 | 说明 |
|------|------|
| 汉台区 | 市中心核心区域 |
| 南郑区 | 主城区扩展区域 |
| 城固县 | 重点县域 |
| 洋县 | 重点县域 |
| 勉县 | 重点县域 |
| 西乡县 | — |
| 略阳县 | — |
| 宁强县 | — |
| 镇巴县 | — |
| 留坝县 | — |
| 佛坪县 | — |

### 1.6 核心业务流程

```
用户浏览 → 筛选婚车 → 查看详情 → 选择套餐/车队组合
    → 填写信息 → 提交订单 → 支付定金 → 商家接单
    → 服务完成 → 支付尾款 → 双方评价
```

---

## 二、产品定位

| 维度 | 内容 |
|------|------|
| 产品形态 | B2C 婚车预订平台（Web 端先行，后期扩展小程序） |
| 核心价值 | 解决汉中新人找婚车难、比价难、预订不透明的问题 |
| 差异化 | 本地化运营 + 车队组合定制 + 双向评价体系 |
| 开发优先级 | Web 用户前台 → Web 商家后台 → Web 管理后台 → 小程序 |

---

## 三、功能需求 — Web 用户前台

### 3.1 首页（`/`）

#### 3.1.1 顶部导航

```
┌────────────────────────────────────────────────┐
│  Logo [良缘锦程]    城市：汉中 ▼   搜索框 🔍   │
│                     登录 | 注册 | 我的订单      │
├────────────────────────────────────────────────┤
```

- Logo 展示
- 城市选择器（默认汉中）
- 全局搜索框（搜索车型/商家）

#### 3.1.2 Banner 轮播

- 展示活动/热门推荐
- 3-5 张轮播图，可点击跳转
- 管理后台可配置

#### 3.1.3 分类导航

**车型分类**：

| 分类 | 说明 |
|------|------|
| 奔驰 | 奔驰全系婚车 |
| 宝马 | 宝马全系婚车 |
| 奥迪 | 奥迪全系婚车 |
| 保时捷 | 保时捷/跑车 |
| 玛莎拉蒂 | 玛莎拉蒂/超跑 |
| 路虎 | 路虎/SUV 婚车 |
| 红旗 | 红旗/国产豪华 |
| 复古 | 老爷车/复古车型 |
| 其他 | — |

**用途分类**：

| 分类 | 说明 |
|------|------|
| 车队套餐 | 主婚车+跟车组合 |
| 头车精选 | 仅主婚车 |
| 经济实惠 | 高性价比车型 |

#### 3.1.4 推荐区域

- **热门婚车推荐**：展示 6-8 辆精选婚车
- **精选商家**：展示优质商家/车队
- **限时优惠**：有折扣的车辆

#### 3.1.5 底部信息

- 关于我们
- 联系方式
- ICP 备案信息（后续补充）

---

### 3.2 婚车列表页（`/cars`）

#### 3.2.1 筛选栏（顶部固定）

| 筛选项 | 可选值 |
|--------|--------|
| 车型 | 奔驰/宝马/奥迪/保时捷/玛莎拉蒂/路虎/红旗/复古/其他 |
| 价格区间 | 0-1000 / 1000-2000 / 2000-5000 / 5000+ |
| 座位数 | 4座 / 5座 / 6座 / 7座及以上 |
| 颜色 | 黑色 / 白色 / 红色 / 银色 / 其他 |
| 区县 | 汉台区 / 南郑区 / 城固 / 洋县 / 勉县 / 西乡 / 略阳 / 宁强 / 镇巴 / 留坝 / 佛坪 |
| 档期 | 选择日期 → 只显示可预订车辆 |

#### 3.2.2 排序

| 排序方式 | 说明 |
|----------|------|
| 综合推荐 | 默认，综合权重排序 |
| 价格从低到高 | 按起步价升序 |
| 价格从高到低 | 按起步价降序 |
| 评分最高 | 按用户评分降序 |
| 最新上架 | 按发布时间降序 |

#### 3.2.3 卡片展示

```
┌──────────────────────────────┐
│          [车辆照片]            │
│                               │
│  奔驰 S400L · 黑色 · 5座      │
│  ★★★★☆ 4.8 (36条评价)        │
│  ¥1,888 起/半天               │
│  汉中·汉台区                   │
│  [收藏 ♡]        [立即预订]    │
└──────────────────────────────┘
```

---

### 3.3 婚车详情页（`/car/:id`）

#### 3.3.1 页面结构

```
┌────────────────────────────────────────┐
│         [主图大图轮播]                  │
│   [缩略图1] [缩略图2] [缩略图3] ...    │
├────────────────────────────────────────┤
│  奔驰 S400L                            │
│  ★★★★☆ 4.8 · 36条评价 · 已服务128次   │
├────────────────────────────────────────┤
│  车辆信息                              │
│  品牌：奔驰    型号：S400L               │
│  年份：2023    颜色：黑色               │
│  座位：5座     变速箱：自动              │
├────────────────────────────────────────┤
│  服务套餐                              │
│  ┌─────────────────────────────────┐   │
│  │ 半天套餐 (4小时 / 50km内)       │   │
│  │ ¥1,888    [选这个]              │   │
│  ├─────────────────────────────────┤   │
│  │ 全天套餐 (8小时 / 100km内)      │   │
│  │ ¥3,288    [选这个]              │   │
│  ├─────────────────────────────────┤   │
│  │ 车队套餐 (主婚车+跟车×3)        │   │
│  │ ¥6,666    [选这个]              │   │
│  └─────────────────────────────────┘   │
├────────────────────────────────────────┤
│  档期日历                              │
│   ┌──┬──┬──┬──┬──┬──┬──┐             │
│   │一│二│三│四│五│六│日│             │
│   ├──┼──┼──┼──┼──┼──┼──┤             │
│   │  │  │  │  │●│●│  │ ← 可预订      │
│   └──┴──┴──┴──┴──┴──┴──┘             │
├────────────────────────────────────────┤
│  商家信息                              │
│  汉中·XX 婚车租赁行                    │
│  ⭐ 4.9 · 入驻6个月 · 已接单89         │
│  📍 汉台区滨江路 XX 号                 │
│  📞 153XXXXXXXX                       │
│  [进入店铺]                            │
├────────────────────────────────────────┤
│  用户评价                              │
│  ┌────────────────────────────────┐    │
│  │ ★★★★★ 车辆很新，准时到达       │    │
│  │ — 张女士 · 2026-05-20         │    │
│  └────────────────────────────────┘    │
│  ┌────────────────────────────────┐    │
│  │ ★★★★★ 服务很好，推荐           │    │
│  │ — 李先生 · 2026-04-15         │    │
│  └────────────────────────────────┘    │
│  [查看全部评价 ▸]                      │
└────────────────────────────────────────┘
```

#### 3.3.2 功能要点

- 车辆照片多图轮播
- 完整车辆参数展示
- 三种服务套餐选择（半天/全天/车队）
- 档期日历（可预订日期高亮，已预订灰色）
- 商家信息 + 进入店铺
- 用户评价列表
- 收藏按钮
- **立即预订** CTA 按钮（悬浮底部跟随）

---

### 3.4 下单/预订页（`/order/create`）

#### 3.4.1 Step 1：选择服务信息

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| 用车日期 | DatePicker | ✅ | 选择具体日期 |
| 服务套餐 | Radio | ✅ | 半天 / 全天 / 车队套餐（价格联动） |
| 跟车数量 | Select | 仅车队 | 选择 1/3/5/7 辆 |
| 跟车车型 | Select | 仅车队 | 统一车型 / 自由搭配 |
| 接亲时间 | TimePicker | ✅ | 具体出发时间 |
| 接亲地址 | 输入框 | ✅ | 自动补全汉中地址 |
| 仪式酒店 | 输入框 | ✅ | 自动补全汉中地址 |
| 联系人姓名 | 输入框 | ✅ | — |
| 联系电话 | 输入框 | ✅ | 11 位手机号 |
| 备注需求 | TextArea | 否 | 鲜花装饰 / 特殊要求 |

#### 3.4.2 Step 2：费用明细

```
┌──────────────────────────────────┐
│  费用明细                        │
│  ─────────────────────────────   │
│  租金（半天）          ¥1,888    │
│  超时押金              ¥500      │
│  装饰费（选）          ¥0        │
│  ─────────────────────────────   │
│  合计                  ¥2,388    │
│  首付定金（30%）       ¥716      │
│  尾款                  ¥1,672    │
│                                  │
│  优惠券： — 选择优惠券 ▸          │
│                                  │
│  [提交订单 · 去支付 ¥716]        │
└──────────────────────────────────┘
```

#### 3.4.3 Step 3：支付

- 接入 **支付宝当面付** + **微信支付 H5**
- 支付成功 → 跳转订单详情页
- 支付失败 → 提示用户重试
- 订单保留 15 分钟，超时未支付自动取消

#### 3.4.4 车队组合定制流程

```
用户进入下单页 → 选择"车队套餐"
    → 选择主婚车（当前车辆/或更换）
    → 选择跟车数量（1/3/5/7）
    → 选择跟车车型（统一品牌/指定型号）
    → 系统自动计算总价
    → 展示车队阵容清单
    → 确认预订
```

---

### 3.5 用户中心

#### 3.5.1 登录/注册

- 手机号 + 短信验证码登录
- 支持密码登录
- 微信扫码绑定（后续）

#### 3.5.2 我的订单（`/user/orders`）

| Tab | 说明 |
|-----|------|
| 全部 | 所有订单 |
| 待付款 | 已下单未支付 |
| 待确认 | 已支付等待商家确认 |
| 已确认 | 商家已确认 |
| 进行中 | 服务正在执行 |
| 已完成 | 服务完成 |
| 已取消 | 已取消的订单 |

每个订单卡片展示：
- 车辆图片、车型名称
- 服务日期、套餐类型
- 订单金额、实付金额
- 状态标签（带颜色标识）
- 操作按钮（查看详情/取消订单/去支付/确认完成/评价）

#### 3.5.3 订单详情（`/user/orders/:id`）

- 车辆信息（带跳转链接）
- 服务信息（日期、时间、地址等）
- 费用明细
- 状态流转时间线
- 操作按钮（根据状态动态展示）

#### 3.5.4 我的收藏（`/user/favorites`）

- 收藏的婚车卡片列表
- 取消收藏
- 跳转详情页

#### 3.5.5 个人信息（`/user/profile`）

- 头像
- 昵称
- 手机号（绑定/解绑）
- 修改密码

#### 3.5.6 浏览记录（`/user/history`）

- 最近浏览的婚车列表
- 清除浏览记录

#### 3.5.7 优惠券（`/user/coupons`）

- 可用优惠券
- 已使用
- 已过期

---

### 3.6 商家店铺页（`/shop/:id`）

- 商家封面图 + Logo
- 商家信息（名称、地址、电话、评分、入驻时长、总接单量）
- 资质认证标志
- 商家车辆列表（分页展示）
- 商家评价汇总

---

## 四、功能需求 — Web 商家后台

### 4.1 商家工作台（`/merchant/dashboard`）

```
┌──────────────┬───────────┬───────────┬───────────┐
│  今日待确认   │ 进行中订单  │ 本月收入   │ 车辆总数   │
│      3       │     2     │ ¥18,888   │    8      │
├──────────────┴───────────┴───────────┴───────────┤
│  最近订单                                         │
│  ┌────────────────────────────────────────────┐   │
│  │ 奔驰S400L - 张女士 - 06-15 - 待确认        │   │
│  │ [接单] [拒单]                              │   │
│  ├────────────────────────────────────────────┤   │
│  │ 宝马530Li - 李先生 - 06-18 - 已确认        │   │
│  └────────────────────────────────────────────┘   │
├──────────────────────────────────────────────────┤
│  数据概览                                         │
│  [订单趋势图]  [收入趋势图]                        │
└──────────────────────────────────────────────────┘
```

### 4.2 车辆管理（`/merchant/cars`）

#### 4.2.1 车辆列表

| 字段 | 说明 |
|------|------|
| 车辆图片 | 缩略图 |
| 品牌/型号 | — |
| 颜色 | — |
| 价格 | 半天/全天/车队 |
| 状态 | 上架 / 下架 / 待审核 |
| 操作 | 编辑 / 上下架 / 删除 |

#### 4.2.2 添加/编辑车辆

| 字段 | 类型 | 必填 |
|------|------|------|
| 品牌 | 下拉选择 | ✅ |
| 型号 | 输入框 | ✅ |
| 年份 | 年份选择 | ✅ |
| 颜色 | 下拉选择 | ✅ |
| 座位数 | 数字输入 | ✅ |
| 变速箱 | 自动/手动 | ✅ |
| 燃油类型 | 汽油/柴油/电动/混动 | ✅ |
| 车辆描述 | TextArea | 否 |
| 车辆照片 | 多图上传 | ✅ |
| 半天价格 | 数字输入 | ✅ |
| 全天价格 | 数字输入 | ✅ |
| 车队单价（每辆） | 数字输入 | 否 |
| 超时押金 | 数字输入 | ✅ |
| 装饰费 | 数字输入 | 否 |

#### 4.2.3 档期管理

- 日历视图
- 可点击日期切换状态（可租 / 已租 / 维护中）
- 批量设置（如设置整个月排除特定日期）
- 订单关联显示

### 4.3 订单管理（`/merchant/orders`）

| 功能 | 说明 |
|------|------|
| 订单列表 | 全部订单，支持搜索/筛选/排序 |
| 接单操作 | 新订单 → 确认接单 / 拒单（填写原因） |
| 确认服务 | 服务完成 → 标记已完成 |
| 订单详情 | 查看完整订单信息 |
| 统计 | 订单数、完成率、取消率 |

### 4.4 财务管理（`/merchant/finance`）

| 功能 | 说明 |
|------|------|
| 收入总览 | 本月收入、累计收入、待结算 |
| 收入明细 | 每笔订单收入（含佣金扣除） |
| 提现申请 | 输入金额 → 提交审核 |
| 提现记录 | 历史提现列表（待审核/已打款/已拒绝） |
| 佣金明细 | 每笔订单的佣金扣除记录 |

### 4.5 店铺管理（`/merchant/shop`）

| 字段 | 说明 |
|------|------|
| 店铺名称 | — |
| 店铺 Logo | 图片上传 |
| 店铺封面 | 图片上传 |
| 联系电话 | — |
| 店铺地址 | — |
| 店铺简介 | TextArea |
| 资质认证 | 营业执照上传、身份证上传 |

### 4.6 评价管理（`/merchant/reviews`）

- 查看所有评价
- 回复评价
- 评价统计（评分分布）

---

## 五、功能需求 — Web 平台管理后台

### 5.1 运营看板（`/admin/dashboard`）

| 指标 | 说明 |
|------|------|
| 注册用户数 | 累计/日增 |
| 商家数 | 累计/日增 |
| 车辆数 | 上架/下架/待审核 |
| 订单量 | 今日/本月/累计 |
| GMV | 今日/本月/累计 |
| 平台收入 | 佣金总收入 |

**图表**：
- 订单趋势（近7天/近30天）
- GMV 趋势
- 热门车型 TOP10
- 热门区域分布

### 5.2 用户管理（`/admin/users`）

| 功能 | 说明 |
|------|------|
| 用户列表 | 全部用户（头像、昵称、手机号、注册时间、订单数） |
| 用户搜索 | 按手机号/昵称搜索 |
| 用户详情 | 查看用户信息、订单记录 |
| 状态管理 | 封禁/解禁用户 |

### 5.3 商家管理（`/admin/merchants`）

#### 5.3.1 入驻审核

| 字段 | 说明 |
|------|------|
| 商家信息 | 名称、联系人、电话、地址 |
| 资质材料 | 营业执照照片、身份证照片 |
| 审核操作 | 通过 / 拒绝（填写原因） |

#### 5.3.2 商家管理

- 商家列表（状态筛选：正常/冻结/待审核）
- 商家详情
- 修改商家状态
- 设置佣金比例（可为不同商家设置不同比例）

### 5.4 车辆审核（`/admin/cars`）

| 功能 | 说明 |
|------|------|
| 待审核列表 | 新发布/编辑后待审核车辆 |
| 车辆详情 | 查看完整车辆信息+图片 |
| 审核操作 | 通过 / 拒绝（填写原因） |

### 5.5 订单管理（`/admin/orders`）

| 功能 | 说明 |
|------|------|
| 全平台订单 | 搜索（订单号/用户/商家/手机号） |
| 筛选 | 按状态/日期/商家 |
| 订单详情 | 完整信息 |
| 纠纷处理 | 介入处理退款纠纷 |
| 退款审核 | 审核商家/用户的退款申请 |

### 5.6 财务/抽佣（`/admin/finance`）

| 功能 | 说明 |
|------|------|
| 佣金配置 | 设置默认佣金比例（百分比） |
| 商家佣金 | 按商家单独设置 |
| 提现审核 | 商家提现申请列表 → 审核打款 |
| 平台收入 | 佣金收入统计、趋势 |
| 资金流水 | 所有支付/退款记录 |

### 5.7 内容管理（`/admin/content`）

| 功能 | 说明 |
|------|------|
| Banner 管理 | 新增/编辑/删除 Banner（图片+链接+排序） |
| 公告管理 | 发布系统公告 |
| 分类管理 | 编辑车型分类、排序 |

### 5.8 系统设置（`/admin/settings`）

| 设置项 | 说明 |
|--------|------|
| 支付参数 | 支付宝商户号/公钥/私钥、微信支付商户号/API 密钥 |
| 短信配置 | 阿里云短信 AccessKey、签名、模板 |
| 基础参数 | 平台名称、Logo、客服电话、ICP 备案号 |
| 管理员账户 | 管理员列表、新增管理员、权限分配 |

---

## 六、数据库设计

### 6.1 数据库 ER 图概览

```
users ──┬── orders ──┬── payments
        │             ├── order_tracking
        │             └── reviews ──┬── merchants
        │                            └── cars
        └── favorites ──── cars

merchants ──┬── merchant_qualifications
            └── withdrawal_records

cars ──┬── car_schedules
       └── fleet_packages
       
coupons ──── user_coupons
```

### 6.2 核心表结构

#### 6.2.1 `users` — 用户表

| 字段 | 类型 | 说明 |
|------|------|------|
| id | BIGINT PK | 自增主键 |
| phone | VARCHAR(20) | 手机号（登录账号） |
| password_hash | VARCHAR(255) | 密码哈希 |
| nickname | VARCHAR(50) | 昵称 |
| avatar | VARCHAR(255) | 头像 URL |
| wechat_openid | VARCHAR(100) | 微信 OpenID（后续） |
| alipay_user_id | VARCHAR(100) | 支付宝用户 ID（后续） |
| status | TINYINT | 0:正常 1:封禁 |
| last_login_at | DATETIME | 最后登录时间 |
| created_at | DATETIME | — |
| updated_at | DATETIME | — |

#### 6.2.2 `merchants` — 商家表

| 字段 | 类型 | 说明 |
|------|------|------|
| id | BIGINT PK | 自增主键 |
| user_id | BIGINT FK | 关联用户表 |
| shop_name | VARCHAR(100) | 店铺名称 |
| shop_logo | VARCHAR(255) | 店铺 Logo |
| shop_cover | VARCHAR(255) | 店铺封面 |
| contacts | VARCHAR(50) | 联系人 |
| phone | VARCHAR(20) | 联系电话 |
| province | VARCHAR(50) | 省 |
| city | VARCHAR(50) | 市 |
| district | VARCHAR(50) | 区/县 |
| address | VARCHAR(255) | 详细地址 |
| longitude | DECIMAL(10,7) | 经度 |
| latitude | DECIMAL(10,7) | 纬度 |
| description | TEXT | 店铺简介 |
| commission_rate | DECIMAL(5,2) | 佣金比例（%） |
| auth_status | TINYINT | 0:待审核 1:已认证 2:已拒绝 |
| status | TINYINT | 0:正常 1:冻结 2:注销 |
| total_orders | INT | 累计订单数 |
| total_revenue | DECIMAL(12,2) | 累计收入 |
| rating | DECIMAL(2,1) | 综合评分 |
| created_at | DATETIME | — |
| updated_at | DATETIME | — |

#### 6.2.3 `merchant_qualifications` — 商家资质表

| 字段 | 类型 | 说明 |
|------|------|------|
| id | BIGINT PK | — |
| merchant_id | BIGINT FK | 关联商家 |
| license_img | VARCHAR(255) | 营业执照图片 |
| id_card_img | VARCHAR(255) | 法人身份证图片 |
| other_imgs | JSON | 其他资质图片 |
| status | TINYINT | 0:待审核 1:通过 2:拒绝 |
| reject_reason | VARCHAR(255) | 拒绝原因 |
| created_at | DATETIME | — |
| updated_at | DATETIME | — |

#### 6.2.4 `cars` — 车辆表

| 字段 | 类型 | 说明 |
|------|------|------|
| id | BIGINT PK | 自增主键 |
| merchant_id | BIGINT FK | 关联商家 |
| brand | VARCHAR(50) | 品牌（奔驰/宝马/奥迪...） |
| model | VARCHAR(100) | 型号（S400L/530Li...） |
| year | INT | 出厂年份 |
| color | VARCHAR(20) | 颜色 |
| seats | TINYINT | 座位数 |
| transmission | VARCHAR(10) | 变速箱（自动/手动） |
| fuel_type | VARCHAR(10) | 燃油类型 |
| description | TEXT | 车辆描述 |
| images | JSON | 车辆图片 URL 数组 |
| half_day_price | DECIMAL(10,2) | 半天价格 |
| full_day_price | DECIMAL(10,2) | 全天价格 |
| fleet_price | DECIMAL(10,2) | 车队价格（每辆/天） |
| deposit | DECIMAL(10,2) | 押金 |
| decoration_fee | DECIMAL(10,2) | 装饰费 |
| status | TINYINT | 0:上架 1:下架 2:待审核 |
| total_orders | INT | 累计预订次数 |
| rating | DECIMAL(2,1) | 评分 |
| sort_order | INT | 排序权重 |
| created_at | DATETIME | — |
| updated_at | DATETIME | — |

#### 6.2.5 `car_schedules` — 车辆档期表

| 字段 | 类型 | 说明 |
|------|------|------|
| id | BIGINT PK | — |
| car_id | BIGINT FK | 关联车辆 |
| date | DATE | 日期 |
| status | TINYINT | 0:可租 1:已租 2:维护中 |
| order_id | BIGINT FK | 关联订单（已租时） |
| created_at | DATETIME | — |
| updated_at | DATETIME | — |

> **唯一索引**：`(car_id, date)`

#### 6.2.6 `fleet_packages` — 车队套餐表

| 字段 | 类型 | 说明 |
|------|------|------|
| id | BIGINT PK | — |
| merchant_id | BIGINT FK | 关联商家 |
| name | VARCHAR(100) | 套餐名称 |
| main_car_id | BIGINT FK | 主婚车 |
| follow_car_model | VARCHAR(100) | 跟车车型 |
| follow_car_count | TINYINT | 跟车数量 |
| half_day_price | DECIMAL(10,2) | 半天价格 |
| full_day_price | DECIMAL(10,2) | 全天价格 |
| description | TEXT | 套餐描述 |
| is_active | TINYINT | 是否启用 |
| created_at | DATETIME | — |
| updated_at | DATETIME | — |

#### 6.2.7 `orders` — 订单表

| 字段 | 类型 | 说明 |
|------|------|------|
| id | BIGINT PK | — |
| order_no | VARCHAR(50) | 订单号（唯一） |
| user_id | BIGINT FK | 关联用户 |
| merchant_id | BIGINT FK | 关联商家 |
| car_id | BIGINT FK | 关联车辆 |
| fleet_package_id | BIGINT FK | 关联车队套餐（可选） |
| follow_car_count | TINYINT | 跟车数量（车队时） |
| service_date | DATE | 服务日期 |
| service_type | VARCHAR(20) | half_day / full_day / fleet |
| pickup_time | TIME | 接亲时间 |
| pickup_address | VARCHAR(255) | 接亲地址 |
| ceremony_address | VARCHAR(255) | 仪式地址 |
| contact_name | VARCHAR(50) | 联系人 |
| contact_phone | VARCHAR(20) | 联系电话 |
| remark | TEXT | 备注 |
| decoration_required | TINYINT | 是否需要装饰 |
| total_amount | DECIMAL(10,2) | 总金额 |
| deposit_amount | DECIMAL(10,2) | 定金金额 |
| balance_amount | DECIMAL(10,2) | 尾款金额 |
| commission_amount | DECIMAL(10,2) | 佣金金额 |
| coupon_id | BIGINT FK | 使用的优惠券 |
| discount_amount | DECIMAL(10,2) | 优惠金额 |
| pay_amount | DECIMAL(10,2) | 实际支付金额 |
| status | VARCHAR(20) | pending_pay/pending_confirm/confirmed/in_progress/completed/cancelled/refunding/refunded |
| paid_at | DATETIME | 支付时间 |
| completed_at | DATETIME | 完成时间 |
| cancel_reason | VARCHAR(255) | 取消原因 |
| created_at | DATETIME | — |
| updated_at | DATETIME | — |

#### 6.2.8 `order_tracking` — 订单状态日志

| 字段 | 类型 | 说明 |
|------|------|------|
| id | BIGINT PK | — |
| order_id | BIGINT FK | 关联订单 |
| from_status | VARCHAR(20) | 原状态 |
| to_status | VARCHAR(20) | 新状态 |
| operator_type | VARCHAR(20) | user/merchant/admin/system |
| operator_id | BIGINT | 操作人 ID |
| remark | VARCHAR(255) | 备注 |
| created_at | DATETIME | — |

#### 6.2.9 `payments` — 支付表

| 字段 | 类型 | 说明 |
|------|------|------|
| id | BIGINT PK | — |
| order_id | BIGINT FK | 关联订单 |
| type | VARCHAR(20) | deposit / balance / refund |
| amount | DECIMAL(10,2) | 支付金额 |
| payment_method | VARCHAR(20) | alipay / wechat |
| trade_no | VARCHAR(100) | 支付平台交易号 |
| out_trade_no | VARCHAR(100) | 商户订单号 |
| status | VARCHAR(20) | pending / success / failed / refunded |
| paid_at | DATETIME | 支付时间 |
| created_at | DATETIME | — |
| updated_at | DATETIME | — |

#### 6.2.10 `reviews` — 评价表

| 字段 | 类型 | 说明 |
|------|------|------|
| id | BIGINT PK | — |
| order_id | BIGINT FK | 关联订单（唯一） |
| user_id | BIGINT FK | 关联用户 |
| merchant_id | BIGINT FK | 关联商家 |
| car_id | BIGINT FK | 关联车辆 |
| overall_rating | TINYINT | 综合评分 1-5 |
| car_rating | TINYINT | 车况评分 |
| punctuality_rating | TINYINT | 准时评分 |
| service_rating | TINYINT | 服务评分 |
| content | TEXT | 评价内容 |
| images | JSON | 评价图片 |
| reply_content | TEXT | 商家回复 |
| reply_at | DATETIME | 回复时间 |
| created_at | DATETIME | — |
| updated_at | DATETIME | — |

#### 6.2.11 `coupons` — 优惠券表

| 字段 | 类型 | 说明 |
|------|------|------|
| id | BIGINT PK | — |
| name | VARCHAR(100) | 优惠券名称 |
| type | VARCHAR(10) | fixed（固定金额）/ percent（百分比） |
| value | DECIMAL(10,2) | 优惠值 |
| min_amount | DECIMAL(10,2) | 最低消费金额 |
| total_count | INT | 发行总量 |
| used_count | INT | 已使用数量 |
| start_date | DATE | 有效期开始 |
| end_date | DATE | 有效期结束 |
| is_active | TINYINT | 是否启用 |
| created_at | DATETIME | — |
| updated_at | DATETIME | — |

#### 6.2.12 `user_coupons` — 用户优惠券

| 字段 | 类型 | 说明 |
|------|------|------|
| id | BIGINT PK | — |
| user_id | BIGINT FK | 关联用户 |
| coupon_id | BIGINT FK | 关联优惠券 |
| used_at | DATETIME | 使用时间（NULL 为未使用） |
| order_id | BIGINT FK | 使用的订单 |
| created_at | DATETIME | 领取时间 |

#### 6.2.13 `favorites` — 收藏表

| 字段 | 类型 | 说明 |
|------|------|------|
| id | BIGINT PK | — |
| user_id | BIGINT FK | 关联用户 |
| car_id | BIGINT FK | 关联车辆 |
| created_at | DATETIME | — |

> **唯一索引**：`(user_id, car_id)`

#### 6.2.14 `banners` — Banner 表

| 字段 | 类型 | 说明 |
|------|------|------|
| id | BIGINT PK | — |
| title | VARCHAR(100) | 标题 |
| image_url | VARCHAR(255) | 图片 URL |
| link_url | VARCHAR(255) | 跳转链接 |
| sort_order | INT | 排序 |
| status | TINYINT | 0:启用 1:禁用 |
| created_at | DATETIME | — |
| updated_at | DATETIME | — |

#### 6.2.15 `withdrawal_records` — 提现记录表

| 字段 | 类型 | 说明 |
|------|------|------|
| id | BIGINT PK | — |
| merchant_id | BIGINT FK | 关联商家 |
| amount | DECIMAL(10,2) | 提现金额 |
| bank_name | VARCHAR(100) | 银行名称 |
| bank_card_no | VARCHAR(50) | 银行卡号 |
| account_name | VARCHAR(50) | 开户名 |
| status | VARCHAR(20) | pending / approved / rejected / completed |
| audit_remark | VARCHAR(255) | 审核备注 |
| audit_at | DATETIME | 审核时间 |
| completed_at | DATETIME | 打款完成时间 |
| created_at | DATETIME | — |
| updated_at | DATETIME | — |

#### 6.2.16 `admins` — 管理员表

| 字段 | 类型 | 说明 |
|------|------|------|
| id | BIGINT PK | — |
| username | VARCHAR(50) | 用户名 |
| password_hash | VARCHAR(255) | 密码 |
| real_name | VARCHAR(50) | 真实姓名 |
| phone | VARCHAR(20) | 手机号 |
| role | VARCHAR(20) | super_admin / admin / operator |
| status | TINYINT | 0:正常 1:禁用 |
| last_login_at | DATETIME | 最后登录 |
| created_at | DATETIME | — |
| updated_at | DATETIME | — |

---

## 七、技术栈

### 7.1 技术选型总览

| 图层 | 技术 | 说明 |
|------|------|------|
| **前端框架** | React 18 + TypeScript | — |
| **构建工具** | Vite | — |
| **UI 组件库** | Ant Design 5.x | 后台组件 |
| **UI 样式** | Tailwind CSS | 前台样式 |
| **状态管理** | Zustand + React Query | 全局状态 + 服务端状态 |
| **路由** | React Router 6 | — |
| **后端框架** | NestJS | Node.js 企业级框架 |
| **ORM** | Prisma | 数据库操作 |
| **数据库** | MySQL 8.0 | 关系型数据库 |
| **缓存** | Redis | 会话/缓存/队列 |
| **校验** | class-validator + class-transformer | 参数校验 |
| **认证** | JWT | 用户认证 |
| **文件存储** | 阿里云 OSS / 腾讯云 COS | 图片上传 |
| **支付** | 支付宝当面付 API + 微信支付 H5 API | — |
| **短信** | 阿里云短信服务 | 验证码/通知 |
| **部署** | Docker + Docker Compose + Nginx + PM2 | — |
| **地图** | 高德地图 JS API 2.0 | 地址自动补全 |

### 7.2 项目结构概要

```
liangyuan-jincheng/
├── frontend/                    # Web 用户前台
│   ├── src/
│   │   ├── components/          # 通用组件
│   │   ├── pages/               # 页面
│   │   │   ├── home/            # 首页
│   │   │   ├── cars/            # 车辆列表/详情
│   │   │   ├── order/           # 下单/支付
│   │   │   └── user/            # 用户中心
│   │   ├── hooks/               # 自定义 Hooks
│   │   ├── services/            # API 调用
│   │   ├── store/               # 状态管理
│   │   └── utils/               # 工具函数
│   └── package.json
│
├── admin/                       # Web 管理后台
│   ├── src/
│   │   ├── pages/
│   │   │   ├── merchant/        # 商家端
│   │   │   └── admin/           # 平台管理端
│   │   └── ...
│   └── package.json
│
├── backend/                     # NestJS 后端
│   ├── src/
│   │   ├── modules/
│   │   │   ├── auth/            # 认证模块
│   │   │   ├── users/           # 用户模块
│   │   │   ├── merchants/       # 商家模块
│   │   │   ├── cars/            # 车辆模块
│   │   │   ├── orders/          # 订单模块
│   │   │   ├── payments/        # 支付模块
│   │   │   ├── reviews/         # 评价模块
│   │   │   ├── coupons/         # 优惠券模块
│   │   │   ├── upload/          # 文件上传
│   │   │   └── admin/           # 管理后台模块
│   │   ├── common/              # 公共模块
│   │   └── prisma/              # Prisma Schema
│   └── package.json
│
├── docker-compose.yml           # Docker 编排
├── LIANGYUAN_SPEC.md            # 本文件
└── README.md                    # 项目说明
```

---

## 八、非功能性需求

### 8.1 性能指标

| 指标 | 目标 |
|------|------|
| 页面首屏加载 | < 2s |
| API 响应时间（列表） | < 500ms |
| API 响应时间（详情） | < 300ms |
| API 响应时间（下单） | < 1s |
| 图片加载 | 懒加载 + 渐进式加载 |

### 8.2 并发能力

- 支持 500+ 同时在线（汉中本地量级，周末高峰期估算）
- 服务降级策略（高峰期可降级非核心功能）

### 8.3 安全性要求

| 类别 | 要求 |
|------|------|
| 传输安全 | 全站 HTTPS |
| 认证安全 | JWT + 刷新 token 机制 |
| 防 XSS | 输入过滤 + 输出转义 |
| 防 CSRF | Token 验证 |
| 防 SQL 注入 | ORM 参数化查询 |
| 支付安全 | 签名验证 + 金额校验 + 订单幂等 |
| 密码安全 | bcrypt 加密存储 |
| 接口限流 | 关键接口 IP 限流 |
| 敏感信息 | 手机号等脱敏展示 |

### 8.4 可维护性

- 模块化设计，业务逻辑与基础设施分离
- 统一错误码规范
- API 文档自动生成（Swagger）
- 日志分级 + 关键操作审计日志

### 8.5 浏览器兼容性

| 浏览器 | 支持 |
|--------|------|
| Chrome 最新版 | ✅ |
| Safari 最新版 | ✅（含 iOS） |
| Edge 最新版 | ✅ |
| 微信内置浏览器 | ✅ |
| Firefox 最新版 | ✅ |

---

## 九、MVP 开发计划

### 9.1 阶段划分

| Phase | 内容 | 预估工时 |
|-------|------|----------|
| **P0** 基础框架 | 项目脚手架搭建、Prisma Schema 初始化、数据库创建、前后端打通 | 3 天 |
| **P1** 用户端核心 | 首页 → 列表 → 详情 → 下单 → 支付完整流程 | 10 天 |
| **P2** 商家端基础 | 车辆管理（CRUD + 上下架 + 档期）、订单接单流程 | 5 天 |
| **P3** 车队组合 | 车队套餐设计 + 组合预订完整流程 | 3 天 |
| **P4** 平台管理端 | 商家审核、车辆审核、基础数据统计 | 5 天 |
| **P5** 用户中心 | 订单列表、收藏、个人信息、我的评价 | 3 天 |
| **P6** 评价系统 | 评价提交 + 评价展示 + 评价回复 | 2 天 |
| **P7** 财务/提现 | 商家收入明细、提现申请、平台审核、佣金计算 | 3 天 |
| **P8** 部署上线 | Docker 编排、Nginx 配置、HTTPS、云服务器部署 | 2 天 |
| **合计** | | **~36 工作日** |

### 9.2 里程碑

```
P0 ──→ P1 ──→ P2 ──→ P3 ──→ P4 ──→ P5 ──→ P6 ──→ P7 ──→ P8
│       │       │       │       │       │       │       │       │
v       v       v       v       v       v       v       v       v
Day3    Day13   Day18   Day21   Day26   Day29   Day31   Day34   Day36
(base)   (支付)  (商家)  (车队)  (管理)  (我的)  (评价)  (财务)  (上线)
```

---

## 十、页面路由汇总

### 10.1 用户前台路由

| 路径 | 页面 | 说明 |
|------|------|------|
| `/` | 首页 | Banner + 分类 + 推荐 |
| `/cars` | 婚车列表 | 筛选 + 搜索 + 排序 |
| `/car/:id` | 婚车详情 | 图片 + 信息 + 套餐 + 日历 + 评价 |
| `/order/create` | 下单 | 选择信息 + 费用 + 支付 |
| `/order/pay/:orderNo` | 支付页 | 支付二维码/跳转 |
| `/order/result` | 支付结果 | 成功/失败 |
| `/user/orders` | 我的订单 | 分 Tab 订单列表 |
| `/user/orders/:id` | 订单详情 | 状态 + 信息 + 操作 |
| `/user/favorites` | 我的收藏 | 收藏车辆列表 |
| `/user/profile` | 个人信息 | 编辑资料 |
| `/user/history` | 浏览记录 | 最近浏览 |
| `/shop/:id` | 商家店铺 | 商家信息 + 车辆列表 |
| `/login` | 登录 | 手机号验证码登录 |
| `/register` | 注册 | 注册 |

### 10.2 商家后台路由（`/merchant`）

| 路径 | 页面 | 说明 |
|------|------|------|
| `/merchant/dashboard` | 工作台 | 数据概览 + 待办 |
| `/merchant/cars` | 车辆列表 | 车辆管理 |
| `/merchant/cars/new` | 添加车辆 | — |
| `/merchant/cars/:id/edit` | 编辑车辆 | — |
| `/merchant/cars/:id/schedule` | 档期管理 | 日历 |
| `/merchant/orders` | 订单列表 | — |
| `/merchant/orders/:id` | 订单详情 | — |
| `/merchant/finance` | 财务总览 | 收入 + 提现 |
| `/merchant/finance/withdraw` | 申请提现 | — |
| `/merchant/reviews` | 评价管理 | — |
| `/merchant/shop` | 店铺设置 | 编辑店铺信息 |
| `/merchant/shop/qualification` | 资质认证 | — |

### 10.3 管理后台路由（`/admin`）

| 路径 | 页面 | 说明 |
|------|------|------|
| `/admin/dashboard` | 运营看板 | 数据统计 |
| `/admin/users` | 用户管理 | — |
| `/admin/users/:id` | 用户详情 | — |
| `/admin/merchants` | 商家列表 | — |
| `/admin/merchants/audit` | 入驻审核 | — |
| `/admin/merchants/:id` | 商家详情 | — |
| `/admin/cars` | 车辆列表 | — |
| `/admin/cars/audit` | 车辆审核 | — |
| `/admin/orders` | 订单管理 | — |
| `/admin/orders/:id` | 订单详情 | — |
| `/admin/finance` | 财务管理 | 佣金 + 提现 |
| `/admin/finance/withdraw` | 提现审核 | — |
| `/admin/content/banners` | Banner 管理 | — |
| `/admin/content/categories` | 分类管理 | — |
| `/admin/content/notices` | 公告管理 | — |
| `/admin/settings` | 系统设置 | 支付/短信/基础参数 |
| `/admin/settings/admins` | 管理员管理 | — |

---

> **本文档为「良缘锦程」婚车预订平台的产品需求规格说明书 v2.0**  
> 后续如有需求变更，请更新版本号并记录变更日志。