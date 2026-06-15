import React from 'react';
import { Card, Table, Tag, Button, Typography, Input, Space, message, Tabs } from 'antd';
import { SearchOutlined, CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

const MOCK_MERCHANTS = Array.from({ length: 12 }, (_, i) => ({
  key: i + 1,
  shopName: ['汉中至尊婚车', '汉中豪华婚车行', '汉中温馨婚车', '汉中瑞丰婚车', '汉中喜结良缘', '汉中天成婚车'][i % 6],
  contacts: ['张经理', '李总', '王老板', '赵经理', '刘总', '陈老板'][i % 6],
  phone: `153${String(8000 + i).padStart(4, '0')}`,
  orders: 30 + i * 15,
  rating: +(4.5 + (i % 5) * 0.1).toFixed(1),
  status: ['正常', '正常', '冻结', '正常', '待审核', '正常'][i % 6],
}));

const AdminMerchants: React.FC = () => {
  const columns = [
    { title: '店铺名称', dataIndex: 'shopName', key: 'shopName', render: (t: string) => <Text strong>{t}</Text> },
    { title: '联系人', dataIndex: 'contacts', key: 'contacts' },
    { title: '电话', dataIndex: 'phone', key: 'phone' },
    { title: '订单数', dataIndex: 'orders', key: 'orders' },
    { title: '评分', dataIndex: 'rating', key: 'rating' },
    {
      title: '状态', dataIndex: 'status', key: 'status',
      render: (s: string) => {
        const colorMap: Record<string, string> = { '正常': 'green', '冻结': 'red', '待审核': 'orange' };
        return <Tag color={colorMap[s] || 'default'}>{s}</Tag>;
      },
    },
    {
      title: '操作', key: 'action',
      render: (_: any, record: any) => (
        <Space>
          <Button type="link" size="small">查看</Button>
          {record.status === '待审核' && (
            <>
              <Button type="link" size="small" style={{ color: '#52c41a' }} icon={<CheckCircleOutlined />} onClick={() => message.success('已通过审核')}>通过</Button>
              <Button type="link" size="small" danger icon={<CloseCircleOutlined />} onClick={() => message.warning('已拒绝')}>拒绝</Button>
            </>
          )}
          {record.status === '正常' && (
            <Button type="link" size="small" danger onClick={() => message.warning('已冻结')}>冻结</Button>
          )}
          {record.status === '冻结' && (
            <Button type="link" size="small" style={{ color: '#52c41a' }} onClick={() => message.success('已解冻')}>解冻</Button>
          )}
        </Space>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-[#FFF9F6] py-8">
      <div className="max-w-7xl mx-auto px-4">
        <Title level={4} className="!mb-6 !text-gray-800">商家管理</Title>
        <Card className="rounded-xl shadow-sm" style={{ border: '1px solid #F0E0D8' }}>
          <Tabs items={[
            {
              key: 'all',
              label: '全部商家',
              children: <Table dataSource={MOCK_MERCHANTS} columns={columns} pagination={{ pageSize: 10 }} />,
            },
            {
              key: 'audit',
              label: '入驻审核',
              children: (
                <Table
                  dataSource={MOCK_MERCHANTS.filter(m => m.status === '待审核')}
                  columns={columns}
                  locale={{ emptyText: '暂无待审核商家' }}
                />
              ),
            },
          ]} />
        </Card>
      </div>
    </div>
  );
};

export default AdminMerchants;