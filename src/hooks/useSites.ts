import { useQuery } from '@tanstack/react-query';
import { siteService } from '@/services/siteService';
import { SiteModel, SiteStatus } from '@/models';
import { useMemo, useState } from 'react';

export interface SiteFilters {
  category?: string;
  status?: SiteStatus;
  search?: string;
}

export type SiteSortBy = 'name' | 'date';
export type SiteSortOrder = 'asc' | 'desc';

export const useSites = (
  initialFilters: SiteFilters = {},
  initialSort: { by: SiteSortBy; order: SiteSortOrder } = { by: 'date', order: 'desc' }
) => {
  const [filters, setFilters] = useState<SiteFilters>(initialFilters);
  const [sort, setSort] = useState<{ by: SiteSortBy; order: SiteSortOrder }>(initialSort);

  const { data: sites = [], isLoading, error, isSuccess } = useQuery({
    queryKey: ['sites'],
    queryFn: siteService.getAll,
  });

  const filteredAndSortedSites = useMemo(() => {
    let result = [...sites];

    // Filtering
    if (filters.category) {
      result = result.filter((site) => site.categoryId === filters.category);
    }
    if (filters.status) {
      result = result.filter((site) => site.status === filters.status);
    }
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      result = result.filter(
        (site) =>
          site.name.toLowerCase().includes(searchLower) ||
          site.siteId.toLowerCase().includes(searchLower) ||
          site.url.toLowerCase().includes(searchLower)
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
      }
      return sort.order === 'asc' ? comparison : -comparison;
    });

    return result;
  }, [sites, filters, sort]);

  return {
    sites: filteredAndSortedSites,
    totalCount: sites.length,
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

export const useSite = (id: string | undefined) => {
  return useQuery({
    queryKey: ['sites', id],
    queryFn: () => (id ? siteService.getById(id) : null),
    enabled: !!id,
  });
};
