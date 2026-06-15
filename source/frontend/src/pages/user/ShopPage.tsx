import React from 'react';
import { Card, Row, Col, Button, Typography, Tag, Tabs, List, Rate, Divider, Space } from 'antd';
import { PhoneOutlined, EnvironmentOutlined, StarFilled, SafetyCertificateOutlined } from '@ant-design/icons';
import { useNavigate, useParams } from 'react-router-dom';

const { Title, Text } = Typography;

const MOCK_CARS = Array.from({ length: 6 }, (_, i) => ({
  id: i + 1,
  brand: ['奔驰', '宝马', '奥迪', '保时捷', '路虎', '红旗'][i],
  model: ['S400L', '530Li', 'A8L', 'Panamera', '揽胜', 'H9'][i],
  price: 1888 + i * 400,
  rating: +(4.5 + (i % 5) * 0.1).toFixed(1),
  orders: 30 + i * 10,
}));

const ShopPage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  return (
    <div className="min-h-screen bg-[#FFF9F6]">
      {/* 商家封面 */}
      <div className="h-56 bg-gradient-to-r from-[#D4380D] via-[#FF6B35] to-[#D4380D] relative">
        <div className="absolute inset-0 bg-black/10" />
        <div className="absolute -bottom-16 left-8 flex items-end gap-6">
          <div className="w-28 h-28 rounded-2xl bg-white shadow-xl flex items-center justify-center text-4xl font-bold text-[#D4380D] border-4 border-white">
            汉
          </div>
          <div className="pb-2">
            <Title level={3} className="!text-white !mb-1">汉中至尊婚车租赁行</Title>
            <Space className="text-white/80 text-sm">
              <StarFilled className="!text-[#D4A853]" />
              <span>4.9</span>
              <span>· 入驻6个月</span>
              <span>· 已接单89次</span>
            </Space>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 pt-24 pb-12">
        <Row gutter={[24, 24]}>
          <Col xs={24} lg={16}>
            {/* 商家信息 */}
            <Card
              className="rounded-xl shadow-sm mb-6"
              style={{ border: '1px solid #F0E0D8' }}
            >
              <div className="flex items-center gap-4 mb-4">
                <SafetyCertificateOutlined className="text-3xl text-[#52c41a]" />
                <div>
                  <Text strong className="text-base">资质认证商家</Text>
                  <div className="text-xs text-gray-400">已通过营业执照认证和身份认证</div>
                </div>
              </div>
              <Divider />
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <Text className="text-gray-400">📍 地址：</Text>
                  <Text>汉台区滨江路XX号</Text>
                </div>
                <div>
                  <Text className="text-gray-400">📞 电话：</Text>
                  <Text>153XXXXXXXX</Text>
                </div>
                <div>
                  <Text className="text-gray-400">⏰ 营业时间：</Text>
                  <Text>08:00 - 22:00</Text>
                </div>
                <div>
                  <Text className="text-gray-400">📝 描述：</Text>
                  <Text>汉中本地专业婚车服务商，拥有多款豪华婚车</Text>
                </div>
              </div>
            </Card>

            {/* 车辆列表 */}
            <Card
              title={<span className="text-base font-medium">店铺车辆（{MOCK_CARS.length}辆）</span>}
              className="rounded-xl shadow-sm"
              style={{ border: '1px solid #F0E0D8' }}
            >
              <Row gutter={[16, 16]}>
                {MOCK_CARS.map(car => (
                  <Col xs={24} sm={12} key={car.id}>
                    <Card
                      hoverable
                      size="small"
                      onClick={() => navigate(`/car/${car.id}`)}
                      style={{ borderRadius: '12px' }}
                    >
                      <div className="flex gap-3">
                        <div className="w-24 h-20 rounded-lg bg-gradient-to-br from-[#FFEEE8] to-[#FFF8F5] flex items-center justify-center flex-shrink-0">
                          <div className="text-2xl">🚗</div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <Text strong>{car.brand} {car.model}</Text>
                          <div className="flex items-center gap-2 text-xs text-gray-400">
                            <StarFilled className="!text-[#D4A853]" />
                            <span>{car.rating}</span>
                            <span>· 已服务{car.orders}次</span>
                          </div>
                          <Text className="font-bold" style={{ color: '#D4380D' }}>
                            ¥{car.price.toLocaleString()} <span className="text-xs font-normal text-gray-400">起</span>
                          </Text>
                        </div>
                      </div>
                    </Card>
                  </Col>
                ))}
              </Row>
            </Card>
          </Col>

          {/* 右侧联系卡片 */}
          <Col xs={24} lg={8}>
            <div className="sticky top-24">
              <Card
                className="rounded-xl shadow-sm text-center"
                style={{ border: '1px solid #F0E0D8' }}
              >
                <Button
                  type="primary"
                  size="large"
                  block
                  icon={<PhoneOutlined />}
                  className="rounded-lg h-12 mb-3"
                >
                  拨打电话咨询
                </Button>
                <Button
                  block
                  size="large"
                  className="rounded-lg h-12"
                  onClick={() => navigate('/cars')}
                >
                  浏览更多车辆
                </Button>
                <Divider />
                <div className="text-left text-sm text-gray-400">
                  <div className="mb-2">💡 温馨提示</div>
                  <div>· 直接拨打商家电话咨询</div>
                  <div>· 在线预订享平台保障</div>
                  <div>· 已通过资质认证，放心交易</div>
                </div>
              </Card>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default ShopPage;