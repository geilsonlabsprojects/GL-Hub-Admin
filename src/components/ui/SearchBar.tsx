import React from 'react';
import { Search } from 'lucide-react';
import { cn } from '@/utils/cn';

interface SearchBarProps extends React.InputHTMLAttributes<HTMLInputElement> {
  containerClassName?: string;
}

export const SearchBar = ({ className, containerClassName, ...props }: SearchBarProps) => {
  return (
    <div className={cn('relative w-full max-w-md', containerClassName)}>
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <Search className="h-4 w-4 text-gray-500 dark:text-gray-400" />
      </div>
      <input
        type="search"
        className={cn(
          'block w-full pl-10 pr-3 py-2 text-sm text-gray-900 bg-gray-100 border-none rounded-full focus:ring-2 focus:ring-primary-500 focus:bg-white transition-all dark:bg-gray-800 dark:text-gray-100 dark:focus:bg-gray-900',
          className
        )}
        placeholder="Buscar..."
        {...props}
      />
    </div>
  );
};
