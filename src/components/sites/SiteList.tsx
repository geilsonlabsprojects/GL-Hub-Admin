import React from 'react';
import {
  Edit2,
  Trash2,
  Copy,
  ExternalLink,
  ChevronRight,
  Globe
} from 'lucide-react';
import { SiteModel, SiteStatus } from '@/models/siteModel';
import { Button } from '../ui/Button';
import { cn } from '@/utils/cn';

interface SiteListProps {
  sites: SiteModel[];
  onEdit: (site: SiteModel) => void;
  onDelete: (site: SiteModel) => void;
  onDuplicate: (site: SiteModel) => void;
}

const statusColors: Record<SiteStatus, string> = {
  published: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
  hidden: 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400',
  maintenance: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
  archived: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
};

const statusLabels: Record<SiteStatus, string> = {
  published: 'Publicado',
  hidden: 'Oculto',
  maintenance: 'Manutenção',
  archived: 'Arquivado',
};

export const SiteList: React.FC<SiteListProps> = ({
  sites,
  onEdit,
  onDelete,
  onDuplicate,
}) => {
  return (
    <div className="w-full overflow-x-auto rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/50">
            <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Site</th>
            <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">URL</th>
            <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Categoria</th>
            <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
            <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Ações</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
          {sites.map((site) => (
            <tr
              key={site.siteId}
              className="group hover:bg-gray-50 dark:hover:bg-gray-800/40 transition-colors"
            >
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-xl overflow-hidden border border-gray-100 dark:border-gray-700 bg-gray-100 flex-shrink-0">
                    <img src={site.iconUrl} alt={site.name} className="h-full w-full object-cover" />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="font-semibold text-gray-900 dark:text-gray-100 truncate">
                      {site.name}
                    </span>
                    <span className="text-xs text-gray-500 font-mono truncate">
                      {site.siteId}
                    </span>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4">
                <a
                  href={site.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm text-primary-600 hover:text-primary-700 hover:underline transition-all"
                >
                  <Globe className="h-3.5 w-3.5" />
                  <span className="max-w-[200px] truncate">{site.url.replace(/^https?:\/\//, '')}</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              </td>
              <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                {site.categoryId}
              </td>
              <td className="px-6 py-4">
                <span className={cn(
                  "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
                  statusColors[site.status]
                )}>
                  <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-current" />
                  {statusLabels[site.status]}
                </span>
              </td>
              <td className="px-6 py-4 text-right">
                <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button variant="ghost" size="icon" title="Editar" onClick={() => onEdit(site)}>
                    <Edit2 className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" title="Duplicar" onClick={() => onDuplicate(site)}>
                    <Copy className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    title="Excluir"
                    className="text-red-500 hover:text-red-600 hover:bg-red-50"
                    onClick={() => onDelete(site)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                <div className="group-hover:hidden flex justify-end">
                   <ChevronRight className="h-4 w-4 text-gray-300" />
                </div>
              </td>
            </tr>
          ))}
          {sites.length === 0 && (
            <tr>
              <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                Nenhum site encontrado.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
