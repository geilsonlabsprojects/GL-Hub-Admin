import React from 'react';
import { Edit2, Trash2, Calendar, Link as LinkIcon, ChevronRight } from 'lucide-react';
import { BannerModel } from '@/models/bannerModel';
import { Button } from '@/components/ui/Button';
import { cn } from '@/utils/cn';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface BannerListProps {
  banners: BannerModel[];
  onEdit: (banner: BannerModel) => void;
  onDelete: (banner: BannerModel) => void;
}

export const BannerList: React.FC<BannerListProps> = ({
  banners,
  onEdit,
  onDelete,
}) => {
  const isExpired = (endDate?: Date) => {
    if (!endDate) return false;
    return new Date(endDate) < new Date();
  };

  const isScheduled = (startDate?: Date) => {
    if (!startDate) return false;
    return new Date(startDate) > new Date();
  };

  return (
    <div className="w-full overflow-x-auto rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/50">
            <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Banner</th>
            <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Validade</th>
            <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Tipo</th>
            <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
            <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Ações</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
          {banners.map((banner) => {
            const expired = isExpired(banner.endDate);
            const scheduled = isScheduled(banner.startDate);

            return (
              <tr
                key={banner.id}
                className="group hover:bg-gray-50 dark:hover:bg-gray-800/40 transition-colors"
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-4">
                    <div className="h-16 w-28 rounded-xl overflow-hidden border border-gray-100 dark:border-gray-700 bg-gray-100 flex-shrink-0">
                      <img src={banner.imageUrl} alt={banner.title} className="h-full w-full object-cover" />
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="font-semibold text-gray-900 dark:text-gray-100 truncate">
                        {banner.title}
                      </span>
                      {banner.linkUrl && (
                        <span className="text-xs text-gray-500 flex items-center gap-1 truncate">
                          <LinkIcon className="h-3 w-3" />
                          {banner.linkUrl}
                        </span>
                      )}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-col gap-1">
                    {banner.startDate || banner.endDate ? (
                      <>
                        <div className="flex items-center gap-1.5 text-xs text-gray-600 dark:text-gray-400">
                          <Calendar className="h-3 w-3" />
                          {banner.startDate ? format(new Date(banner.startDate), 'dd/MM/yy', { locale: ptBR }) : 'Início'}
                          {' - '}
                          {banner.endDate ? format(new Date(banner.endDate), 'dd/MM/yy', { locale: ptBR }) : 'Fim'}
                        </div>
                        {expired && (
                          <span className="text-[10px] font-bold text-red-500 uppercase">Expirado</span>
                        )}
                        {scheduled && (
                          <span className="text-[10px] font-bold text-blue-500 uppercase">Agendado</span>
                        )}
                      </>
                    ) : (
                      <span className="text-xs text-gray-400 italic">Sempre visível</span>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={cn(
                    "px-2 py-0.5 rounded text-[10px] font-bold uppercase border",
                    banner.type === 'internal'
                      ? "border-blue-200 text-blue-600 bg-blue-50"
                      : "border-purple-200 text-purple-600 bg-purple-50"
                  )}>
                    {banner.type === 'internal' ? 'Interno' : 'Externo'}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className={cn(
                    "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
                    banner.status === 'active' && !expired
                      ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                      : "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400"
                  )}>
                    <span className={cn(
                      "mr-1.5 h-1.5 w-1.5 rounded-full",
                      banner.status === 'active' && !expired ? "bg-green-500" : "bg-gray-400"
                    )} />
                    {banner.status === 'active' ? (expired ? 'Expirado' : 'Ativo') : 'Inativo'}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button variant="ghost" size="icon" title="Editar" onClick={() => onEdit(banner)}>
                      <Edit2 className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" title="Excluir" className="text-red-500 hover:text-red-600 hover:bg-red-50" onClick={() => onDelete(banner)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="group-hover:hidden flex justify-end">
                     <ChevronRight className="h-4 w-4 text-gray-300" />
                  </div>
                </td>
              </tr>
            );
          })}
          {banners.length === 0 && (
            <tr>
              <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                Nenhum banner encontrado.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
