import React from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';
import { Button } from './Button';
import { cn } from '@/utils/cn';

interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  className?: string;
}

export const ErrorState = ({
  title = "Ocorreu um erro",
  message = "Não foi possível carregar os dados. Por favor, tente novamente.",
  onRetry,
  className
}: ErrorStateProps) => {
  return (
    <div className={cn("flex flex-col items-center justify-center p-12 text-center bg-red-50/50 dark:bg-red-900/10 rounded-3xl border-2 border-dashed border-red-100 dark:border-red-900/20", className)}>
      <div className="mb-4 text-red-500">
        <AlertCircle className="h-12 w-12" />
      </div>
      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{title}</h3>
      <p className="mt-2 text-sm text-gray-500 dark:text-gray-400 max-w-xs">{message}</p>
      {onRetry && (
        <Button
          onClick={onRetry}
          variant="outline"
          className="mt-6 gap-2"
        >
          <RefreshCw className="h-4 w-4" />
          Tentar Novamente
        </Button>
      )}
    </div>
  );
};
