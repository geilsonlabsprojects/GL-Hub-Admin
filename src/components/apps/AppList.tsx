import React from 'react';
import {
  Edit2,
  Trash2,
  Copy,
  Eye,
  MoreVertical,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { AppModel, AppStatus } from '@/models/appModel';
import { Button } from '../ui/Button';
import { cn } from '@/utils/cn';

interface AppListProps {
  apps: AppModel[];
  onEdit: (app: AppModel) => void;
  onDelete: (app: AppModel) => void;
  onDuplicate: (app: AppModel) => void;
  onView: (app: AppModel) => void;
}

const statusColors: Record<AppStatus, string> = {
  published: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
  beta: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
  hidden: 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400',
  maintenance: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
  archived: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
};

const statusLabels: Record<AppStatus, string> = {
  published: 'Publicado',
  beta: 'Beta',
  hidden: 'Oculto',
  maintenance: 'Manutenção',
  archived: 'Arquivado',
};

export const AppList: React.FC<AppListProps> = ({
  apps,
  onEdit,
  onDelete,
  onDuplicate,
  onView,
}) => {
  return (
    <div className="w-full overflow-x-auto rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/50">
            <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">App</th>
            <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Versão</th>
            <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Categoria</th>
            <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
            <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Empresa</th>
            <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Ações</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
          {apps.map((app) => (
            <tr
              key={app.appId}
              className="group hover:bg-gray-50 dark:hover:bg-gray-800/40 transition-colors"
            >
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-xl overflow-hidden border border-gray-100 dark:border-gray-700 bg-gray-100 flex-shrink-0">
                    <img src={app.icon} alt={app.name} className="h-full w-full object-cover" />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="font-semibold text-gray-900 dark:text-gray-100 truncate">
                      {app.name}
                    </span>
                    <span className="text-xs text-gray-500 font-mono truncate">
                      {app.appId}
                    </span>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                    v{app.versionName}
                  </span>
                  <span className="text-xs text-gray-500">
                    Code: {app.versionCode}
                  </span>
                </div>
              </td>
              <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                {app.category}
              </td>
              <td className="px-6 py-4">
                <span className={cn(
                  "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
                  statusColors[app.status]
                )}>
                  <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-current" />
                  {statusLabels[app.status]}
                </span>
              </td>
              <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                {app.company}
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button variant="ghost" size="icon" title="Ver" onClick={() => onView(app)}>
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" title="Editar" onClick={() => onEdit(app)}>
                    <Edit2 className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" title="Duplicar" onClick={() => onDuplicate(app)}>
                    <Copy className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" title="Excluir" className="text-red-500 hover:text-red-600 hover:bg-red-50" onClick={() => onDelete(app)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                <div className="group-hover:hidden flex justify-end">
                   <ChevronRight className="h-4 w-4 text-gray-300" />
                </div>
              </td>
            </tr>
          ))}
          {apps.length === 0 && (
            <tr>
              <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                Nenhum aplicativo encontrado.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
