import React, { useState } from 'react';
import {
  Sun,
  Moon,
  Monitor,
  LogOut,
  User as UserIcon,
  ChevronDown,
  Bell
} from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '../ui/Button';
import { SearchBar } from '../ui/SearchBar';
import { cn } from '@/utils/cn';
import { Menu } from 'lucide-react';

interface TopbarProps {
  onToggleSidebar?: () => void;
}

export const Topbar = ({ onToggleSidebar }: TopbarProps) => {
  const { theme, setTheme } = useTheme();
  const { user, logout } = useAuth();
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  return (
    <header className="h-16 border-b border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-950/80 backdrop-blur-md fixed top-0 right-0 left-0 z-30 px-4 transition-all duration-300">
      <div className="h-full flex items-center justify-between gap-4 max-w-7xl mx-auto">

        {/* Mobile Menu Toggle */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={onToggleSidebar}
        >
          <Menu className="h-5 w-5 text-gray-600 dark:text-gray-400" />
        </Button>

        {/* Mobile Spacer / Search on desktop */}
        <div className="flex-1 hidden md:block">
          <SearchBar />
        </div>

        <div className="flex items-center gap-2 md:gap-4">
          {/* Notifications */}
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5 text-gray-600 dark:text-gray-400" />
            <span className="absolute top-2 right-2 h-2 w-2 bg-red-500 rounded-full border-2 border-white dark:border-gray-950"></span>
          </Button>

          {/* Theme Toggle */}
          <div className="flex bg-gray-100 dark:bg-gray-900 rounded-full p-1">
            <button
              onClick={() => setTheme('light')}
              className={cn(
                'p-1.5 rounded-full transition-all',
                theme === 'light' ? 'bg-white text-primary-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'
              )}
            >
              <Sun className="h-4 w-4" />
            </button>
            <button
              onClick={() => setTheme('dark')}
              className={cn(
                'p-1.5 rounded-full transition-all',
                theme === 'dark' ? 'bg-gray-800 text-primary-400 shadow-sm' : 'text-gray-500 hover:text-gray-700'
              )}
            >
              <Moon className="h-4 w-4" />
            </button>
            <button
              onClick={() => setTheme('system')}
              className={cn(
                'p-1.5 rounded-full transition-all',
                theme === 'system' ? 'bg-white dark:bg-gray-800 text-primary-600 dark:text-primary-400 shadow-sm' : 'text-gray-500 hover:text-gray-700'
              )}
            >
              <Monitor className="h-4 w-4" />
            </button>
          </div>

          {/* User Menu */}
          <div className="relative">
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="flex items-center gap-2 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-900 transition-all"
            >
              <div className="h-8 w-8 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-800 flex items-center justify-center">
                {user?.photoURL ? (
                  <img src={user.photoURL} alt={user.displayName || 'User'} className="h-full w-full object-cover" />
                ) : (
                  <UserIcon className="h-5 w-5 text-gray-500" />
                )}
              </div>
              <div className="hidden sm:block text-left">
                <p className="text-xs font-semibold text-gray-900 dark:text-gray-100 leading-none">
                  {user?.displayName || 'Administrador'}
                </p>
                <p className="text-[10px] text-gray-500 dark:text-gray-400 leading-none mt-1 uppercase">Admin</p>
              </div>
              <ChevronDown className="h-4 w-4 text-gray-500 hidden sm:block" />
            </button>

            {showProfileMenu && (
              <div className="absolute top-full right-0 mt-2 w-48 bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-800 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2">
                <div className="p-4 border-b border-gray-100 dark:border-gray-800">
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">{user?.email}</p>
                </div>
                <div className="p-1">
                  <button
                    onClick={() => {}} // Navigate to profile
                    className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors"
                  >
                    <UserIcon className="h-4 w-4" /> Perfil
                  </button>
                  <button
                    onClick={logout}
                    className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-colors"
                  >
                    <LogOut className="h-4 w-4" /> Sair
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
