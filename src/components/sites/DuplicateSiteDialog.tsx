import React, { useState, useEffect } from 'react';
import { Dialog } from '../ui/Dialog';
import { Button } from '../ui/Button';
import { Copy, AlertCircle, Globe } from 'lucide-react';
import { SiteModel } from '@/models/siteModel';

interface DuplicateSiteDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (newSiteId: string) => void;
  site: SiteModel | null;
  isLoading?: boolean;
}

export const DuplicateSiteDialog: React.FC<DuplicateSiteDialogProps> = ({
  isOpen,
  onClose,
  onConfirm,
  site,
  isLoading,
}) => {
  const [newSiteId, setNewSiteId] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (site && isOpen) {
      setNewSiteId(`${site.siteId}-copy`);
      setError('');
    }
  }, [site, isOpen]);

  const handleConfirm = () => {
    if (!newSiteId.trim()) {
      setError('O ID do novo site é obrigatório.');
      return;
    }
    if (newSiteId === site?.siteId) {
      setError('O novo ID deve ser diferente do original.');
      return;
    }
    onConfirm(newSiteId);
  };

  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      title="Duplicar Site"
      description={`Crie uma cópia de "${site?.name}" com um novo identificador.`}
      size="sm"
    >
      <div className="space-y-4">
        <div className="p-4 bg-primary-50 dark:bg-primary-900/10 rounded-2xl flex items-center gap-3 border border-primary-100 dark:border-primary-900/20">
          <Globe className="h-5 w-5 text-primary-600 dark:text-primary-400" />
          <div className="text-sm">
            <p className="font-semibold text-primary-900 dark:text-primary-100">Site de Origem</p>
            <p className="text-primary-700 dark:text-primary-400">{site?.siteId}</p>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
            Novo ID do Site (Slug)
          </label>
          <input
            type="text"
            className="w-full px-4 py-2.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all"
            placeholder="novo-id-do-site"
            value={newSiteId}
            onChange={(e) => {
              setNewSiteId(e.target.value);
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
