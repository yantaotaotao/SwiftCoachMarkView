import React from 'react';
import { Card, Row, Col, Button, Typography, Tag, Steps, Divider, Space, Timeline, message } from 'antd';
import { PhoneOutlined, EnvironmentOutlined, ClockCircleOutlined, RightOutlined } from '@ant-design/icons';
import { useNavigate, useParams } from 'react-router-dom';

const { Title, Text } = Typography;

const STATUS_MAP: Record<string, { label: string; color: string }> = {
  pending_pay: { label: '待付款', color: '#faad14' },
  pending_confirm: { label: '待确认', color: '#1890ff' },
  confirmed: { label: '已确认', color: '#52c41a' },
  in_progress: { label: '进行中', color: '#722ed1' },
  completed: { label: '已完成', color: '#8c8c8c' },
  cancelled: { label: '已取消', color: '#ff4d4f' },
};

const MOCK_ORDER = {
  id: 1,
  orderNo: 'LY20260615001',
  carName: '奔驰 S400L',
  carModel: 'S400L · 黑色 · 5座',
  serviceDate: '2026-06-20',
  pickupTime: '08:00',
  packageType: '半天套餐',
  pickupAddress: '汉中市汉台区XX路XX号',
  ceremonyAddress: '汉中市XX酒店',
  contactName: '张先生',
  contactPhone: '138****8888',
  totalAmount: 1888,
  depositAmount: 716,
  balanceAmount: 1172,
  status: 'pending_confirm',
  remark: '需要鲜花装饰',
  createdAt: '2026-06-15 08:30:00',
  paidAt: '2026-06-15 08:32:00',
};

const MOCK_TIMELINE = [
  { time: '2026-06-15 08:32:00', action: '支付成功', desc: '已支付定金 ¥716' },
  { time: '2026-06-15 08:30:00', action: '提交订单', desc: '订单已提交' },
];

const UserOrderDetailPage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const statusInfo = STATUS_MAP[MOCK_ORDER.status];

  const handleAction = (action: string) => {
    message.success(`${action}成功`);
  };

  return (
    <div className="min-h-screen bg-[#FFF9F6] py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* 状态头部 */}
        <Card
          className="rounded-xl shadow-sm mb-6"
          style={{ border: '1px solid #F0E0D8' }}
        >
          <div className="flex items-center justify-between">
            <div>
              <Space className="mb-2">
                <Title level={4} className="!mb-0 !text-gray-800">{MOCK_ORDER.carName}</Title>
                <Tag color={statusInfo.color}>{statusInfo.label}</Tag>
              </Space>
              <div className="text-sm text-gray-400">
                订单号：{MOCK_ORDER.orderNo}
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold" style={{ color: '#D4380D' }}>
                ¥{MOCK_ORDER.totalAmount.toLocaleString()}
              </div>
              <Text className="text-xs text-gray-400">已付定金 ¥{MOCK_ORDER.depositAmount}</Text>
            </div>
          </div>
        </Card>

        <Row gutter={[24, 24]}>
          <Col xs={24} lg={16}>
            {/* 服务信息 */}
            <Card
              title={<span className="text-base font-medium">服务信息</span>}
              className="rounded-xl shadow-sm mb-6"
              style={{ border: '1px solid #F0E0D8' }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Text className="text-gray-400 block text-sm">服务日期</Text>
                  <Text strong><ClockCircleOutlined /> {MOCK_ORDER.serviceDate} {MOCK_ORDER.pickupTime}</Text>
                </div>
                <div>
                  <Text className="text-gray-400 block text-sm">服务套餐</Text>
                  <Text strong>{MOCK_ORDER.packageType}</Text>
                </div>
                <div>
                  <Text className="text-gray-400 block text-sm">接亲地址</Text>
                  <Text strong><EnvironmentOutlined /> {MOCK_ORDER.pickupAddress}</Text>
                </div>
                <div>
                  <Text className="text-gray-400 block text-sm">仪式酒店</Text>
                  <Text strong><EnvironmentOutlined /> {MOCK_ORDER.ceremonyAddress}</Text>
                </div>
                <div>
                  <Text className="text-gray-400 block text-sm">联系人</Text>
                  <Text strong>{MOCK_ORDER.contactName}</Text>
                </div>
                <div>
                  <Text className="text-gray-400 block text-sm">联系电话</Text>
                  <Text strong><PhoneOutlined /> {MOCK_ORDER.contactPhone}</Text>
                </div>
              </div>
              {MOCK_ORDER.remark && (
                <div className="mt-4 p-3 bg-[#FFF8F5] rounded-lg">
                  <Text className="text-gray-400 text-sm">备注：</Text>
                  <Text>{MOCK_ORDER.remark}</Text>
                </div>
              )}
            </Card>

            {/* 状态时间线 */}
            <Card
              title={<span className="text-base font-medium">订单状态</span>}
              className="rounded-xl shadow-sm"
              style={{ border: '1px solid #F0E0D8' }}
            >
              <Timeline
                items={MOCK_TIMELINE.map(item => ({
                  children: (
                    <div>
                      <Text strong>{item.action}</Text>
                      <div className="text-xs text-gray-400">{item.time}</div>
                      <Text className="text-sm">{item.desc}</Text>
                    </div>
                  ),
                }))}
              />
            </Card>
          </Col>

          {/* 右侧操作 */}
          <Col xs={24} lg={8}>
            <Card
              title={<span className="text-base font-medium">操作</span>}
              className="rounded-xl shadow-sm mb-6"
              style={{ border: '1px solid #F0E0D8' }}
            >
              {MOCK_ORDER.status === 'pending_pay' && (
                <Button type="primary" block size="large" className="rounded-lg mb-3" onClick={() => navigate(`/order/pay/${MOCK_ORDER.orderNo}`)}>
                  去支付 ¥{MOCK_ORDER.depositAmount}
                </Button>
              )}
              {MOCK_ORDER.status === 'pending_confirm' && (
                <div className="text-center text-gray-400 py-4">
                  <ClockCircleOutlined className="text-3xl mb-2" />
                  <div>等待商家确认中...</div>
                </div>
              )}
              {MOCK_ORDER.status === 'completed' && (
                <Button type="primary" block size="large" className="rounded-lg mb-3">
                  去评价
                </Button>
              )}
              {!['cancelled', 'completed'].includes(MOCK_ORDER.status) && (
                <Button danger block className="rounded-lg" onClick={() => handleAction('取消订单')}>
                  取消订单
                </Button>
              )}
            </Card>

            <Card
              title={<span className="text-base font-medium">费用明细</span>}
              className="rounded-xl shadow-sm"
              style={{ border: '1px solid #F0E0D8' }}
            >
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Text className="text-gray-400">租金</Text>
                  <Text>¥{MOCK_ORDER.totalAmount.toLocaleString()}</Text>
                </div>
                <div className="flex justify-between">
                  <Text className="text-gray-400">定金（30%）</Text>
                  <Text style={{ color: '#D4380D' }}>¥{MOCK_ORDER.depositAmount.toLocaleString()}</Text>
                </div>
                <div className="flex justify-between">
                  <Text className="text-gray-400">尾款</Text>
                  <Text>¥{MOCK_ORDER.balanceAmount.toLocaleString()}</Text>
                </div>
                <Divider className="my-2" />
                <div className="flex justify-between">
                  <Text className="font-bold">合计</Text>
                  <Text className="font-bold" style={{ color: '#D4380D' }}>¥{MOCK_ORDER.totalAmount.toLocaleString()}</Text>
                </div>
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default UserOrderDetailPage;