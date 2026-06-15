import React, { useState } from 'react';
import { Card, Form, Input, Button, Space, Typography, message } from 'antd';
import { PhoneOutlined, LockOutlined, SafetyOutlined, UserOutlined } from '@ant-design/icons';
import { useNavigate, Link } from 'react-router-dom';

const { Title, Text } = Typography;

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleRegister = async (values: any) => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      message.success('注册成功！请登录');
      navigate('/login');
    } catch (error) {
      message.error('注册失败，请重试');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FFF1F0] via-[#FFF9F6] to-[#FFF1F0] flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-[420px]">
        <div className="text-center mb-8">
          <Link to="/" className="no-underline">
            <div className="text-5xl mb-3">🎊</div>
            <Title level={2} className="!text-[#D4380D] !mb-1">加入良缘锦程</Title>
            <Text className="!text-gray-400">开启您的婚车预订之旅</Text>
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
          <Form
            layout="vertical"
            onFinish={handleRegister}
            autoComplete="off"
            className="mt-2"
          >
            <Form.Item
              name="nickname"
              rules={[{ required: true, message: '请输入昵称' }]}
            >
              <Input
                prefix={<UserOutlined className="text-gray-400" />}
                placeholder="昵称"
                size="large"
                className="rounded-lg"
              />
            </Form.Item>

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

            <Form.Item
              name="password"
              rules={[
                { required: true, message: '请设置密码' },
                { min: 6, message: '密码至少6位' },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined className="text-gray-400" />}
                placeholder="设置密码"
                size="large"
                className="rounded-lg"
              />
            </Form.Item>

            <Form.Item
              name="confirmPassword"
              dependencies={['password']}
              rules={[
                { required: true, message: '请确认密码' },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('两次输入的密码不一致'));
                  },
                }),
              ]}
            >
              <Input.Password
                prefix={<LockOutlined className="text-gray-400" />}
                placeholder="确认密码"
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
                注册
              </Button>
            </Form.Item>
          </Form>

          <div className="text-center mt-4">
            <Space>
              <Text className="text-gray-400">已有账号？</Text>
              <Link to="/login" className="!text-[#D4380D] font-medium">
                立即登录
              </Link>
            </Space>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default RegisterPage;