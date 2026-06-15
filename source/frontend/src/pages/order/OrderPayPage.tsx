import React, { useState } from 'react';
import { Card, Row, Col, Button, Typography, Space, Tabs, QRCode, Divider, message } from 'antd';
import { AlipayOutlined, WechatOutlined, CheckCircleOutlined, ClockCircleOutlined } from '@ant-design/icons';
import { useNavigate, useParams } from 'react-router-dom';

const { Title, Text } = Typography;

const OrderPayPage: React.FC = () => {
  const navigate = useNavigate();
  const { orderNo } = useParams();
  const [payMethod, setPayMethod] = useState<'alipay' | 'wechat'>('alipay');
  const [paying, setPaying] = useState(false);

  const handlePay = async () => {
    setPaying(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      message.success('支付成功！');
      navigate(`/order/result?orderNo=${orderNo}&status=success`);
    } catch {
      message.error('支付失败');
      navigate(`/order/result?orderNo=${orderNo}&status=fail`);
    } finally {
      setPaying(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FFF1F0] via-[#FFF9F6] to-[#FFF1F0] py-12">
      <div className="max-w-4xl mx-auto px-4">
        {/* 订单信息 */}
        <Card
          className="rounded-xl shadow-sm mb-6 text-center"
          style={{ border: '1px solid #F0E0D8' }}
        >
          <div className="py-4">
            <ClockCircleOutlined className="text-4xl text-[#D4A853] mb-3" />
            <Title level={4} className="!text-gray-700">订单已提交，请完成支付</Title>
            <Text className="!text-gray-400">订单号：{orderNo}</Text>
            <div className="mt-4">
              <Text className="text-3xl font-bold" style={{ color: '#D4380D' }}>¥716</Text>
              <Text className="text-gray-400 ml-2">定金</Text>
            </div>
            <div className="mt-2">
              <Text className="text-xs text-gray-400">订单保留 15:00，超时自动取消</Text>
            </div>
          </div>
        </Card>

        <Row gutter={[24, 24]}>
          {/* 支付方式 */}
          <Col xs={24} lg={14}>
            <Card
              title={<span className="text-base font-medium">选择支付方式</span>}
              className="rounded-xl shadow-sm"
              style={{ border: '1px solid #F0E0D8' }}
            >
              <div
                className={`p-4 rounded-xl mb-4 cursor-pointer border-2 transition-all ${
                  payMethod === 'alipay' ? 'border-[#1677FF] bg-blue-50' : 'border-gray-200'
                }`}
                onClick={() => setPayMethod('alipay')}
              >
                <div className="flex items-center gap-3">
                  <AlipayOutlined className="text-3xl" style={{ color: '#1677FF' }} />
                  <div>
                    <Text strong className="text-base">支付宝支付</Text>
                    <div className="text-xs text-gray-400">推荐支付宝用户使用</div>
                  </div>
                  {payMethod === 'alipay' && <CheckCircleOutlined className="text-[#1677FF] text-xl ml-auto" />}
                </div>
              </div>

              <div
                className={`p-4 rounded-xl mb-4 cursor-pointer border-2 transition-all ${
                  payMethod === 'wechat' ? 'border-[#07C160] bg-green-50' : 'border-gray-200'
                }`}
                onClick={() => setPayMethod('wechat')}
              >
                <div className="flex items-center gap-3">
                  <WechatOutlined className="text-3xl" style={{ color: '#07C160' }} />
                  <div>
                    <Text strong className="text-base">微信支付</Text>
                    <div className="text-xs text-gray-400">推荐微信用户使用</div>
                  </div>
                  {payMethod === 'wechat' && <CheckCircleOutlined className="text-[#07C160] text-xl ml-auto" />}
                </div>
              </div>

              <Button
                type="primary"
                size="large"
                block
                className="h-12 text-lg rounded-xl mt-4"
                loading={paying}
                onClick={handlePay}
              >
                {payMethod === 'alipay' ? '支付宝支付 ¥716' : '微信支付 ¥716'}
              </Button>
            </Card>
          </Col>

          {/* 支付二维码 */}
          <Col xs={24} lg={10}>
            <Card
              title={<span className="text-base font-medium">扫码支付</span>}
              className="rounded-xl shadow-sm text-center"
              style={{ border: '1px solid #F0E0D8' }}
            >
              <div className="py-4">
                <div className="w-[200px] h-[200px] mx-auto bg-gradient-to-br from-[#FFEEE8] to-[#FFF8F5] flex items-center justify-center rounded-xl mb-4">
                  <QRCode
                    value={`https://pay.lyjc.com/${orderNo}`}
                    size={180}
                    icon={payMethod === 'alipay' ? '/alipay-icon.png' : '/wechat-icon.png'}
                  />
                </div>
                <Text className="text-sm text-gray-500">
                  请使用{payMethod === 'alipay' ? '支付宝' : '微信'}扫码支付
                </Text>
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default OrderPayPage;