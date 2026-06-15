import React from 'react';
import { Card, List, Rate, Typography, Button, Input, Space, message, Tag, Empty } from 'antd';
import { LikeOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

const MOCK_REVIEWS = Array.from({ length: 6 }, (_, i) => ({
  id: i + 1,
  user: ['张女士', '李先生', '王先生', '赵女士', '刘先生', '陈女士'][i],
  carName: ['奔驰 S400L', '宝马 530Li', '奥迪 A8L', '保时捷 Panamera', '路虎揽胜', '红旗 H9'][i],
  rating: [5, 5, 4, 5, 4, 5][i],
  content: [
    '车辆很新，准时到达，服务态度非常好！推荐！',
    '非常满意，司机专业，车辆干净整洁。',
    '整体不错，准时到达，沟通顺畅。',
    '婚礼当天车队很壮观，亲朋好友都夸赞！',
    '服务很好，价格合理，推荐给备婚新人。',
    '非常完美的体验，感谢车队师傅！',
  ][i],
  date: `2026-06-${10 + i}`,
  reply: i % 2 === 0 ? '感谢您的支持！祝您新婚快乐！' : undefined,
}));

const MerchantReviews: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#FFF9F6] py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <Title level={4} className="!mb-0 !text-gray-800">评价管理</Title>
          <Space>
            <Tag color="green">好评 {MOCK_REVIEWS.filter(r => r.rating >= 4).length}</Tag>
            <Tag color="orange">中评 {MOCK_REVIEWS.filter(r => r.rating === 3).length}</Tag>
            <Tag color="red">差评 {MOCK_REVIEWS.filter(r => r.rating <= 2).length}</Tag>
          </Space>
        </div>

        <Card className="rounded-xl shadow-sm" style={{ border: '1px solid #F0E0D8' }}>
          <List
            dataSource={MOCK_REVIEWS}
            renderItem={(review) => (
              <List.Item
                actions={[
                  review.reply ? (
                    <Tag color="blue" icon={<LikeOutlined />}>已回复</Tag>
                  ) : (
                    <Button type="link" className="!text-[#D4380D]" size="small">
                      回复评价
                    </Button>
                  ),
                ]}
              >
                <List.Item.Meta
                  avatar={
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#D4380D] to-[#FF6B35] flex items-center justify-center text-white font-bold">
                      {review.user[0]}
                    </div>
                  }
                  title={
                    <Space>
                      <Text strong>{review.user}</Text>
                      <Rate disabled value={review.rating} style={{ fontSize: 14 }} />
                      <Text className="text-xs text-gray-400">{review.carName}</Text>
                    </Space>
                  }
                  description={
                    <div>
                      <Text className="text-gray-600">{review.content}</Text>
                      <div className="text-xs text-gray-400 mt-1">{review.date}</div>
                      {review.reply && (
                        <div className="mt-2 p-2 bg-[#FFF8F5] rounded-lg text-sm">
                          <Text className="text-[#D4380D]">商家回复：</Text>
                          <Text className="text-gray-600">{review.reply}</Text>
                        </div>
                      )}
                    </div>
                  }
                />
              </List.Item>
            )}
          />
        </Card>
      </div>
    </div>
  );
};

export default MerchantReviews;