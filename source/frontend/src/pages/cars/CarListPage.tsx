import React, { useState } from 'react';
import { Card, Row, Col, Select, Slider, Checkbox, Input, Button, Space, Typography, Rate, Pagination, Empty, Tag } from 'antd';
import { SearchOutlined, HeartOutlined, StarFilled, FilterOutlined, AppstoreOutlined, UnorderedListOutlined } from '@ant-design/icons';
import { useNavigate, useSearchParams } from 'react-router-dom';

const { Title, Text } = Typography;

const MOCK_CARS = Array.from({ length: 12 }, (_, i) => ({
  id: i + 1,
  brand: ['奔驰', '宝马', '奥迪', '保时捷', '玛莎拉蒂', '路虎', '红旗', '复古'][i % 8],
  model: ['S400L', '530Li', 'A8L', 'Panamera', '总裁', '揽胜', 'H9', '老爷车'][i % 8],
  color: ['黑色', '白色', '红色', '银色'][i % 4],
  seats: [4, 5, 5, 4, 4, 5, 5, 4][i % 8],
  price: 888 + i * 300,
  rating: +(4.5 + (i % 5) * 0.1).toFixed(1),
  orders: 20 + i * 10,
  image: `/car${i + 1}.jpg`,
  district: ['汉台区', '南郑区', '城固县', '洋县'][i % 4],
}));

const BRANDS = ['奔驰', '宝马', '奥迪', '保时捷', '玛莎拉蒂', '路虎', '红旗', '复古'];
const COLORS = ['黑色', '白色', '红色', '银色'];

const CarListPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000]);
  const [sortBy, setSortBy] = useState('综合推荐');
  const [page, setPage] = useState(1);
  const pageSize = 12;

  const filteredCars = MOCK_CARS
    .filter(c => selectedBrands.length === 0 || selectedBrands.includes(c.brand))
    .filter(c => c.price >= priceRange[0] && c.price <= priceRange[1]);

  const sortedCars = [...filteredCars].sort((a, b) => {
    switch (sortBy) {
      case '价格从低到高': return a.price - b.price;
      case '价格从高到低': return b.price - a.price;
      case '评分最高': return b.rating - a.rating;
      default: return 0;
    }
  });

  const paginatedCars = sortedCars.slice((page - 1) * pageSize, page * pageSize);
  const totalPages = Math.ceil(filteredCars.length / pageSize);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* 顶部筛选栏 */}
      <div className="bg-white rounded-xl p-6 mb-6 shadow-sm border border-[#F0E0D8]">
        <div className="flex items-center gap-2 mb-4">
          <FilterOutlined className="text-[#D4380D]" />
          <Text strong className="text-lg">筛选条件</Text>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          <div>
            <Text className="text-sm text-gray-500 block mb-1">品牌</Text>
            <Checkbox.Group
              options={BRANDS}
              value={selectedBrands}
              onChange={(vals) => setSelectedBrands(vals as string[])}
            />
          </div>
          <div>
            <Text className="text-sm text-gray-500 block mb-1">价格区间</Text>
            <Slider
              range
              min={0}
              max={10000}
              step={100}
              value={priceRange}
              onChange={(val) => setPriceRange(val as [number, number])}
              marks={{ 0: '¥0', 5000: '¥5000', 10000: '¥10000' }}
            />
          </div>
          <div>
            <Text className="text-sm text-gray-500 block mb-1">颜色</Text>
            <Select
              mode="multiple"
              placeholder="选择颜色"
              style={{ width: '100%' }}
              options={COLORS.map(c => ({ value: c, label: c }))}
            />
          </div>
          <div>
            <Text className="text-sm text-gray-500 block mb-1">排序</Text>
            <Select
              value={sortBy}
              onChange={setSortBy}
              style={{ width: '100%' }}
              options={[
                { value: '综合推荐', label: '综合推荐' },
                { value: '价格从低到高', label: '价格从低到高' },
                { value: '价格从高到低', label: '价格从高到低' },
                { value: '评分最高', label: '评分最高' },
              ]}
            />
          </div>
        </div>
        <div className="flex justify-between items-center">
          <Text className="text-sm text-gray-400">共 {filteredCars.length} 辆车</Text>
          <Space>
            <Button
              type={viewMode === 'grid' ? 'primary' : 'default'}
              icon={<AppstoreOutlined />}
              size="small"
              onClick={() => setViewMode('grid')}
            />
            <Button
              type={viewMode === 'list' ? 'primary' : 'default'}
              icon={<UnorderedListOutlined />}
              size="small"
              onClick={() => setViewMode('list')}
            />
          </Space>
        </div>
      </div>

      {/* 车辆列表 */}
      {paginatedCars.length > 0 ? (
        <Row gutter={[24, 24]}>
          {paginatedCars.map((car) => (
            <Col xs={24} sm={viewMode === 'grid' ? 12 : 24} md={viewMode === 'grid' ? 8 : 24} lg={viewMode === 'grid' ? 6 : 24} key={car.id}>
              <Card
                hoverable
                className={viewMode === 'list' ? 'flex-row' : ''}
                cover={
                  <div className={viewMode === 'list' ? 'h-full w-48' : 'h-44'} style={{
                    background: `linear-gradient(135deg, #${['FFEEE8','FFF8F0','FFF0F8','F0FFF0','F0F8FF'][car.id % 5]}, #FFF8F5)`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <div className="text-center">
                      <div className="text-3xl">🚗</div>
                      <div className="font-bold text-gray-800 text-base mt-1">{car.brand} {car.model}</div>
                    </div>
                  </div>
                }
                onClick={() => navigate(`/car/${car.id}`)}
                style={{ borderRadius: '12px' }}
              >
                <div className={viewMode === 'list' ? 'flex items-center justify-between' : ''}>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <Tag color={car.color === '黑色' ? 'default' : car.color === '白色' ? 'blue' : 'red'}>{car.color}</Tag>
                      <Tag>{car.seats}座</Tag>
                    </div>
                    <div className="flex items-center gap-2">
                      <StarFilled className="!text-[#D4A853]" />
                      <Text className="text-sm">{car.rating}</Text>
                      <Text className="text-xs text-gray-400">({car.orders}条评价)</Text>
                    </div>
                  </div>
                  <div className="text-right mt-2 md:mt-0">
                    <div className="font-bold text-lg" style={{ color: '#D4380D' }}>
                      ¥{car.price.toLocaleString()} <span className="text-xs font-normal text-gray-400">起</span>
                    </div>
                    <Button type="primary" size="small" className="mt-1">立即预订</Button>
                  </div>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      ) : (
        <Empty description="没有找到符合条件的车辆" className="py-20" />
      )}

      {/* 分页 */}
      <div className="flex justify-center mt-8">
        <Pagination
          current={page}
          total={filteredCars.length}
          pageSize={pageSize}
          onChange={setPage}
          showSizeChanger={false}
          showTotal={(total) => `共 ${total} 辆车`}
        />
      </div>
    </div>
  );
};

export default CarListPage;