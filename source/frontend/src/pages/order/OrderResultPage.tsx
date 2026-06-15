import React from 'react';
import { Card, Button, Typography, Space, Result } from 'antd';
import { CheckCircleFilled, CloseCircleFilled, HomeOutlined, OrderedListOutlined } from '@ant-design/icons';
import { useNavigate, useSearchParams } from 'react-router-dom';

const { Title, Text } = Typography;

const OrderResultPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const status = searchParams.get('status');
  const orderNo = searchParams.get('orderNo');
  const isSuccess = status === 'success';

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FFF1F0] via-[#FFF9F6] to-[#FFF1F0] flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-[520px]">
        <Card
          className="shadow-xl text-center"
          style={{
            borderRadius: '16px',
            border: '1px solid #F0E0D8',
            boxShadow: '0 8px 32px rgba(212, 56, 13, 0.1)',
          }}
        >
          {isSuccess ? (
            <>
              <div className="py-6">
                <CheckCircleFilled className="text-6xl" style={{ color: '#52c41a' }} />
                <Title level={3} className="!text-gray-800 !mt-4">支付成功！</Title>
                <Text className="!text-gray-500">您的订单已成功支付，商家将尽快确认</Text>
              </div>

              <div className="bg-[#FFF8F5] rounded-xl p-4 mb-6 text-left" style={{ border: '1px solid #F0E0D8' }}>
                <div className="flex justify-between mb-2">
                  <Text className="text-gray-400">订单编号</Text>
                  <Text className="text-gray-600">{orderNo}</Text>
                </div>
                <div className="flex justify-between mb-2">
                  <Text className="text-gray-400">支付金额</Text>
                  <Text className="font-bold" style={{ color: '#D4380D' }}>¥716.00</Text>
                </div>
                <div className="flex justify-between">
                  <Text className="text-gray-400">支付方式</Text>
                  <Text className="text-gray-600">支付宝</Text>
                </div>
              </div>

              <div className="bg-[#FFF1F0] rounded-xl p-4 mb-6 text-left" style={{ border: '1px solid #FFCCC7' }}>
                <Text className="text-sm" style={{ color: '#D4380D' }}>💡 温馨提示</Text>
                <div className="text-xs text-gray-500 mt-1">
                  商家确认接单后，我们将通过短信通知您。如有任何问题，请联系客服 0916-XXXXXXX。
                </div>
              </div>

              <Space className="w-full" size={12}>
                <Button
                  size="large"
                  className="flex-1 rounded-lg h-12"
                  onClick={() => navigate('/user/orders')}
                >
                  <OrderedListOutlined /> 查看订单
                </Button>
                <Button
                  type="primary"
                  size="large"
                  className="flex-1 rounded-lg h-12"
                  onClick={() => navigate('/')}
                >
                  <HomeOutlined /> 返回首页
                </Button>
              </Space>
            </>
          ) : (
            <>
              <div className="py-6">
                <CloseCircleFilled className="text-6xl" style={{ color: '#ff4d4f' }} />
                <Title level={3} className="!text-gray-800 !mt-4">支付失败</Title>
                <Text className="!text-gray-500">支付未完成，请重新尝试</Text>
              </div>

              <Space className="w-full" size={12}>
                <Button
                  size="large"
                  className="flex-1 rounded-lg h-12"
                  onClick={() => navigate(`/order/pay/${orderNo}`)}
                >
                  重新支付
                </Button>
                <Button
                  type="primary"
                  size="large"
                  className="flex-1 rounded-lg h-12"
                  onClick={() => navigate('/user/orders')}
                >
                  查看订单
                </Button>
              </Space>
            </>
          )}
        </Card>
      </div>
    </div>
  );
};

export default OrderResultPage;