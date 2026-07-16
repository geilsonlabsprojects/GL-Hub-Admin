import React from 'react';
import { Dialog } from './Dialog';
import { Button } from './Button';
import { AlertTriangle } from 'lucide-react';
import { cn } from '@/utils/cn';

interface ConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: 'danger' | 'primary' | 'warning';
  isLoading?: boolean;
}

export const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  confirmLabel = 'Confirmar',
  cancelLabel = 'Cancelar',
  variant = 'danger',
  isLoading = false,
}) => {
  const variantStyles = {
    danger: 'bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400',
    primary: 'bg-primary-50 text-primary-600 dark:bg-primary-900/20 dark:text-primary-400',
    warning: 'bg-yellow-50 text-yellow-600 dark:bg-yellow-900/20 dark:text-yellow-400',
  };

  const buttonVariants: Record<'danger' | 'primary' | 'warning', "primary" | "secondary" | "outline" | "ghost" | "danger" | "success" | "warning" | null | undefined> = {
    danger: 'danger',
    primary: 'primary',
    warning: 'warning',
  };

  return (
    <Dialog isOpen={isOpen} onClose={onClose} size="sm">
      <div className="flex flex-col items-center text-center">
        <div className={cn("p-4 rounded-2xl mb-4", variantStyles[variant])}>
          <AlertTriangle className="h-8 w-8" />
        </div>

        <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
          {title}
        </h3>

        <p className="text-gray-500 dark:text-gray-400 text-sm mb-8">
          {description}
        </p>

        <div className="flex items-center gap-3 w-full">
          <Button
            variant="outline"
            className="flex-1"
            onClick={onClose}
            disabled={isLoading}
          >
            {cancelLabel}
          </Button>
          <Button
            variant={buttonVariants[variant]}
            className="flex-1"
            onClick={onConfirm}
            isLoading={isLoading}
          >
            {confirmLabel}
          </Button>
        </div>
      </div>
    </Dialog>
  );
};
