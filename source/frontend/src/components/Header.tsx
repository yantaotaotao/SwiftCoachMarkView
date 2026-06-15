import React from 'react';
import { Layout, Input, Button, Space, Select, Dropdown } from 'antd';
import { SearchOutlined, UserOutlined, MenuOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';

const { Header: AntHeader } = Layout;

const Header: React.FC = () => {
  const navigate = useNavigate();

  return (
    <AntHeader className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md" style={{ padding: '0 24px', height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '2px solid #D4A853' }}>
      <div className="flex items-center gap-8">
        <Link to="/" className="flex items-center no-underline">
          <span className="text-2xl font-bold" style={{ color: '#D4380D' }}>良缘锦程</span>
          <span className="ml-2 text-sm px-2 py-0.5 rounded" style={{ backgroundColor: '#FFF1F0', color: '#D4380D', border: '1px solid #FFCCC7' }}>婚车</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-gray-700 hover:text-[#D4380D] transition-colors font-medium">首页</Link>
          <Link to="/cars" className="text-gray-700 hover:text-[#D4380D] transition-colors font-medium">婚车列表</Link>
          <Link to="/cars?type=fleet" className="text-gray-700 hover:text-[#D4380D] transition-colors font-medium">车队套餐</Link>
          <Link to="/user/orders" className="text-gray-700 hover:text-[#D4380D] transition-colors font-medium">我的订单</Link>
        </nav>
      </div>
      <div className="flex items-center gap-4">
        <Select
          defaultValue={0}
          style={{ width: 100 }}
          options={[
            { value: 0, label: '汉中 ▼' },
            { value: 1, label: '汉台区' },
            { value: 2, label: '南郑区' },
            { value: 3, label: '城固县' },
            { value: 4, label: '洋县' },
            { value: 5, label: '勉县' },
          ]}
          className="hidden sm:inline-flex"
        />
        <Input
          placeholder="搜索车型或商家..."
          prefix={<SearchOutlined className="text-gray-400" />}
          className="hidden sm:inline-flex max-w-[240px]"
          onPressEnter={(e) => {
            const val = (e.target as HTMLInputElement).value;
            if (val) navigate(`/cars?keyword=${encodeURIComponent(val)}`);
          }}
        />
        <Space>
          <Button type="link" onClick={() => navigate('/login')}>登录</Button>
          <Button type="primary" onClick={() => navigate('/register')}>注册</Button>
        </Space>
        <Button type="text" icon={<MenuOutlined />} className="md:hidden" />
      </div>
    </AntHeader>
  );
};

export default Header;