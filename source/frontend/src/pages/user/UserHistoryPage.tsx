import React, { useState } from 'react';
import { Card, Row, Col, Button, Typography, Space, Empty, message } from 'antd';
import { HistoryOutlined, StarFilled, DeleteOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Title, Text } = Typography;

const MOCK_HISTORY = Array.from({ length: 6 }, (_, i) => ({
  id: 6 - i,
  brand: ['奔驰', '宝马', '奥迪', '保时捷', '玛莎拉蒂', '路虎'][i],
  model: ['S400L', '530Li', 'A8L', 'Panamera', '总裁', '揽胜'][i],
  price: 1888 + i * 400,
  rating: +(4.5 + (i % 5) * 0.1).toFixed(1),
  viewedAt: `2026-06-${15 - i}`,
}));

const UserHistoryPage: React.FC = () => {
  const navigate = useNavigate();
  const [history, setHistory] = useState(MOCK_HISTORY);

  const clearAll = () => {
    setHistory([]);
    message.success('已清除浏览记录');
  };

  return (
    <div className="min-h-screen bg-[#FFF9F6] py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <Title level={4} className="!mb-0 !text-gray-800">
            <HistoryOutlined className="!text-[#D4380D] mr-2" />
            浏览记录
          </Title>
          {history.length > 0 && (
            <Button danger onClick={clearAll} icon={<DeleteOutlined />}>
              清除记录
            </Button>
          )}
        </div>

        {history.length > 0 ? (
          <Row gutter={[24, 24]}>
            {history.map(car => (
              <Col xs={24} sm={12} md={8} lg={6} key={car.id}>
                <Card
                  hoverable
                  cover={
                    <div className="h-40 bg-gradient-to-br from-[#FFEEE8] to-[#FFF8F5] flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-3xl">🚗</div>
                        <div className="font-bold text-gray-800 mt-1">{car.brand} {car.model}</div>
                      </div>
                    </div>
                  }
                  onClick={() => navigate(`/car/${car.id}`)}
                  style={{ borderRadius: '12px' }}
                >
                  <div className="flex items-center justify-between mb-1">
                    <Text className="font-bold" style={{ color: '#D4380D' }}>
                      ¥{car.price.toLocaleString()} <span className="text-xs text-gray-400 font-normal">起</span>
                    </Text>
                    <Space size={4}>
                      <StarFilled className="!text-[#D4A853]" />
                      <Text className="text-sm">{car.rating}</Text>
                    </Space>
                  </div>
                  <div className="text-xs text-gray-400">浏览于 {car.viewedAt}</div>
                </Card>
              </Col>
            ))}
          </Row>
        ) : (
          <Card className="rounded-xl" style={{ border: '1px solid #F0E0D8' }}>
            <Empty
              image={<HistoryOutlined className="text-5xl text-gray-300" />}
              description={
                <div>
                  <div className="text-gray-400 mb-4">暂无浏览记录</div>
                  <Button type="primary" onClick={() => navigate('/cars')}>去浏览婚车</Button>
                </div>
              }
              className="py-16"
            />
          </Card>
        )}
      </div>
    </div>
  );
};

export default UserHistoryPage;