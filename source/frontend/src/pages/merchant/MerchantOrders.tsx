import React, { useState } from 'react';
import { Card, Table, Tag, Button, Space, Typography, Select, Input, message } from 'antd';
import { SearchOutlined, CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

const MOCK_ORDERS = Array.from({ length: 15 }, (_, i) => ({
  key: i + 1,
  orderNo: `LY202606${String(100 + i)}`,
  carName: ['奔驰 S400L', '宝马 530Li', '奥迪 A8L', '保时捷 Panamera'][i % 4],
  userName: ['张女士', '李先生', '王先生', '赵女士'][i % 4],
  serviceDate: `2026-06-${20 + (i % 10)}`,
  packageType: ['半天', '全天', '车队'][i % 3],
  amount: 1888 + i * 300,
  status: ['pending_confirm', 'confirmed', 'in_progress', 'completed', 'cancelled'][i % 5],
}));

const STATUS_MAP: Record<string, { label: string; color: string }> = {
  pending_confirm: { label: '待确认', color: 'orange' },
  confirmed: { label: '已确认', color: 'blue' },
  in_progress: { label: '进行中', color: 'purple' },
  completed: { label: '已完成', color: 'green' },
  cancelled: { label: '已取消', color: 'red' },
};

const MerchantOrders: React.FC = () => {
  const [searchText, setSearchText] = useState('');

  const columns = [
    { title: '订单号', dataIndex: 'orderNo', key: 'orderNo', render: (t: string) => <Text className="text-sm">{t}</Text> },
    { title: '车辆', dataIndex: 'carName', key: 'carName', render: (t: string) => <Text strong>{t}</Text> },
    { title: '客户', dataIndex: 'userName', key: 'userName' },
    { title: '服务日期', dataIndex: 'serviceDate', key: 'serviceDate' },
    { title: '套餐', dataIndex: 'packageType', key: 'packageType' },
    { title: '金额', dataIndex: 'amount', key: 'amount', render: (a: number) => <span className="text-[#D4380D] font-bold">¥{a.toLocaleString()}</span> },
    {
      title: '状态', dataIndex: 'status', key: 'status',
      render: (s: string) => {
        const info = STATUS_MAP[s] || { label: s, color: 'default' };
        return <Tag color={info.color}>{info.label}</Tag>;
      },
    },
    {
      title: '操作', key: 'action',
      render: (_: any, record: any) => (
        <Space>
          {record.status === 'pending_confirm' && (
            <>
              <Button type="primary" size="small" icon={<CheckCircleOutlined />} className="rounded" onClick={() => message.success('已接单')}>接单</Button>
              <Button size="small" danger icon={<CloseCircleOutlined />} className="rounded" onClick={() => message.warning('已拒单')}>拒单</Button>
            </>
          )}
          {record.status === 'in_progress' && (
            <Button type="primary" size="small" className="rounded" onClick={() => message.success('已标记完成')}>确认完成</Button>
          )}
          {(record.status === 'confirmed' || record.status === 'completed') && (
            <Button type="link" size="small">查看</Button>
          )}
        </Space>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-[#FFF9F6] py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <Title level={4} className="!mb-0 !text-gray-800">订单管理</Title>
          <Input
            placeholder="搜索订单号/客户..."
            prefix={<SearchOutlined className="text-gray-400" />}
            className="max-w-xs rounded-lg"
            value={searchText}
            onChange={e => setSearchText(e.target.value)}
          />
        </div>

        <Card className="rounded-xl shadow-sm" style={{ border: '1px solid #F0E0D8' }}>
          <div className="mb-4">
            <Space>
              <span className="text-gray-400">筛选状态：</span>
              <Select
                defaultValue="all"
                style={{ width: 120 }}
                options={[
                  { value: 'all', label: '全部' },
                  ...Object.entries(STATUS_MAP).map(([key, val]) => ({ value: key, label: val.label })),
                ]}
              />
            </Space>
          </div>
          <Table dataSource={MOCK_ORDERS} columns={columns} pagination={{ pageSize: 10 }} />
        </Card>
      </div>
    </div>
  );
};

export default MerchantOrders;