import React, { useState } from 'react';
import { Card, Row, Col, Button, Typography, Rate, Tag, Tabs, Calendar, List, Space, Divider, Badge } from 'antd';
import { HeartOutlined, HeartFilled, PhoneOutlined, EnvironmentOutlined, StarFilled } from '@ant-design/icons';
import { useNavigate, useParams } from 'react-router-dom';

const { Title, Text, Paragraph } = Typography;

const MOCK_REVIEWS = [
  { id: 1, user: '张女士', rating: 5, content: '车辆很新，准时到达，服务态度非常好！推荐！', date: '2026-05-20' },
  { id: 2, user: '李先生', rating: 5, content: '服务很好，推荐！', date: '2026-04-15' },
];

const CarDetailPage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [selectedPackage, setSelectedPackage] = useState<string>('half_day');

  const packages = [
    { key: 'half_day', name: '半天套餐', desc: '4小时 / 50km内', price: 1888 },
    { key: 'full_day', name: '全天套餐', desc: '8小时 / 100km内', price: 3288 },
    { key: 'fleet', name: '车队套餐', desc: '主婚车+跟车×3', price: 6666 },
  ];

  const selectedPkg = packages.find(p => p.key === selectedPackage);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <Row gutter={[32, 32]}>
        <Col xs={24} lg={14}>
          {/* 主图 */}
          <div className="rounded-2xl overflow-hidden mb-4 shadow-lg" style={{ border: '1px solid #F0E0D8' }}>
            <div className="h-[400px] bg-gradient-to-br from-[#FFEEE8] to-[#FFF8F5] flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl mb-4">🚗</div>
                <Title level={3} className="!text-gray-800">奔驰 S400L</Title>
                <Text className="!text-gray-500">2023年 · 黑色 · 5座</Text>
              </div>
            </div>
          </div>
          <Row gutter={8}>
            {[1, 2, 3].map(i => (
              <Col span={8} key={i}>
                <div className="rounded-lg overflow-hidden h-20 bg-[#FFF1F0] flex items-center justify-center cursor-pointer border border-[#F0E0D8]">
                  <Text className="text-gray-400">📷 {i}</Text>
                </div>
              </Col>
            ))}
          </Row>
        </Col>

        <Col xs={24} lg={10}>
          <Title level={3} className="!text-gray-800 !mb-2">奔驰 S400L · 黑色 · 5座</Title>
          <Space className="mb-4">
            <StarFilled className="!text-[#D4A853]" />
            <Text strong>4.8</Text>
            <Text className="text-gray-400">(36条评价)</Text>
            <Badge count="已服务128次" style={{ backgroundColor: '#FFF1F0', color: '#D4380D', border: '1px solid #FFCCC7' }} />
          </Space>

          <div className="bg-[#FFF8F5] rounded-xl p-4 mb-6" style={{ border: '1px solid #F0E0D8' }}>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div><Text className="text-gray-400">品牌：</Text><Text>奔驰</Text></div>
              <div><Text className="text-gray-400">型号：</Text><Text>S400L</Text></div>
              <div><Text className="text-gray-400">年份：</Text><Text>2023</Text></div>
              <div><Text className="text-gray-400">颜色：</Text><Text>黑色</Text></div>
              <div><Text className="text-gray-400">座位：</Text><Text>5座</Text></div>
              <div><Text className="text-gray-400">变速箱：</Text><Text>自动</Text></div>
            </div>
          </div>

          {/* 套餐选择 */}
          <Title level={5} className="!text-gray-700 !mb-3">服务套餐</Title>
          <div className="space-y-3 mb-6">
            {packages.map(pkg => (
              <Card
                key={pkg.key}
                hoverable
                size="small"
                className={`cursor-pointer ${selectedPackage === pkg.key ? 'border-2 border-[#D4380D]' : ''}`}
                onClick={() => setSelectedPackage(pkg.key)}
                style={{ borderRadius: '12px' }}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <Text strong>{pkg.name}</Text>
                    <div className="text-xs text-gray-400">{pkg.desc}</div>
                  </div>
                  <div>
                    <Text className="text-xl font-bold" style={{ color: '#D4380D' }}>¥{pkg.price.toLocaleString()}</Text>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* 商家信息 */}
          <div className="bg-white rounded-xl p-4 mb-6 shadow-sm border border-[#F0E0D8]">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#FF6B35] to-[#D4380D] flex items-center justify-center text-white font-bold">汉</div>
              <div>
                <Text strong>汉中至尊婚车租赁行</Text>
                <div className="flex items-center gap-2 text-xs text-gray-400">
                  <StarFilled className="!text-[#D4A853]" /> 4.9 · 入驻6个月 · 已接单89
                </div>
              </div>
              <Button size="small" className="ml-auto">进入店铺</Button>
            </div>
            <div className="text-xs text-gray-400">
              <EnvironmentOutlined /> 汉台区滨江路 XX 号
            </div>
          </div>

          {/* 立即预订按钮 */}
          <Button
            type="primary"
            size="large"
            block
            className="h-12 text-lg rounded-xl"
            onClick={() => navigate('/order/create')}
          >
            立即预订 · ¥{(selectedPkg?.price ?? 1888).toLocaleString()}
          </Button>
        </Col>
      </Row>

      {/* 评价 */}
      <div className="mt-12">
        <Title level={4} className="!text-gray-700 !mb-4">用户评价</Title>
        <List
          itemLayout="vertical"
          dataSource={MOCK_REVIEWS}
          renderItem={(review) => (
            <List.Item>
              <div className="flex items-center justify-between mb-2">
                <Space>
                  <div className="w-8 h-8 rounded-full bg-[#FFEEE8] flex items-center justify-center text-sm font-bold text-[#D4380D]">
                    {review.user[0]}
                  </div>
                  <Text strong>{review.user}</Text>
                  <Rate disabled value={review.rating} />
                </Space>
                <Text className="text-xs text-gray-400">{review.date}</Text>
              </div>
              <Text>{review.content}</Text>
            </List.Item>
          )}
        />
        <Button type="link" className="!text-[#D4380D]">查看全部评价 ▸</Button>
      </div>
    </div>
  );
};

export default CarDetailPage;