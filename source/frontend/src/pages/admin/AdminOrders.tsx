import React from 'react';
import { Card, Table, Tag, Button, Typography, Input, Select, Space, message } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

const MOCK_ORDERS = Array.from({ length: 15 }, (_, i) => ({
  key: i + 1,
  orderNo: `LY202606${String(200 + i)}`,
  user: ['张先生', '李女士', '王先生', '赵女士'][i % 4],
  merchant: ['汉中至尊婚车', '汉中豪华婚车行', '汉中温馨婚车'][i % 3],
  carName: ['奔驰 S400L', '宝马 530Li', '奥迪 A8L'][i % 3],
  amount: 1888 + i * 300,
  status: ['pending_pay', 'pending_confirm', 'confirmed', 'in_progress', 'completed', 'cancelled', 'refunding'][i % 7],
}));

const STATUS_MAP: Record<string, { label: string; color: string }> = {
  pending_pay: { label: '待付款', color: 'gold' },
  pending_confirm: { label: '待确认', color: 'orange' },
  confirmed: { label: '已确认', color: 'blue' },
  in_progress: { label: '进行中', color: 'purple' },
  completed: { label: '已完成', color: 'green' },
  cancelled: { label: '已取消', color: 'red' },
  refunding: { label: '退款中', color: 'volcano' },
};

const AdminOrders: React.FC = () => {
  const columns = [
    { title: '订单号', dataIndex: 'orderNo', key: 'orderNo' },
    { title: '用户', dataIndex: 'user', key: 'user' },
    { title: '商家', dataIndex: 'merchant', key: 'merchant' },
    { title: '车辆', dataIndex: 'carName', key: 'carName' },
    { title: '金额', dataIndex: 'amount', key: 'amount', render: (a: number) => <span className="text-[#D4380D] font-bold">¥{a.toLocaleString()}</span> },
    { title: '状态', dataIndex: 'status', key: 'status', render: (s: string) => {
      const info = STATUS_MAP[s] || { label: s, color: 'default' };
      return <Tag color={info.color}>{info.label}</Tag>;
    }},
    { title: '操作', key: 'action', render: () => (
      <Space>
        <Button type="link" size="small">查看</Button>
        <Button type="link" size="small" style={{ color: '#faad14' }} onClick={() => message.info('纠纷处理功能开发中')}>纠纷处理</Button>
      </Space>
    )},
  ];

  return (
    <div className="min-h-screen bg-[#FFF9F6] py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <Title level={4} className="!mb-0 !text-gray-800">订单管理</Title>
          <Space>
            <Select
              defaultValue="all"
              style={{ width: 120 }}
              options={[{ value: 'all', label: '全部状态' }, ...Object.entries(STATUS_MAP).map(([k, v]) => ({ value: k, label: v.label }))]}
            />
            <Input.Search placeholder="搜索订单号/用户/商家" className="max-w-xs rounded-lg" />
          </Space>
        </div>
        <Card className="rounded-xl shadow-sm" style={{ border: '1px solid #F0E0D8' }}>
          <Table dataSource={MOCK_ORDERS} columns={columns} pagination={{ pageSize: 10 }} />
        </Card>
      </div>
    </div>
  );
};

export default AdminOrders;