import React from 'react';
import { Search, FilterX } from 'lucide-react';
import { Button } from '../ui/Button';

interface AppFiltersProps {
  onSearchChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
  onStatusChange: (value: string) => void;
  onCompanyChange: (value: string) => void;
  onClearFilters: () => void;
  categories: string[];
  companies: string[];
  currentFilters: {
    search: string;
    category: string;
    status: string;
    company: string;
  };
}

export const AppFilters: React.FC<AppFiltersProps> = ({
  onSearchChange,
  onCategoryChange,
  onStatusChange,
  onCompanyChange,
  onClearFilters,
  categories,
  companies,
  currentFilters,
}) => {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between bg-white dark:bg-gray-900 p-4 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm">
      <div className="relative flex-1 max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
        <input
          type="text"
          placeholder="Buscar por nome ou ID..."
          className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all"
          value={currentFilters.search}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <select
          className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
          value={currentFilters.category}
          onChange={(e) => onCategoryChange(e.target.value)}
        >
          <option value="">Todas Categorias</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <select
          className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
          value={currentFilters.status}
          onChange={(e) => onStatusChange(e.target.value)}
        >
          <option value="">Todos Status</option>
          <option value="published">Publicado</option>
          <option value="beta">Beta</option>
          <option value="hidden">Oculto</option>
          <option value="maintenance">Manutenção</option>
          <option value="archived">Arquivado</option>
        </select>

        <select
          className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
          value={currentFilters.company}
          onChange={(e) => onCompanyChange(e.target.value)}
        >
          <option value="">Todas Empresas</option>
          {companies.map((company) => (
            <option key={company} value={company}>
              {company}
            </option>
          ))}
        </select>

        <Button
          variant="ghost"
          size="sm"
          onClick={onClearFilters}
          className="text-gray-500"
          leftIcon={<FilterX className="h-4 w-4" />}
        >
          Limpar
        </Button>
      </div>
    </div>
  );
};
