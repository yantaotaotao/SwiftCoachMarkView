import React, { useState } from 'react';
import { Card, Tabs, List, Tag, Button, Typography, Space, Empty, Rate } from 'antd';
import { RightOutlined, StarFilled } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Text } = Typography;

const ORDER_STATUS_MAP: Record<string, { label: string; color: string }> = {
  pending_pay: { label: '待付款', color: '#faad14' },
  pending_confirm: { label: '待确认', color: '#1890ff' },
  confirmed: { label: '已确认', color: '#52c41a' },
  in_progress: { label: '进行中', color: '#722ed1' },
  completed: { label: '已完成', color: '#8c8c8c' },
  cancelled: { label: '已取消', color: '#ff4d4f' },
};

const MOCK_ORDERS = Array.from({ length: 10 }, (_, i) => ({
  id: i + 1,
  orderNo: `LY2026061500${String(i + 1).padStart(3, '0')}`,
  carName: ['奔驰 S400L', '宝马 530Li', '奥迪 A8L', '保时捷 Panamera'][i % 4],
  serviceDate: `2026-06-${20 + (i % 10)}`,
  packageType: ['半天套餐', '全天套餐', '车队套餐'][i % 3],
  totalAmount: 1888 + i * 500,
  payAmount: Math.round((1888 + i * 500) * 0.3),
  status: ['pending_pay', 'pending_confirm', 'confirmed', 'in_progress', 'completed', 'cancelled'][i % 6],
  image: `/car${(i % 4) + 1}.jpg`,
}));

const TABS = [
  { key: 'all', label: '全部' },
  { key: 'pending_pay', label: '待付款' },
  { key: 'pending_confirm', label: '待确认' },
  { key: 'confirmed', label: '已确认' },
  { key: 'in_progress', label: '进行中' },
  { key: 'completed', label: '已完成' },
  { key: 'cancelled', label: '已取消' },
];

const UserOrdersPage: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('all');

  const filteredOrders = activeTab === 'all'
    ? MOCK_ORDERS
    : MOCK_ORDERS.filter(o => o.status === activeTab);

  return (
    <div className="min-h-screen bg-[#FFF9F6] py-8">
      <div className="max-w-4xl mx-auto px-4">
        <Card
          className="rounded-xl shadow-sm"
          style={{ border: '1px solid #F0E0D8' }}
        >
          <Tabs
            activeKey={activeTab}
            onChange={setActiveTab}
            tabBarStyle={{ marginBottom: 16 }}
            items={TABS.map(tab => ({
              key: tab.key,
              label: tab.label,
              children: (
                <List
                  dataSource={filteredOrders}
                  locale={{ emptyText: <Empty description="暂无订单" /> }}
                  renderItem={(order) => {
                    const statusInfo = ORDER_STATUS_MAP[order.status];
                    return (
                      <List.Item
                        className="cursor-pointer hover:bg-[#FFF8F5] px-4 rounded-lg transition-colors"
                        onClick={() => navigate(`/user/orders/${order.id}`)}
                      >
                        <div className="w-full flex items-start gap-4">
                          <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-[#FFEEE8] to-[#FFF8F5] flex items-center justify-center flex-shrink-0">
                            <div className="text-2xl">🚗</div>
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-1">
                              <Text strong className="text-base">{order.carName}</Text>
                              <Tag color={statusInfo.color}>{statusInfo.label}</Tag>
                            </div>
                            <div className="text-sm text-gray-400 mb-1">
                              {order.serviceDate} · {order.packageType}
                            </div>
                            <div className="flex items-center justify-between">
                              <Text className="font-bold" style={{ color: '#D4380D' }}>
                                ¥{order.totalAmount.toLocaleString()}
                              </Text>
                              <Button type="link" className="!text-[#D4380D]" size="small">
                                查看详情 <RightOutlined />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </List.Item>
                    );
                  }}
                />
              ),
            }))}
          />
        </Card>
      </div>
    </div>
  );
};

export default UserOrdersPage;