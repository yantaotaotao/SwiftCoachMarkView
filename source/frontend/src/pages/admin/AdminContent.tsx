import React from 'react';
import { Card, Table, Button, Typography, Tag, Space, message, Tabs } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

const MOCK_BANNERS = [
  { key: 1, title: '夏季婚车特惠', image: '/banner1.jpg', link: '/cars', sort: 1, status: true },
  { key: 2, title: '新人专享优惠', image: '/banner2.jpg', link: '/cars', sort: 2, status: true },
  { key: 3, title: '豪华车队推荐', image: '/banner3.jpg', link: '/fleet', sort: 3, status: false },
];

const AdminContent: React.FC = () => {
  const bannerColumns = [
    { title: '标题', dataIndex: 'title', key: 'title' },
    { title: '图片', dataIndex: 'image', key: 'image' },
    { title: '链接', dataIndex: 'link', key: 'link' },
    { title: '排序', dataIndex: 'sort', key: 'sort' },
    { title: '状态', dataIndex: 'status', key: 'status', render: (s: boolean) => <Tag color={s ? 'green' : 'default'}>{s ? '启用' : '禁用'}</Tag> },
    {
      title: '操作', key: 'action',
      render: () => (
        <Space>
          <Button type="link" size="small" icon={<EditOutlined />}>编辑</Button>
          <Button type="link" size="small" danger icon={<DeleteOutlined />}>删除</Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-[#FFF9F6] py-8">
      <div className="max-w-7xl mx-auto px-4">
        <Title level={4} className="!mb-6 !text-gray-800">内容管理</Title>
        <Card className="rounded-xl shadow-sm" style={{ border: '1px solid #F0E0D8' }}>
          <Tabs items={[
            {
              key: 'banners',
              label: 'Banner 管理',
              children: (
                <div>
                  <div className="flex justify-end mb-4">
                    <Button type="primary" icon={<PlusOutlined />} className="rounded-lg">添加 Banner</Button>
                  </div>
                  <Table dataSource={MOCK_BANNERS} columns={bannerColumns} />
                </div>
              ),
            },
            {
              key: 'categories',
              label: '分类管理',
              children: (
                <div className="space-y-3">
                  {['奔驰', '宝马', '奥迪', '保时捷', '路虎', '红旗', '复古', '其他'].map((cat, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 bg-[#FFF8F5] rounded-lg">
                      <Text>{cat}</Text>
                      <Space>
                        <Button type="link" size="small" icon={<EditOutlined />}>编辑</Button>
                        <Button type="link" size="small" danger icon={<DeleteOutlined />}>删除</Button>
                      </Space>
                    </div>
                  ))}
                  <Button type="dashed" block icon={<PlusOutlined />} className="rounded-lg">添加分类</Button>
                </div>
              ),
            },
            {
              key: 'notices',
              label: '公告管理',
              children: (
                <div className="p-8 text-center text-gray-400">
                  <div>公告管理功能开发中...</div>
                </div>
              ),
            },
          ]} />
        </Card>
      </div>
    </div>
  );
};

export default AdminContent;