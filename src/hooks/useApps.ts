import { useQuery } from '@tanstack/react-query';
import { appService } from '@/services/appService';
import { AppModel, AppStatus } from '@/models';
import { useMemo, useState } from 'react';

export interface AppFilters {
  category?: string;
  status?: AppStatus;
  company?: string;
  search?: string;
}

export type AppSortBy = 'name' | 'date' | 'downloads';
export type AppSortOrder = 'asc' | 'desc';

export const useApps = (
  initialFilters: AppFilters = {},
  initialSort: { by: AppSortBy; order: AppSortOrder } = { by: 'date', order: 'desc' }
) => {
  const [filters, setFilters] = useState<AppFilters>(initialFilters);
  const [sort, setSort] = useState<{ by: AppSortBy; order: AppSortOrder }>(initialSort);

  const { data: apps = [], isLoading, error, isSuccess } = useQuery({
    queryKey: ['apps'],
    queryFn: appService.getAll,
  });

  const filteredAndSortedApps = useMemo(() => {
    let result = [...apps];

    // Filtering
    if (filters.category) {
      result = result.filter((app) => app.category === filters.category);
    }
    if (filters.status) {
      result = result.filter((app) => app.status === filters.status);
    }
    if (filters.company) {
      result = result.filter((app) => app.company === filters.company);
    }
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      result = result.filter(
        (app) =>
          app.name.toLowerCase().includes(searchLower) ||
          app.appId.toLowerCase().includes(searchLower) ||
          app.company.toLowerCase().includes(searchLower)
      );
    }

    // Sorting
    result.sort((a, b) => {
      let comparison = 0;
      switch (sort.by) {
        case 'name':
          comparison = a.name.localeCompare(b.name);
          break;
        case 'date':
          const dateA = new Date(a.updatedAt || a.createdAt).getTime();
          const dateB = new Date(b.updatedAt || b.createdAt).getTime();
          comparison = dateA - dateB;
          break;
        case 'downloads':
          comparison = (a.downloads || 0) - (b.downloads || 0);
          break;
      }
      return sort.order === 'asc' ? comparison : -comparison;
    });

    return result;
  }, [apps, filters, sort]);

  return {
    apps: filteredAndSortedApps,
    totalCount: apps.length,
    isLoading,
    error,
    success: isSuccess,
    filters,
    setFilters,
    sort,
    setSort,
    clearFilters: () => setFilters({}),
  };
};

export const useApp = (id: string | undefined) => {
  return useQuery({
    queryKey: ['apps', id],
    queryFn: () => (id ? appService.getById(id) : null),
    enabled: !!id,
  });
};
