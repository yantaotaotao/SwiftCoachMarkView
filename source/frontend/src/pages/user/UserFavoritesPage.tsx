import React, { useState } from 'react';
import { Card, Row, Col, Button, Typography, Space, Empty, Pagination, message } from 'antd';
import { HeartFilled, StarFilled, DeleteOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Title, Text } = Typography;

const MOCK_FAVORITES = Array.from({ length: 8 }, (_, i) => ({
  id: i + 1,
  brand: ['奔驰', '宝马', '奥迪', '保时捷', '玛莎拉蒂', '路虎', '红旗', '复古'][i],
  model: ['S400L', '530Li', 'A8L', 'Panamera', '总裁', '揽胜', 'H9', '老爷车'][i],
  price: 888 + i * 400,
  rating: +(4.5 + (i % 5) * 0.1).toFixed(1),
  district: ['汉台区', '南郑区', '城固县', '洋县', '勉县', '西乡县', '宁强县', '略阳县'][i],
}));

const UserFavoritesPage: React.FC = () => {
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState(MOCK_FAVORITES);

  const handleRemove = (id: number) => {
    setFavorites(prev => prev.filter(f => f.id !== id));
    message.success('已取消收藏');
  };

  return (
    <div className="min-h-screen bg-[#FFF9F6] py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <Title level={4} className="!mb-0 !text-gray-800">
            <HeartFilled className="!text-[#D4380D] mr-2" />
            我的收藏
          </Title>
          <Text className="text-gray-400">共 {favorites.length} 辆</Text>
        </div>

        {favorites.length > 0 ? (
          <>
            <Row gutter={[24, 24]}>
              {favorites.map(car => (
                <Col xs={24} sm={12} md={8} lg={6} key={car.id}>
                  <Card
                    hoverable
                    className="h-full"
                    cover={
                      <div className="h-40 bg-gradient-to-br from-[#FFEEE8] to-[#FFF8F5] flex items-center justify-center relative">
                        <div className="text-center">
                          <div className="text-3xl">🚗</div>
                          <div className="font-bold text-gray-800 mt-1">{car.brand} {car.model}</div>
                        </div>
                        <Button
                          type="text"
                          icon={<DeleteOutlined />}
                          className="absolute top-2 right-2 !text-gray-400 hover:!text-red-500"
                          onClick={(e) => { e.stopPropagation(); handleRemove(car.id); }}
                        />
                      </div>
                    }
                    onClick={() => navigate(`/car/${car.id}`)}
                    style={{ borderRadius: '12px' }}
                  >
                    <div className="flex items-center justify-between">
                      <Text className="font-bold text-lg" style={{ color: '#D4380D' }}>
                        ¥{car.price.toLocaleString()} <span className="text-xs text-gray-400 font-normal">起</span>
                      </Text>
                      <Space size={4}>
                        <StarFilled className="!text-[#D4A853]" />
                        <Text className="text-sm">{car.rating}</Text>
                      </Space>
                    </div>
                    <div className="text-xs text-gray-400 mt-1">📍 {car.district}</div>
                  </Card>
                </Col>
              ))}
            </Row>
            <div className="flex justify-center mt-8">
              <Pagination defaultCurrent={1} total={favorites.length} pageSize={8} showSizeChanger={false} />
            </div>
          </>
        ) : (
          <Card className="rounded-xl" style={{ border: '1px solid #F0E0D8' }}>
            <Empty
              image={<HeartFilled className="text-5xl text-gray-300" />}
              description={
                <div>
                  <div className="text-gray-400 mb-4">还没有收藏的婚车</div>
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

export default UserFavoritesPage;