import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  AppWindow,
  Globe,
  Tag,
  GitBranch,
  Newspaper,
  Image as ImageIcon,
  Star,
  Layout,
  Users,
  ScrollText,
  Settings,
  UserCircle,
  ChevronLeft,
  ChevronRight,
  Menu
} from 'lucide-react';
import { cn } from '@/utils/cn';
import { Button } from '../ui/Button';

interface SidebarProps {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
  { icon: AppWindow, label: 'Aplicativos', path: '/apps' },
  { icon: Globe, label: 'Sites', path: '/sites' },
  { icon: Tag, label: 'Categorias', path: '/categories' },
  { icon: GitBranch, label: 'Versões', path: '/versions' },
  { icon: Newspaper, label: 'Novidades', path: '/news' },
  { icon: ImageIcon, label: 'Banners', path: '/banners' },
  { icon: Star, label: 'Destaques', path: '/featured' },
  { icon: Layout, label: 'Home Slider', path: '/home-slider' },
  { icon: Users, label: 'Usuários', path: '/users' },
  { icon: ScrollText, label: 'Logs', path: '/logs' },
  { icon: Settings, label: 'Configurações', path: '/settings' },
  { icon: UserCircle, label: 'Perfil', path: '/profile' },
];

export const Sidebar = ({ collapsed, setCollapsed }: SidebarProps) => {
  return (
    <aside
      className={cn(
        'fixed left-0 top-0 z-50 h-screen transition-all duration-300 border-r border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 flex flex-col',
        collapsed ? 'w-20 -translate-x-full md:translate-x-0' : 'w-64 translate-x-0'
      )}
    >
      {/* Header / Toggle */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-gray-200 dark:border-gray-800">
        {!collapsed && <span className="font-bold text-xl text-primary-600 dark:text-primary-500 truncate">GL Hub</span>}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setCollapsed(!collapsed)}
          className="ml-auto"
        >
          {collapsed ? <Menu className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4 px-2 space-y-1 scrollbar-hide">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-3 px-3 py-2 rounded-xl transition-all group',
                isActive
                  ? 'bg-primary-100 text-primary-900 dark:bg-primary-900/30 dark:text-primary-100'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-900 hover:text-gray-900 dark:hover:text-gray-100'
              )
            }
          >
            <item.icon className={cn('h-5 w-5 shrink-0')} />
            {!collapsed && <span className="font-medium whitespace-nowrap">{item.label}</span>}
            {collapsed && (
              <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50">
                {item.label}
              </div>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Footer / Version info could go here */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-800">
        {!collapsed && <p className="text-[10px] text-gray-400 text-center uppercase tracking-widest">Admin v1.0.0</p>}
      </div>
    </aside>
  );
};
