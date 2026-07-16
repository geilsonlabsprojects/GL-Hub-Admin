import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { homeSliderService } from '@/services/homeSliderService';
import { HomeSlideModel } from '@/models';
import { useMemo, useState } from 'react';

export interface HomeSlideFilters {
  search?: string;
  status?: 'active' | 'inactive';
  type?: 'app' | 'site' | 'category' | 'external';
}

export type HomeSlideSortBy = 'title' | 'order' | 'date';
export type HomeSlideSortOrder = 'asc' | 'desc';

export const useHomeSlider = (
  initialFilters: HomeSlideFilters = {},
  initialSort: { by: HomeSlideSortBy; order: HomeSlideSortOrder } = { by: 'order', order: 'asc' }
) => {
  const [filters, setFilters] = useState<HomeSlideFilters>(initialFilters);
  const [sort, setSort] = useState<{ by: HomeSlideSortBy; order: HomeSlideSortOrder }>(initialSort);

  const { data: slides = [], isLoading, error, isSuccess } = useQuery({
    queryKey: ['homeSlider'],
    queryFn: homeSliderService.getAll,
  });

  const filteredAndSortedSlides = useMemo(() => {
    let result = [...slides];

    if (filters.status) {
      result = result.filter((slide) => slide.status === filters.status);
    }
    if (filters.type) {
      result = result.filter((slide) => slide.type === filters.type);
    }
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      result = result.filter(
        (slide) =>
          slide.title.toLowerCase().includes(searchLower) ||
          slide.description?.toLowerCase().includes(searchLower)
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
          const dateA = new Date(a.createdAt || 0).getTime();
          const dateB = new Date(b.createdAt || 0).getTime();
          comparison = dateA - dateB;
          break;
      }
      return sort.order === 'asc' ? comparison : -comparison;
    });

    return result;
  }, [slides, filters, sort]);

  return {
    slides: filteredAndSortedSlides,
    totalCount: slides.length,
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

export const useHomeSlide = (id: string | undefined) => {
  return useQuery({
    queryKey: ['homeSlider', id],
    queryFn: () => (id ? homeSliderService.getById(id) : null),
    enabled: !!id,
  });
};

export const useCreateHomeSlide = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ data, imageFile }: { data: any; imageFile?: File }) =>
      homeSliderService.create(data, imageFile),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['homeSlider'] });
    },
  });
};

export const useUpdateHomeSlide = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data, imageFile }: { id: string; data: Partial<HomeSlideModel>; imageFile?: File }) =>
      homeSliderService.update(id, data, imageFile),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['homeSlider'] });
      queryClient.invalidateQueries({ queryKey: ['homeSlider', variables.id] });
    },
  });
};

export const useDeleteHomeSlide = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => homeSliderService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['homeSlider'] });
    },
  });
};

export const useUpdateHomeSlideOrder = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, order }: { id: string; order: number }) =>
      homeSliderService.updateOrder(id, order),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['homeSlider'] });
    },
  });
};
