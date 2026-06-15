import React from 'react';
import { Card, Row, Col, Statistic, Typography, Table } from 'antd';
import { UserOutlined, ShopOutlined, CarOutlined, DollarOutlined, ShoppingCartOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

const AdminDashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#FFF9F6] py-8">
      <div className="max-w-7xl mx-auto px-4">
        <Title level={4} className="!mb-6 !text-gray-800">运营看板</Title>

        <Row gutter={[16, 16]} className="mb-6">
          {[
            { title: '注册用户', value: 1288, icon: <UserOutlined />, color: '#1890ff' },
            { title: '入驻商家', value: 36, icon: <ShopOutlined />, color: '#52c41a' },
            { title: '上架车辆', value: 128, icon: <CarOutlined />, color: '#D4380D' },
            { title: '本月订单', value: 286, icon: <ShoppingCartOutlined />, color: '#722ed1' },
            { title: '本月GMV', value: 688888, icon: <DollarOutlined />, color: '#faad14', prefix: '¥' },
            { title: '平台收入', value: 68888, icon: <DollarOutlined />, color: '#52c41a', prefix: '¥' },
          ].map((item, idx) => (
            <Col xs={12} sm={8} lg={4} key={idx}>
              <Card className="rounded-xl text-center" style={{ border: '1px solid #F0E0D8' }}>
                <Statistic
                  title={item.title}
                  value={item.value}
                  precision={0}
                  prefix={item.prefix || item.icon}
                  valueStyle={{ color: item.color, fontSize: 22 }}
                />
              </Card>
            </Col>
          ))}
        </Row>

        <Row gutter={[24, 24]}>
          <Col xs={24} lg={12}>
            <Card title="热门车型 TOP10" className="rounded-xl shadow-sm" style={{ border: '1px solid #F0E0D8' }}>
              <div className="space-y-3">
                {['奔驰S400L', '宝马530Li', '奥迪A8L', '保时捷Panamera', '路虎揽胜', '红旗H9', '玛莎拉蒂总裁', '宝马X5', '奔驰E300L', '奥迪Q7'].map((car, idx) => (
                  <div key={idx} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white ${idx < 3 ? 'bg-[#D4380D]' : 'bg-gray-300'}`}>
                        {idx + 1}
                      </span>
                      <Text>{car}</Text>
                    </div>
                    <Text className="text-sm text-gray-400">{50 - idx * 5}次</Text>
                  </div>
                ))}
              </div>
            </Card>
          </Col>

          <Col xs={24} lg={12}>
            <Card title="热门区域分布" className="rounded-xl shadow-sm" style={{ border: '1px solid #F0E0D8' }}>
              <div className="space-y-3">
                {[
                  { district: '汉台区', count: 128, pct: 35 },
                  { district: '南郑区', count: 86, pct: 24 },
                  { district: '城固县', count: 52, pct: 14 },
                  { district: '洋县', count: 38, pct: 10 },
                  { district: '勉县', count: 32, pct: 9 },
                  { district: '其他', count: 28, pct: 8 },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <Text className="w-16 text-gray-500">{item.district}</Text>
                    <div className="flex-1 h-4 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-[#D4380D] to-[#FF6B35]"
                        style={{ width: `${item.pct}%` }}
                      />
                    </div>
                    <Text className="text-sm text-gray-400 w-16 text-right">{item.count}单</Text>
                  </div>
                ))}
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default AdminDashboard;