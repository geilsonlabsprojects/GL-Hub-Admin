import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { featuredService } from '@/services/featuredService';
import { FeaturedModel } from '@/models';
import { useMemo, useState } from 'react';

export interface FeaturedFilters {
  type?: 'app' | 'site' | 'category';
  active?: boolean;
}

export type FeaturedSortBy = 'priority' | 'date';
export type FeaturedSortOrder = 'asc' | 'desc';

export const useFeatured = (
  initialFilters: FeaturedFilters = {},
  initialSort: { by: FeaturedSortBy; order: FeaturedSortOrder } = { by: 'priority', order: 'desc' }
) => {
  const [filters, setFilters] = useState<FeaturedFilters>(initialFilters);
  const [sort, setSort] = useState<{ by: FeaturedSortBy; order: FeaturedSortOrder }>(initialSort);

  const { data: featuredItems = [], isLoading, error, isSuccess } = useQuery({
    queryKey: ['featured'],
    queryFn: featuredService.getAll,
  });

  const filteredAndSortedFeatured = useMemo(() => {
    let result = [...featuredItems];

    if (filters.type) {
      result = result.filter((item) => item.type === filters.type);
    }
    if (filters.active !== undefined) {
      result = result.filter((item) => item.active === filters.active);
    }

    result.sort((a, b) => {
      let comparison = 0;
      switch (sort.by) {
        case 'priority':
          comparison = (a.priority || 0) - (b.priority || 0);
          break;
        case 'date':
          const dateA = new Date(a.createdAt || 0).getTime();
          const dateB = new Date(b.createdAt || 0).getTime();
          comparison = dateA - dateB;
          break;
      }
      return sort.order === 'asc' ? comparison : -comparison;
    });

    return result;
  }, [featuredItems, filters, sort]);

  return {
    featuredItems: filteredAndSortedFeatured,
    totalCount: featuredItems.length,
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

export const useFeaturedItem = (id: string | undefined) => {
  return useQuery({
    queryKey: ['featured', id],
    queryFn: () => (id ? featuredService.getById(id) : null),
    enabled: !!id,
  });
};

export const useCreateFeatured = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: any) => featuredService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['featured'] });
    },
  });
};

export const useUpdateFeatured = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<FeaturedModel> }) =>
      featuredService.update(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['featured'] });
      queryClient.invalidateQueries({ queryKey: ['featured', variables.id] });
    },
  });
};

export const useDeleteFeatured = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => featuredService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['featured'] });
    },
  });
};

export const useUpdateFeaturedPriority = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, priority }: { id: string; priority: number }) =>
      featuredService.updatePriority(id, priority),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['featured'] });
    },
  });
};
