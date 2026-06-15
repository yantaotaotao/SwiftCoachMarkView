import React from 'react';
import { Card, Row, Col, Statistic, Table, Typography, Button, Tag, Space, Divider, Tabs, message } from 'antd';
import { DollarOutlined, BankOutlined, HistoryOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Title, Text } = Typography;

const MOCK_INCOME = Array.from({ length: 10 }, (_, i) => ({
  key: i + 1,
  date: `2026-06-${15 - i}`,
  orderNo: `LY2026061${String(500 + i)}`,
  carName: ['奔驰 S400L', '宝马 530Li', '奥迪 A8L'][i % 3],
  amount: 1888 + i * 200,
  commission: Math.round((1888 + i * 200) * 0.1),
  netAmount: Math.round((1888 + i * 200) * 0.9),
  status: ['已结算', '已结算', '待结算'][i % 3],
}));

const MerchantFinance: React.FC = () => {
  const navigate = useNavigate();

  const incomeColumns = [
    { title: '日期', dataIndex: 'date', key: 'date' },
    { title: '订单号', dataIndex: 'orderNo', key: 'orderNo' },
    { title: '车辆', dataIndex: 'carName', key: 'carName' },
    { title: '金额', dataIndex: 'amount', key: 'amount', render: (a: number) => <span>¥{a.toLocaleString()}</span> },
    { title: '佣金', dataIndex: 'commission', key: 'commission', render: (c: number) => <span className="text-gray-400">-¥{c.toLocaleString()}</span> },
    { title: '实际收入', dataIndex: 'netAmount', key: 'netAmount', render: (n: number) => <span className="text-green-600 font-bold">¥{n.toLocaleString()}</span> },
    { title: '状态', dataIndex: 'status', key: 'status', render: (s: string) => <Tag color={s === '已结算' ? 'green' : 'orange'}>{s}</Tag> },
  ];

  return (
    <div className="min-h-screen bg-[#FFF9F6] py-8">
      <div className="max-w-7xl mx-auto px-4">
        <Title level={4} className="!mb-6 !text-gray-800">财务管理</Title>

        <Row gutter={[16, 16]} className="mb-6">
          <Col xs={24} sm={8}>
            <Card className="rounded-xl text-center" style={{ border: '1px solid #F0E0D8' }}>
              <Statistic title="本月收入" value={28888} precision={0} prefix="¥" valueStyle={{ color: '#52c41a', fontSize: 28 }} />
            </Card>
          </Col>
          <Col xs={24} sm={8}>
            <Card className="rounded-xl text-center" style={{ border: '1px solid #F0E0D8' }}>
              <Statistic title="累计收入" value={188888} precision={0} prefix="¥" valueStyle={{ color: '#D4380D', fontSize: 28 }} />
            </Card>
          </Col>
          <Col xs={24} sm={8}>
            <Card className="rounded-xl text-center" style={{ border: '1px solid #F0E0D8' }}>
              <Statistic title="待结算" value={5888} precision={0} prefix="¥" valueStyle={{ color: '#faad14', fontSize: 28 }} />
            </Card>
          </Col>
        </Row>

        <Card
          className="rounded-xl shadow-sm"
          style={{ border: '1px solid #F0E0D8' }}
        >
          <Tabs
            items={[
              {
                key: 'income',
                label: '收入明细',
                children: <Table dataSource={MOCK_INCOME} columns={incomeColumns} pagination={{ pageSize: 10 }} />,
              },
              {
                key: 'withdraw',
                label: '提现记录',
                children: (
                  <div>
                    <div className="flex justify-between items-center mb-4">
                      <Text className="text-gray-400">可提现余额：<Text strong className="text-lg text-[#D4380D]">¥12,888</Text></Text>
                      <Button type="primary" className="rounded-lg" onClick={() => message?.success?.('提现申请已提交')}>申请提现</Button>
                    </div>
                    <Table
                      dataSource={[]}
                      columns={[
                        { title: '申请时间', dataIndex: 'date', key: 'date' },
                        { title: '金额', dataIndex: 'amount', key: 'amount' },
                        { title: '状态', dataIndex: 'status', key: 'status' },
                        { title: '备注', dataIndex: 'remark', key: 'remark' },
                      ]}
                      locale={{ emptyText: '暂无提现记录' }}
                    />
                  </div>
                ),
              },
              {
                key: 'commission',
                label: '佣金明细',
                children: (
                  <div className="p-8 text-center text-gray-400">
                    <DollarOutlined className="text-4xl mb-3" />
                    <div>佣金明细功能开发中...</div>
                  </div>
                ),
              },
            ]}
          />
        </Card>
      </div>
    </div>
  );
};

export default MerchantFinance;