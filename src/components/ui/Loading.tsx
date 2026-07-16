import React from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '@/utils/cn';

interface LoadingProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  fullScreen?: boolean;
}

export const Loading = ({ className, size = 'md', fullScreen = false }: LoadingProps) => {
  const sizes = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12',
    xl: 'h-16 w-16',
  };

  const containerClasses = fullScreen
    ? 'fixed inset-0 flex items-center justify-center bg-white/80 dark:bg-gray-950/80 z-50'
    : 'flex items-center justify-center p-8';

  return (
    <div className={cn(containerClasses, className)}>
      <Loader2 className={cn('animate-spin text-primary-600 dark:text-primary-500', sizes[size])} />
    </div>
  );
};
