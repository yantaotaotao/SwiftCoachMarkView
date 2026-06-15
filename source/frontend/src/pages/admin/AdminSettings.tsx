import React from 'react';
import { Card, Form, Input, Button, Typography, message, Tabs, Table, Tag, Space } from 'antd';
import { SaveOutlined, PlusOutlined, DeleteOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

const AdminSettings: React.FC = () => {
  const [form] = Form.useForm();

  const handleSave = () => {
    message.success('设置已保存');
  };

  return (
    <div className="min-h-screen bg-[#FFF9F6] py-8">
      <div className="max-w-4xl mx-auto px-4">
        <Title level={4} className="!mb-6 !text-gray-800">系统设置</Title>

        <Card className="rounded-xl shadow-sm" style={{ border: '1px solid #F0E0D8' }}>
          <Tabs items={[
            {
              key: 'basic',
              label: '基础参数',
              children: (
                <Form
                  form={form}
                  layout="vertical"
                  initialValues={{
                    platformName: '良缘锦程',
                    phone: '0916-XXXXXXX',
                    email: 'contact@lyjc.com',
                    icp: '陕ICP备XXXXXXXX号',
                  }}
                  className="max-w-lg"
                >
                  <Form.Item name="platformName" label="平台名称"><Input size="large" className="rounded-lg" /></Form.Item>
                  <Form.Item name="phone" label="客服电话"><Input size="large" className="rounded-lg" /></Form.Item>
                  <Form.Item name="email" label="联系邮箱"><Input size="large" className="rounded-lg" /></Form.Item>
                  <Form.Item name="icp" label="ICP备案号"><Input size="large" className="rounded-lg" /></Form.Item>
                  <Form.Item>
                    <Button type="primary" icon={<SaveOutlined />} size="large" className="rounded-lg" onClick={handleSave}>保存设置</Button>
                  </Form.Item>
                </Form>
              ),
            },
            {
              key: 'payment',
              label: '支付配置',
              children: (
                <div className="max-w-lg space-y-4">
                  <Card size="small" className="rounded-xl" style={{ border: '1px solid #F0E0D8' }}>
                    <Text strong>支付宝</Text>
                    <div className="mt-2 space-y-2">
                      <Input placeholder="支付宝商户号" size="large" className="rounded-lg" />
                      <Input placeholder="支付宝公钥" size="large" className="rounded-lg" />
                      <Input.Password placeholder="应用私钥" size="large" className="rounded-lg" />
                    </div>
                  </Card>
                  <Card size="small" className="rounded-xl" style={{ border: '1px solid #F0E0D8' }}>
                    <Text strong>微信支付</Text>
                    <div className="mt-2 space-y-2">
                      <Input placeholder="微信商户号" size="large" className="rounded-lg" />
                      <Input.Password placeholder="API密钥" size="large" className="rounded-lg" />
                    </div>
                  </Card>
                  <Button type="primary" icon={<SaveOutlined />} className="rounded-lg" onClick={handleSave}>保存支付配置</Button>
                </div>
              ),
            },
            {
              key: 'sms',
              label: '短信配置',
              children: (
                <div className="max-w-lg space-y-3">
                  <Form.Item label="AccessKey"><Input size="large" className="rounded-lg" /></Form.Item>
                  <Form.Item label="AccessSecret"><Input.Password size="large" className="rounded-lg" /></Form.Item>
                  <Form.Item label="短信签名"><Input size="large" className="rounded-lg" /></Form.Item>
                  <Button type="primary" icon={<SaveOutlined />} className="rounded-lg" onClick={handleSave}>保存短信配置</Button>
                </div>
              ),
            },
            {
              key: 'admins',
              label: '管理员管理',
              children: (
                <div>
                  <div className="flex justify-end mb-4">
                    <Button type="primary" icon={<PlusOutlined />} className="rounded-lg">添加管理员</Button>
                  </div>
                  <Table
                    dataSource={[
                      { key: 1, username: 'admin', realName: '超级管理员', phone: '138****0000', role: '超级管理员', status: '正常' },
                      { key: 2, username: 'operator', realName: '运营人员', phone: '138****0001', role: '运营', status: '正常' },
                    ]}
                    columns={[
                      { title: '用户名', dataIndex: 'username', key: 'username' },
                      { title: '姓名', dataIndex: 'realName', key: 'realName' },
                      { title: '手机号', dataIndex: 'phone', key: 'phone' },
                      { title: '角色', dataIndex: 'role', key: 'role', render: (r: string) => <Tag color="blue">{r}</Tag> },
                      { title: '状态', dataIndex: 'status', key: 'status', render: (s: string) => <Tag color="green">{s}</Tag> },
                      { title: '操作', key: 'action', render: () => <Button type="link" size="small" danger icon={<DeleteOutlined />}>删除</Button> },
                    ]}
                  />
                </div>
              ),
            },
          ]} />
        </Card>
      </div>
    </div>
  );
};

export default AdminSettings;