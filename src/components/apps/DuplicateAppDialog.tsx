import React, { useState, useEffect } from 'react';
import { Dialog } from '../ui/Dialog';
import { Button } from '../ui/Button';
import { Copy, AlertCircle } from 'lucide-react';
import { AppModel } from '@/models/appModel';

interface DuplicateAppDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (newAppId: string) => void;
  app: AppModel | null;
  isLoading?: boolean;
}

export const DuplicateAppDialog: React.FC<DuplicateAppDialogProps> = ({
  isOpen,
  onClose,
  onConfirm,
  app,
  isLoading,
}) => {
  const [newAppId, setNewAppId] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (app && isOpen) {
      setNewAppId(`${app.appId}.copy`);
      setError('');
    }
  }, [app, isOpen]);

  const handleConfirm = () => {
    if (!newAppId.trim()) {
      setError('O ID do novo aplicativo é obrigatório.');
      return;
    }
    if (newAppId === app?.appId) {
      setError('O novo ID deve ser diferente do original.');
      return;
    }
    onConfirm(newAppId);
  };

  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      title="Duplicar Aplicativo"
      description={`Crie uma cópia de "${app?.name}" com um novo identificador.`}
      size="sm"
    >
      <div className="space-y-4">
        <div className="p-4 bg-primary-50 dark:bg-primary-900/10 rounded-2xl flex items-center gap-3 border border-primary-100 dark:border-primary-900/20">
          <Copy className="h-5 w-5 text-primary-600 dark:text-primary-400" />
          <div className="text-sm">
            <p className="font-semibold text-primary-900 dark:text-primary-100">Aplicativo de Origem</p>
            <p className="text-primary-700 dark:text-primary-400">{app?.appId}</p>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
            Novo ID do Pacote (App ID)
          </label>
          <input
            type="text"
            className="w-full px-4 py-2.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all"
            placeholder="com.company.app.new"
            value={newAppId}
            onChange={(e) => {
              setNewAppId(e.target.value);
              setError('');
            }}
          />
          {error && (
            <span className="text-xs text-red-500 mt-1 flex items-center gap-1">
              <AlertCircle className="h-3 w-3" /> {error}
            </span>
          )}
        </div>

        <div className="flex items-center gap-3 pt-4">
          <Button
            variant="outline"
            className="flex-1"
            onClick={onClose}
            disabled={isLoading}
          >
            Cancelar
          </Button>
          <Button
            className="flex-1"
            onClick={handleConfirm}
            isLoading={isLoading}
            leftIcon={<Copy className="h-4 w-4" />}
          >
            Duplicar
          </Button>
        </div>
      </div>
    </Dialog>
  );
};
