import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import AdminGuard from './AdminGuard';
import AppLayout from '@/components/layout/AppLayout';

// Pages
import Login from '@/pages/Login/LoginPage';
import AccessDenied from '@/pages/Common/AccessDeniedPage';
import Dashboard from '@/pages/Dashboard/DashboardPage';
import Apps from '@/pages/Apps/AppsPage';
import Sites from '@/pages/Sites/SitesPage';
import Categories from '@/pages/Categories/CategoriesPage';
import Versions from '@/pages/Versions/VersionsPage';
import News from '@/pages/News/NewsPage';
import Banners from '@/pages/Banners/BannersPage';
import Featured from '@/pages/Featured/FeaturedPage';
import HomeSlider from '@/pages/HomeSlider/HomeSliderPage';
import Users from '@/pages/Users/UsersPage';
import Logs from '@/pages/Logs/LogsPage';
import Settings from '@/pages/Settings/SettingsPage';
import Profile from '@/pages/Profile/ProfilePage';
import { useAuth } from '@/contexts/AuthContext';

const AppRoutes: React.FC = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <Routes>
      {/* Public Routes */}
      <Route
        path="/login"
        element={!user ? <Login /> : <Navigate to="/dashboard" replace />}
      />

      {/* Authenticated Only */}
      <Route
        path="/access-denied"
        element={
          <ProtectedRoute>
            <AccessDenied />
          </ProtectedRoute>
        }
      />

      {/* Private & Admin Only Routes */}
      <Route element={
        <ProtectedRoute>
          <AdminGuard>
            <AppLayout />
          </AdminGuard>
        </ProtectedRoute>
      }>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/apps" element={<Apps />} />
        <Route path="/sites" element={<Sites />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/versions" element={<Versions />} />
        <Route path="/news" element={<News />} />
        <Route path="/banners" element={<Banners />} />
        <Route path="/featured" element={<Featured />} />
        <Route path="/home-slider" element={<HomeSlider />} />
        <Route path="/users" element={<Users />} />
        <Route path="/logs" element={<Logs />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/profile" element={<Profile />} />
      </Route>

      {/* Default Redirects */}
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
};

export default AppRoutes;
