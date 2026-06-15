import React, { useState } from 'react';
import { Card, Form, Input, Button, Tabs, Space, Typography, message } from 'antd';
import { PhoneOutlined, LockOutlined, SafetyOutlined } from '@ant-design/icons';
import { useNavigate, Link } from 'react-router-dom';

const { Title, Text } = Typography;

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('code');

  const handleLogin = async (values: any) => {
    setLoading(true);
    try {
      // Mock login - will connect to real API later
      await new Promise(resolve => setTimeout(resolve, 1000));
      message.success('登录成功！');
      navigate('/');
    } catch (error) {
      message.error('登录失败，请重试');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FFF1F0] via-[#FFF9F6] to-[#FFF1F0] flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-[420px]">
        {/* 品牌标识 */}
        <div className="text-center mb-8">
          <Link to="/" className="no-underline">
            <div className="text-5xl mb-3">💍</div>
            <Title level={2} className="!text-[#D4380D] !mb-1">良缘锦程</Title>
            <Text className="!text-gray-400">婚车预订平台</Text>
          </Link>
        </div>

        <Card
          className="shadow-xl"
          style={{
            borderRadius: '16px',
            border: '1px solid #F0E0D8',
            boxShadow: '0 8px 32px rgba(212, 56, 13, 0.1)',
          }}
        >
          <Tabs
            activeKey={activeTab}
            onChange={setActiveTab}
            centered
            items={[
              {
                key: 'code',
                label: <span className="text-base px-4">验证码登录</span>,
                children: (
                  <Form
                    layout="vertical"
                    onFinish={handleLogin}
                    autoComplete="off"
                    className="mt-4"
                  >
                    <Form.Item
                      name="phone"
                      rules={[
                        { required: true, message: '请输入手机号' },
                        { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号' },
                      ]}
                    >
                      <Input
                        prefix={<PhoneOutlined className="text-gray-400" />}
                        placeholder="手机号"
                        size="large"
                        className="rounded-lg"
                      />
                    </Form.Item>

                    <Form.Item
                      name="code"
                      rules={[{ required: true, message: '请输入验证码' }]}
                    >
                      <div className="flex gap-2">
                        <Input
                          prefix={<SafetyOutlined className="text-gray-400" />}
                          placeholder="验证码"
                          size="large"
                          className="rounded-lg flex-1"
                        />
                        <Button
                          size="large"
                          className="rounded-lg whitespace-nowrap"
                          style={{ borderColor: '#D4380D', color: '#D4380D' }}
                        >
                          获取验证码
                        </Button>
                      </div>
                    </Form.Item>

                    <Form.Item className="mb-0">
                      <Button
                        type="primary"
                        htmlType="submit"
                        size="large"
                        block
                        className="rounded-lg h-12 text-lg"
                        loading={loading}
                      >
                        登录
                      </Button>
                    </Form.Item>
                  </Form>
                ),
              },
              {
                key: 'password',
                label: <span className="text-base px-4">密码登录</span>,
                children: (
                  <Form
                    layout="vertical"
                    onFinish={handleLogin}
                    autoComplete="off"
                    className="mt-4"
                  >
                    <Form.Item
                      name="phone"
                      rules={[
                        { required: true, message: '请输入手机号' },
                        { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号' },
                      ]}
                    >
                      <Input
                        prefix={<PhoneOutlined className="text-gray-400" />}
                        placeholder="手机号"
                        size="large"
                        className="rounded-lg"
                      />
                    </Form.Item>

                    <Form.Item
                      name="password"
                      rules={[{ required: true, message: '请输入密码' }]}
                    >
                      <Input.Password
                        prefix={<LockOutlined className="text-gray-400" />}
                        placeholder="密码"
                        size="large"
                        className="rounded-lg"
                      />
                    </Form.Item>

                    <Form.Item className="mb-0">
                      <Button
                        type="primary"
                        htmlType="submit"
                        size="large"
                        block
                        className="rounded-lg h-12 text-lg"
                        loading={loading}
                      >
                        登录
                      </Button>
                    </Form.Item>
                  </Form>
                ),
              },
            ]}
          />

          <div className="text-center mt-4">
            <Space>
              <Text className="text-gray-400">还没有账号？</Text>
              <Link to="/register" className="!text-[#D4380D] font-medium">
                立即注册
              </Link>
            </Space>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;