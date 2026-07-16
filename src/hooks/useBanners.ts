import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { bannerService } from '@/services/bannerService';
import { BannerModel } from '@/models';
import { useMemo, useState } from 'react';

export interface BannerFilters {
  search?: string;
  status?: 'active' | 'inactive';
  type?: 'internal' | 'external';
}

export type BannerSortBy = 'title' | 'order' | 'date';
export type BannerSortOrder = 'asc' | 'desc';

export const useBanners = (
  initialFilters: BannerFilters = {},
  initialSort: { by: BannerSortBy; order: BannerSortOrder } = { by: 'order', order: 'asc' }
) => {
  const [filters, setFilters] = useState<BannerFilters>(initialFilters);
  const [sort, setSort] = useState<{ by: BannerSortBy; order: BannerSortOrder }>(initialSort);

  const { data: banners = [], isLoading, error, isSuccess } = useQuery({
    queryKey: ['banners'],
    queryFn: bannerService.getAll,
  });

  const filteredAndSortedBanners = useMemo(() => {
    let result = [...banners];

    if (filters.status) {
      result = result.filter((banner) => banner.status === filters.status);
    }
    if (filters.type) {
      result = result.filter((banner) => banner.type === filters.type);
    }
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      result = result.filter(
        (banner) =>
          banner.title.toLowerCase().includes(searchLower) ||
          banner.description?.toLowerCase().includes(searchLower)
      );
    }

    result.sort((a, b) => {
      let comparison = 0;
      switch (sort.by) {
        case 'title':
          comparison = a.title.localeCompare(b.title);
          break;
        case 'order':
          comparison = (a.order || 0) - (b.order || 0);
          break;
        case 'date':
          const dateA = new Date(a.updatedAt || a.createdAt || 0).getTime();
          const dateB = new Date(b.updatedAt || b.createdAt || 0).getTime();
          comparison = dateA - dateB;
          break;
      }
      return sort.order === 'asc' ? comparison : -comparison;
    });

    return result;
  }, [banners, filters, sort]);

  return {
    banners: filteredAndSortedBanners,
    totalCount: banners.length,
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

export const useBanner = (id: string | undefined) => {
  return useQuery({
    queryKey: ['banners', id],
    queryFn: () => (id ? bannerService.getById(id) : null),
    enabled: !!id,
  });
};

export const useCreateBanner = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ data, imageFile }: { data: any; imageFile?: File }) =>
      bannerService.create(data, imageFile),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['banners'] });
    },
  });
};

export const useUpdateBanner = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data, imageFile }: { id: string; data: Partial<BannerModel>; imageFile?: File }) =>
      bannerService.update(id, data, imageFile),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['banners'] });
      queryClient.invalidateQueries({ queryKey: ['banners', variables.id] });
    },
  });
};

export const useDeleteBanner = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => bannerService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['banners'] });
    },
  });
};
