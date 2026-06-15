import React from 'react';
import { Card, Row, Col, Typography, Space, Button, Carousel, Tag } from 'antd';
import { RightOutlined, HeartOutlined, StarFilled } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Title, Text } = Typography;

const MOCK_BANNERS = [
  { id: 1, title: '夏季婚车特惠', image_url: '/banner1.jpg', link_url: '/cars', desc: '新人专享8折优惠' },
  { id: 2, title: '新人专享优惠', image_url: '/banner2.jpg', link_url: '/cars', desc: '首次预订立减500' },
  { id: 3, title: '豪华车队推荐', image_url: '/banner3.jpg', link_url: '/fleet', desc: '奔驰宝马奥迪全系' },
];

const CAR_CATEGORIES = [
  { key: 'benz', name: '奔驰', icon: '🚗', color: '#1DA57A' },
  { key: 'bmw', name: '宝马', icon: '🚗', color: '#1890FF' },
  { key: 'audi', name: '奥迪', icon: '🚗', color: '#722ED1' },
  { key: 'porsche', name: '保时捷', icon: '🏎️', color: '#EB2F96' },
  { key: 'maserati', name: '玛莎拉蒂', icon: '🏎️', color: '#FA541C' },
  { key: 'landrover', name: '路虎', icon: '🚙', color: '#52C41A' },
  { key: 'hongqi', name: '红旗', icon: '🚗', color: '#F5222D' },
  { key: 'vintage', name: '复古', icon: '🚙', color: '#8C8C8C' },
];

const USE_CASES = [
  { key: 'fleet', name: '车队套餐', desc: '主婚车+跟车组合' },
  { key: 'head', name: '头车精选', desc: '仅主婚车' },
  { key: 'economy', name: '经济实惠', desc: '高性价比车型' },
];

const HOT_CARS = Array.from({ length: 6 }, (_, i) => ({
  id: i + 1,
  brand: ['奔驰', '宝马', '奥迪', '保时捷', '玛莎拉蒂', '路虎'][i],
  model: ['S400L', '530Li', 'A8L', 'Panamera', '总裁', '揽胜'][i],
  price: 1888 + i * 500,
  rating: +(4.5 + i * 0.05).toFixed(1),
  image: `/car${i + 1}.jpg`,
  district: ['汉台区', '南郑区', '城固县', '洋县', '勉县', '西乡县'][i],
}));

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#FFF9F6]">
      {/* Banner 轮播 */}
      <section className="bg-gradient-to-r from-[#FFF1F0] via-[#FFF8F5] to-[#FFF1F0]">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="relative rounded-2xl overflow-hidden shadow-lg" style={{ border: '1px solid #F0E0D8' }}>
            <Carousel autoplay autoplaySpeed={5000}>
              {MOCK_BANNERS.map((banner) => (
                <div key={banner.id}>
                  <div
                    className="relative h-[320px] md:h-[420px] cursor-pointer"
                    onClick={() => navigate(banner.link_url)}
                    style={{
                      background: `linear-gradient(135deg, ${banner.id === 1 ? '#FFEEE8' : banner.id === 2 ? '#FFF8F0' : '#FFF0F8'}, ${banner.id === 1 ? '#FFF8F5' : banner.id === 2 ? '#FFFDF5' : '#FFF5F8'})`,
                    }}
                  >
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-5xl mb-4">
                          {banner.id === 1 ? '🎊' : banner.id === 2 ? '💑' : '🚗'}
                        </div>
                        <Title level={2} className="!text-[#A32D0A] !mb-2">{banner.title}</Title>
                        <Text className="!text-[#D4380D] text-lg">{banner.desc}</Text>
                        <div className="mt-6">
                          <Button type="primary" size="large" className="rounded-full px-8">
                            立即查看 <RightOutlined />
                          </Button>
                        </div>
                      </div>
                    </div>
                    <div className="absolute bottom-4 right-4 text-xs text-gray-400">
                      {banner.id}/{MOCK_BANNERS.length}
                    </div>
                  </div>
                </div>
              ))}
            </Carousel>
            {/* 指示器 */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {MOCK_BANNERS.map((_, idx) => (
                <div key={idx} className="w-2 h-2 rounded-full bg-[#D4380D]/40" />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 分类导航 */}
      <section className="max-w-6xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h2 className="wedding-title">车型分类</h2>
          <div className="wedding-divider max-w-xs mx-auto" />
        </div>
        <Row gutter={[16, 16]}>
          {CAR_CATEGORIES.map((cat) => (
            <Col xs={12} sm={8} md={6} lg={3} key={cat.key}>
              <Card
                hoverable
                size="small"
                className="text-center"
                onClick={() => navigate(`/cars?brand=${cat.key}`)}
                style={{ borderRadius: '12px' }}
              >
                <div className="text-3xl mb-2">{cat.icon}</div>
                <div className="font-medium text-gray-800">{cat.name}</div>
              </Card>
            </Col>
          ))}
        </Row>

        <div className="wedding-divider max-w-xs mx-auto mt-8" />

        <Row gutter={[16, 16]} className="mt-6">
          {USE_CASES.map((uc) => (
            <Col xs={24} sm={8} key={uc.key}>
              <Card
                hoverable
                onClick={() => navigate(`/cars?type=${uc.key}`)}
                style={{
                  borderRadius: '12px',
                  background: uc.key === 'fleet' ? 'linear-gradient(135deg, #FFF1F0, #FFF8F5)' : '#fff',
                  border: uc.key === 'fleet' ? '1px solid #FFCCC7' : '1px solid #F0E0D8',
                }}
              >
                <div className="text-center">
                  <div className="font-bold text-lg" style={{ color: '#D4380D' }}>{uc.name}</div>
                  <div className="text-gray-500 text-sm mt-1">{uc.desc}</div>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      </section>

      {/* 热门婚车推荐 */}
      <section className="bg-white py-12" style={{ borderTop: '1px solid #F0E0D8', borderBottom: '1px solid #F0E0D8' }}>
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="wedding-title !mb-0">热门婚车推荐</h2>
            <Button type="link" onClick={() => navigate('/cars')} className="!text-[#D4380D]">
              查看全部 <RightOutlined />
            </Button>
          </div>
          <Row gutter={[24, 24]}>
            {HOT_CARS.map((car) => (
              <Col xs={24} sm={12} md={8} key={car.id}>
                <Card
                  hoverable
                  cover={
                    <div className="h-48 bg-gradient-to-br from-[#FFEEE8] to-[#FFF8F5] flex items-center justify-center relative overflow-hidden">
                      <div className="text-5xl opacity-20 absolute">🚗</div>
                      <div className="text-center z-10">
                        <div className="text-lg font-bold text-gray-800">{car.brand}</div>
                        <div className="text-sm text-gray-500">{car.model}</div>
                      </div>
                      <Button
                        type="text"
                        icon={<HeartOutlined />}
                        className="absolute top-2 right-2 !text-gray-400 hover:!text-red-500"
                      />
                    </div>
                  }
                  onClick={() => navigate(`/car/${car.id}`)}
                  style={{ borderRadius: '12px' }}
                >
                  <div className="flex items-center justify-between mb-1">
                    <Text className="font-bold text-lg" style={{ color: '#D4380D' }}>
                      ¥{car.price.toLocaleString()} <span className="text-xs text-gray-400 font-normal">起/半天</span>
                    </Text>
                    <Space size={4}>
                      <StarFilled className="!text-[#D4A853]" />
                      <Text className="text-sm">{car.rating}</Text>
                    </Space>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-400">
                    <span>📍 {car.district}</span>
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </section>

      {/* 精选商家 */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <h2 className="wedding-title">精选商家</h2>
          <div className="wedding-divider max-w-xs mx-auto" />
        </div>
        <Row gutter={[24, 24]}>
          {['汉中至尊婚车车队', '汉中豪华婚车行', '汉中温馨婚车租赁'].map((name, idx) => (
            <Col xs={24} sm={8} key={idx}>
              <Card hoverable style={{ borderRadius: '12px' }} onClick={() => navigate(`/shop/${idx + 1}`)}>
                <div className="flex items-center gap-3">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#FF6B35] to-[#D4380D] flex items-center justify-center text-white text-2xl font-bold">
                    {name[2]}
                  </div>
                  <div>
                    <div className="font-bold text-gray-800">{name}</div>
                    <div className="text-sm text-gray-400">⭐⭐⭐⭐ {4.7 + idx * 0.1}</div>
                    <div className="text-xs text-gray-400">已接单 {50 + idx * 30} 次</div>
                  </div>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      </section>

      {/* Loading state is handled by Ant Design's Spin internally */}
      {/* Error state */}
      <div id="error-state" className="hidden">
        <div className="text-center py-12">
          <div className="text-4xl mb-4">😅</div>
          <div className="text-gray-500 mb-4">加载失败，请稍后重试</div>
          <Button onClick={() => window.location.reload()}>重新加载</Button>
        </div>
      </div>

      {/* Empty state */}
      <div id="empty-state" className="hidden">
        <div className="text-center py-12">
          <div className="text-4xl mb-4">📭</div>
          <div className="text-gray-500">暂无推荐车辆</div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;