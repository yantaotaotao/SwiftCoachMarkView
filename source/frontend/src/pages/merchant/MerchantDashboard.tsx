import React from 'react';
import { Card, Row, Col, Statistic, Typography, List, Tag, Button, Space } from 'antd';
import { CarOutlined, ShoppingCartOutlined, DollarOutlined, CheckCircleOutlined, ClockCircleOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Title, Text } = Typography;

const MerchantDashboard: React.FC = () => {
  const navigate = useNavigate();

  const recentOrders = [
    { id: 1, car: '奔驰S400L', user: '张女士', date: '06-15', status: 'pending', statusLabel: '待确认' },
    { id: 2, car: '宝马530Li', user: '李先生', date: '06-18', status: 'confirmed', statusLabel: '已确认' },
    { id: 3, car: '奥迪A8L', user: '王先生', date: '06-20', status: 'in_progress', statusLabel: '进行中' },
  ];

  return (
    <div className="min-h-screen bg-[#FFF9F6] py-8">
      <div className="max-w-7xl mx-auto px-4">
        <Title level={4} className="!mb-6 !text-gray-800">商家工作台</Title>

        {/* 数据概览 */}
        <Row gutter={[16, 16]} className="mb-6">
          <Col xs={12} lg={3}>
            <Card className="rounded-xl text-center" style={{ border: '1px solid #F0E0D8' }}>
              <Statistic title="今日待确认" value={3} valueStyle={{ color: '#faad14' }} prefix={<ClockCircleOutlined />} />
            </Card>
          </Col>
          <Col xs={12} lg={3}>
            <Card className="rounded-xl text-center" style={{ border: '1px solid #F0E0D8' }}>
              <Statistic title="进行中" value={2} valueStyle={{ color: '#1890ff' }} prefix={<ShoppingCartOutlined />} />
            </Card>
          </Col>
          <Col xs={12} lg={3}>
            <Card className="rounded-xl text-center" style={{ border: '1px solid #F0E0D8' }}>
              <Statistic title="本月收入" value={18888} precision={0} prefix="¥" valueStyle={{ color: '#52c41a' }} />
            </Card>
          </Col>
          <Col xs={12} lg={3}>
            <Card className="rounded-xl text-center" style={{ border: '1px solid #F0E0D8' }}>
              <Statistic title="车辆总数" value={8} prefix={<CarOutlined />} valueStyle={{ color: '#D4380D' }} />
            </Card>
          </Col>
        </Row>

        <Row gutter={[24, 24]}>
          {/* 最近订单 */}
          <Col xs={24} lg={12}>
            <Card
              title={<span className="text-base font-medium">最近订单</span>}
              className="rounded-xl shadow-sm"
              style={{ border: '1px solid #F0E0D8' }}
              extra={<Button type="link" className="!text-[#D4380D]" onClick={() => navigate('/merchant/orders')}>查看全部</Button>}
            >
              <List
                dataSource={recentOrders}
                renderItem={(order) => (
                  <List.Item
                    actions={[
                      order.status === 'pending' ? (
                        <Space>
                          <Button type="primary" size="small" className="rounded">接单</Button>
                          <Button size="small" danger className="rounded">拒单</Button>
                        </Space>
                      ) : (
                        <Tag color={order.status === 'confirmed' ? 'green' : 'blue'}>{order.statusLabel}</Tag>
                      ),
                    ]}
                  >
                    <List.Item.Meta
                      avatar={<div className="w-10 h-10 rounded-lg bg-[#FFEEE8] flex items-center justify-center">🚗</div>}
                      title={order.car}
                      description={`${order.user} · ${order.date}`}
                    />
                  </List.Item>
                )}
              />
            </Card>
          </Col>

          {/* 数据概览图表占位 */}
          <Col xs={24} lg={12}>
            <Card
              title={<span className="text-base font-medium">数据概览</span>}
              className="rounded-xl shadow-sm"
              style={{ border: '1px solid #F0E0D8' }}
            >
              <div className="grid grid-cols-2 gap-4 text-center">
                <div className="p-6 bg-gradient-to-br from-[#FFF1F0] to-[#FFF8F5] rounded-xl">
                  <Text className="text-2xl font-bold" style={{ color: '#D4380D' }}>28</Text>
                  <div className="text-sm text-gray-400">本月订单</div>
                </div>
                <div className="p-6 bg-gradient-to-br from-[#FFF8F5] to-[#FFF1F0] rounded-xl">
                  <Text className="text-2xl font-bold" style={{ color: '#D4380D' }}>96%</Text>
                  <div className="text-sm text-gray-400">完成率</div>
                </div>
                <div className="p-6 bg-gradient-to-br from-[#FFF1F0] to-[#FFF8F5] rounded-xl">
                  <Text className="text-2xl font-bold" style={{ color: '#D4380D' }}>4.8</Text>
                  <div className="text-sm text-gray-400">综合评分</div>
                </div>
                <div className="p-6 bg-gradient-to-br from-[#FFF8F5] to-[#FFF1F0] rounded-xl">
                  <Text className="text-2xl font-bold" style={{ color: '#D4380D' }}>32</Text>
                  <div className="text-sm text-gray-400">累计评价</div>
                </div>
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default MerchantDashboard;