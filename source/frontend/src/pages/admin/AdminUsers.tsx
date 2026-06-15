import React from 'react';
import { Card, Table, Tag, Button, Typography, Input, Space, message } from 'antd';
import { SearchOutlined, StopOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

const MOCK_USERS = Array.from({ length: 20 }, (_, i) => ({
  key: i + 1,
  nickname: ['张先生', '李女士', '王先生', '赵女士', '刘先生', '陈女士', '杨先生', '黄女士'][i % 8],
  phone: `138${String(8888 + i).padStart(4, '0')}`,
  orders: Math.floor(Math.random() * 10),
  createdAt: `2026-06-${String(1 + i).padStart(2, '0')}`,
  status: i % 7 === 0 ? '封禁' : '正常',
}));

const AdminUsers: React.FC = () => {
  const columns = [
    { title: '昵称', dataIndex: 'nickname', key: 'nickname', render: (t: string) => <Text strong>{t}</Text> },
    { title: '手机号', dataIndex: 'phone', key: 'phone' },
    { title: '订单数', dataIndex: 'orders', key: 'orders' },
    { title: '注册时间', dataIndex: 'createdAt', key: 'createdAt' },
    {
      title: '状态', dataIndex: 'status', key: 'status',
      render: (s: string) => <Tag color={s === '正常' ? 'green' : 'red'}>{s}</Tag>,
    },
    {
      title: '操作', key: 'action',
      render: (_: any, record: any) => (
        <Space>
          <Button type="link" size="small">查看</Button>
          {record.status === '正常' ? (
            <Button type="link" size="small" danger icon={<StopOutlined />} onClick={() => message.warning('已封禁该用户')}>封禁</Button>
          ) : (
            <Button type="link" size="small" onClick={() => message.success('已解禁')}>解禁</Button>
          )}
        </Space>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-[#FFF9F6] py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <Title level={4} className="!mb-0 !text-gray-800">用户管理</Title>
          <Input.Search placeholder="搜索手机号/昵称" className="max-w-xs rounded-lg" />
        </div>
        <Card className="rounded-xl shadow-sm" style={{ border: '1px solid #F0E0D8' }}>
          <Table dataSource={MOCK_USERS} columns={columns} pagination={{ pageSize: 10 }} />
        </Card>
      </div>
    </div>
  );
};

export default AdminUsers;