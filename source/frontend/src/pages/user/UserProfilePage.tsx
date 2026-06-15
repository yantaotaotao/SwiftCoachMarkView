import React, { useState } from 'react';
import { Card, Form, Input, Button, Avatar, Typography, Space, Divider, message, Upload } from 'antd';
import { UserOutlined, PhoneOutlined, LockOutlined, CameraOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Title, Text } = Typography;

const UserProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const [editing, setEditing] = useState(false);
  const [form] = Form.useForm();

  const handleSave = async (values: any) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    message.success('保存成功');
    setEditing(false);
  };

  return (
    <div className="min-h-screen bg-[#FFF9F6] py-8">
      <div className="max-w-2xl mx-auto px-4">
        {/* 头像区域 */}
        <Card
          className="rounded-xl shadow-sm mb-6 text-center"
          style={{ border: '1px solid #F0E0D8' }}
        >
          <div className="relative inline-block">
            <Avatar
              size={96}
              icon={<UserOutlined />}
              className="border-4 border-white shadow-lg"
              style={{ backgroundColor: '#D4380D' }}
            />
            <div className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-white shadow flex items-center justify-center cursor-pointer hover:bg-gray-50">
              <CameraOutlined className="text-[#D4380D] text-sm" />
            </div>
          </div>
          <Title level={4} className="!mt-4 !mb-1">张先生</Title>
          <Text className="!text-gray-400">138****8888</Text>
        </Card>

        <Card
          className="rounded-xl shadow-sm"
          style={{ border: '1px solid #F0E0D8' }}
        >
          <div className="flex items-center justify-between mb-4">
            <Title level={5} className="!mb-0">个人信息</Title>
            <Button
              type={editing ? 'primary' : 'default'}
              onClick={() => editing ? form.submit() : setEditing(true)}
            >
              {editing ? '保存' : '编辑'}
            </Button>
          </div>

          <Form
            form={form}
            layout="vertical"
            disabled={!editing}
            onFinish={handleSave}
            initialValues={{
              nickname: '张先生',
              phone: '138****8888',
              email: 'zhang@example.com',
            }}
          >
            <Form.Item name="nickname" label="昵称" rules={[{ required: true, message: '请输入昵称' }]}>
              <Input prefix={<UserOutlined className="text-gray-400" />} size="large" className="rounded-lg" />
            </Form.Item>
            <Form.Item name="phone" label="手机号">
              <Input prefix={<PhoneOutlined className="text-gray-400" />} size="large" className="rounded-lg" disabled />
            </Form.Item>
            <Form.Item name="email" label="邮箱">
              <Input prefix={<span className="text-gray-400">@</span>} size="large" className="rounded-lg" />
            </Form.Item>
          </Form>

          <Divider />

          <div className="space-y-3">
            <Button icon={<LockOutlined />} block className="text-left rounded-lg h-12" onClick={() => message.info('修改密码功能开发中')}>
              <span className="ml-2">修改密码</span>
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default UserProfilePage;