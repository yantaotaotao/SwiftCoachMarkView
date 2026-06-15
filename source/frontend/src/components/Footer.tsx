import React from 'react';
import { Layout, Space } from 'antd';
import { Link } from 'react-router-dom';

const { Footer: AntFooter } = Layout;

const Footer: React.FC = () => {
  return (
    <AntFooter className="bg-[#1A1A2E] text-gray-300" style={{ padding: '40px 24px 24px' }}>
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-bold text-white mb-4">
              <span style={{ color: '#FF6B35' }}>良缘</span>
              <span style={{ color: '#D4A853' }}>锦程</span>
            </h3>
            <p className="text-sm text-gray-400">连接新人與婚车服务商的在线预订平台</p>
            <p className="text-sm text-gray-400 mt-2">聚焦陕西汉中本地市场</p>
          </div>
          <div>
            <h4 className="text-white font-medium mb-3">快速链接</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/cars" className="text-gray-400 hover:text-[#FF6B35]">婚车列表</Link></li>
              <li><Link to="/cars?type=fleet" className="text-gray-400 hover:text-[#FF6B35]">车队套餐</Link></li>
              <li><Link to="/user/orders" className="text-gray-400 hover:text-[#FF6B35]">我的订单</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-medium mb-3">服务支持</h4>
            <ul className="space-y-2 text-sm">
              <li><span className="text-gray-400">关于我们</span></li>
              <li><span className="text-gray-400">帮助中心</span></li>
              <li><span className="text-gray-400">服务条款</span></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-medium mb-3">联系方式</h4>
            <ul className="space-y-2 text-sm">
              <li><span className="text-gray-400">📞 0916-XXXXXXX</span></li>
              <li><span className="text-gray-400">📧 contact@lyjc.com</span></li>
              <li><span className="text-gray-400">📍 陕西省汉中市汉台区</span></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-700 pt-6 text-center text-xs text-gray-500">
          <p>© 2026 良缘锦程 婚车预订平台 — 汉中本地专业婚车服务</p>
          <p className="mt-1">陕ICP备XXXXXXXX号</p>
        </div>
      </div>
    </AntFooter>
  );
};

export default Footer;