import React, { useState } from 'react';
import { Card, Table, Button, Tag, Space, Typography, Modal, Form, Input, Select, InputNumber, Upload, message, Switch } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, CalendarOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Title, Text } = Typography;

const MOCK_CARS = Array.from({ length: 8 }, (_, i) => ({
  key: i + 1,
  brand: ['奔驰', '宝马', '奥迪', '保时捷', '路虎', '红旗', '玛莎拉蒂', '复古'][i],
  model: ['S400L', '530Li', 'A8L', 'Panamera', '揽胜', 'H9', '总裁', '老爷车'][i],
  color: ['黑色', '白色', '红色', '银色', '黑色', '白色', '红色', '银色'][i],
  halfDayPrice: 1888 + i * 300,
  fullDayPrice: 3288 + i * 500,
  status: ['上架', '上架', '下架', '上架', '待审核', '上架', '上架', '下架'][i],
}));

const MerchantCars: React.FC = () => {
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  const [editingCar, setEditingCar] = useState<any>(null);

  const columns = [
    { title: '品牌/型号', dataIndex: 'model', key: 'model', render: (_: any, record: any) => <Text strong>{record.brand} {record.model}</Text> },
    { title: '颜色', dataIndex: 'color', key: 'color', render: (c: string) => <Tag>{c}</Tag> },
    { title: '半天价', dataIndex: 'halfDayPrice', key: 'halfDayPrice', render: (p: number) => <span className="text-[#D4380D] font-bold">¥{p.toLocaleString()}</span> },
    { title: '全天价', dataIndex: 'fullDayPrice', key: 'fullDayPrice', render: (p: number) => <span className="font-bold">¥{p.toLocaleString()}</span> },
    {
      title: '状态', dataIndex: 'status', key: 'status',
      render: (s: string) => {
        const colorMap: Record<string, string> = { '上架': 'green', '下架': 'default', '待审核': 'orange' };
        return <Tag color={colorMap[s] || 'default'}>{s}</Tag>;
      },
    },
    {
      title: '操作', key: 'action',
      render: (_: any, record: any) => (
        <Space>
          <Button type="link" size="small" icon={<EditOutlined />}
            onClick={() => { setEditingCar(record); setModalOpen(true); }}>编辑</Button>
          <Button type="link" size="small" icon={<CalendarOutlined />}
            onClick={() => message.info('档期管理功能开发中')}>档期</Button>
          <Button type="link" size="small" danger icon={<DeleteOutlined />}>删除</Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-[#FFF9F6] py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <Title level={4} className="!mb-0 !text-gray-800">车辆管理</Title>
          <Button type="primary" icon={<PlusOutlined />} className="rounded-lg" onClick={() => { setEditingCar(null); setModalOpen(true); }}>
            添加车辆
          </Button>
        </div>

        <Card className="rounded-xl shadow-sm" style={{ border: '1px solid #F0E0D8' }}>
          <Table dataSource={MOCK_CARS} columns={columns} pagination={{ pageSize: 10 }} />
        </Card>

        <Modal
          title={editingCar ? '编辑车辆' : '添加车辆'}
          open={modalOpen}
          onCancel={() => setModalOpen(false)}
          onOk={() => { message.success(editingCar ? '保存成功' : '添加成功'); setModalOpen(false); }}
          width={720}
        >
          <Form layout="vertical" className="mt-4">
            <div className="grid grid-cols-2 gap-4">
              <Form.Item label="品牌" required>
                <Select options={['奔驰', '宝马', '奥迪', '保时捷', '路虎', '红旗', '玛莎拉蒂', '复古'].map(b => ({ value: b, label: b }))} placeholder="选择品牌" />
              </Form.Item>
              <Form.Item label="型号" required>
                <Input placeholder="如 S400L" />
              </Form.Item>
              <Form.Item label="年份" required>
                <Select options={[2025, 2024, 2023, 2022, 2021].map(y => ({ value: y, label: y }))} placeholder="选择年份" />
              </Form.Item>
              <Form.Item label="颜色" required>
                <Select options={['黑色', '白色', '红色', '银色'].map(c => ({ value: c, label: c }))} placeholder="选择颜色" />
              </Form.Item>
              <Form.Item label="座位数" required>
                <InputNumber min={2} max={15} className="w-full" placeholder="座位数" />
              </Form.Item>
              <Form.Item label="变速箱">
                <Select options={[{ value: '自动', label: '自动' }, { value: '手动', label: '手动' }]} defaultValue="自动" />
              </Form.Item>
              <Form.Item label="半天价格 (¥)" required>
                <InputNumber min={0} className="w-full" placeholder="半天价格" />
              </Form.Item>
              <Form.Item label="全天价格 (¥)" required>
                <InputNumber min={0} className="w-full" placeholder="全天价格" />
              </Form.Item>
            </div>
            <Form.Item label="车辆照片">
              <Upload listType="picture-card" maxCount={10} multiple>
                <div>
                  <PlusOutlined />
                  <div className="mt-1 text-xs">上传照片</div>
                </div>
              </Upload>
            </Form.Item>
            <Form.Item label="车辆描述">
              <Input.TextArea rows={3} placeholder="车辆描述信息..." />
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </div>
  );
};

export default MerchantCars;