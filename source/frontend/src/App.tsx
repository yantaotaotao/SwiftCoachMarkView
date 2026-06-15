import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Layout } from 'antd';
import HomePage from './pages/home/HomePage';
import CarListPage from './pages/cars/CarListPage';
import CarDetailPage from './pages/cars/CarDetailPage';
import OrderCreatePage from './pages/order/OrderCreatePage';
import OrderPayPage from './pages/order/OrderPayPage';
import OrderResultPage from './pages/order/OrderResultPage';
import UserOrdersPage from './pages/user/UserOrdersPage';
import UserOrderDetailPage from './pages/user/UserOrderDetailPage';
import UserFavoritesPage from './pages/user/UserFavoritesPage';
import UserProfilePage from './pages/user/UserProfilePage';
import UserHistoryPage from './pages/user/UserHistoryPage';
import ShopPage from './pages/user/ShopPage';
import LoginPage from './pages/user/LoginPage';
import RegisterPage from './pages/user/RegisterPage';
import MerchantDashboard from './pages/merchant/MerchantDashboard';
import MerchantCars from './pages/merchant/MerchantCars';
import MerchantOrders from './pages/merchant/MerchantOrders';
import MerchantFinance from './pages/merchant/MerchantFinance';
import MerchantShop from './pages/merchant/MerchantShop';
import MerchantReviews from './pages/merchant/MerchantReviews';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminUsers from './pages/admin/AdminUsers';
import AdminMerchants from './pages/admin/AdminMerchants';
import AdminCars from './pages/admin/AdminCars';
import AdminOrders from './pages/admin/AdminOrders';
import AdminFinance from './pages/admin/AdminFinance';
import AdminContent from './pages/admin/AdminContent';
import AdminSettings from './pages/admin/AdminSettings';
import Header from './components/Header';
import Footer from './components/Footer';

const { Content } = Layout;

const App: React.FC = () => {
  return (
    <Layout className="min-h-screen bg-[#FFF9F6]">
      <Header />
      <Content className="pt-16">
        <Routes>
          {/* 用户前台 */}
          <Route path="/" element={<HomePage />} />
          <Route path="/cars" element={<CarListPage />} />
          <Route path="/car/:id" element={<CarDetailPage />} />
          <Route path="/order/create" element={<OrderCreatePage />} />
          <Route path="/order/pay/:orderNo" element={<OrderPayPage />} />
          <Route path="/order/result" element={<OrderResultPage />} />
          <Route path="/user/orders" element={<UserOrdersPage />} />
          <Route path="/user/orders/:id" element={<UserOrderDetailPage />} />
          <Route path="/user/favorites" element={<UserFavoritesPage />} />
          <Route path="/user/profile" element={<UserProfilePage />} />
          <Route path="/user/history" element={<UserHistoryPage />} />
          <Route path="/shop/:id" element={<ShopPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* 商家后台 */}
          <Route path="/merchant/dashboard" element={<MerchantDashboard />} />
          <Route path="/merchant/cars" element={<MerchantCars />} />
          <Route path="/merchant/orders" element={<MerchantOrders />} />
          <Route path="/merchant/finance" element={<MerchantFinance />} />
          <Route path="/merchant/shop" element={<MerchantShop />} />
          <Route path="/merchant/reviews" element={<MerchantReviews />} />

          {/* 平台管理后台 */}
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/users" element={<AdminUsers />} />
          <Route path="/admin/merchants" element={<AdminMerchants />} />
          <Route path="/admin/cars" element={<AdminCars />} />
          <Route path="/admin/orders" element={<AdminOrders />} />
          <Route path="/admin/finance" element={<AdminFinance />} />
          <Route path="/admin/content" element={<AdminContent />} />
          <Route path="/admin/settings" element={<AdminSettings />} />
        </Routes>
      </Content>
      <Footer />
    </Layout>
  );
};

export default App;