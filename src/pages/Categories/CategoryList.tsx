import React from 'react';
import { Edit2, Trash2, LayoutGrid, ChevronRight } from 'lucide-react';
import { CategoryModel } from '@/models/categoryModel';
import { Button } from '@/components/ui/Button';
import { cn } from '@/utils/cn';

interface CategoryListProps {
  categories: CategoryModel[];
  onEdit: (category: CategoryModel) => void;
  onDelete: (category: CategoryModel) => void;
}

export const CategoryList: React.FC<CategoryListProps> = ({
  categories,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="w-full overflow-x-auto rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/50">
            <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Categoria</th>
            <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Slug</th>
            <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-center">Ordem</th>
            <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
            <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Ações</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
          {categories.map((category) => (
            <tr
              key={category.id}
              className="group hover:bg-gray-50 dark:hover:bg-gray-800/40 transition-colors"
            >
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <div
                    className="h-10 w-10 rounded-xl flex items-center justify-center text-white flex-shrink-0"
                    style={{ backgroundColor: category.color || '#ccc' }}
                  >
                    {category.iconUrl ? (
                      <img src={category.iconUrl} alt={category.name} className="h-6 w-6 object-contain" />
                    ) : (
                      <LayoutGrid className="h-5 w-5" />
                    )}
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="font-semibold text-gray-900 dark:text-gray-100 truncate">
                      {category.name}
                    </span>
                    {category.description && (
                      <span className="text-xs text-gray-500 truncate max-w-[200px]">
                        {category.description}
                      </span>
                    )}
                  </div>
                </div>
              </td>
              <td className="px-6 py-4">
                <span className="text-sm font-mono text-gray-500">
                  /{category.slug}
                </span>
              </td>
              <td className="px-6 py-4 text-center">
                <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                  {category.order}
                </span>
              </td>
              <td className="px-6 py-4">
                <span className={cn(
                  "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
                  category.status === 'active'
                    ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                    : "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400"
                )}>
                  <span className={cn(
                    "mr-1.5 h-1.5 w-1.5 rounded-full",
                    category.status === 'active' ? "bg-green-500" : "bg-gray-400"
                  )} />
                  {category.status === 'active' ? 'Ativa' : 'Inativa'}
                </span>
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button variant="ghost" size="icon" title="Editar" onClick={() => onEdit(category)}>
                    <Edit2 className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" title="Excluir" className="text-red-500 hover:text-red-600 hover:bg-red-50" onClick={() => onDelete(category)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                <div className="group-hover:hidden flex justify-end">
                   <ChevronRight className="h-4 w-4 text-gray-300" />
                </div>
              </td>
            </tr>
          ))}
          {categories.length === 0 && (
            <tr>
              <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                Nenhuma categoria encontrada.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
