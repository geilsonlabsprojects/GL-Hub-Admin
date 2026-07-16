import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { categoryService } from '@/services/categoryService';
import { CategoryModel } from '@/models';
import { useMemo, useState } from 'react';

export interface CategoryFilters {
  search?: string;
  status?: 'active' | 'inactive';
}

export type CategorySortBy = 'name' | 'order' | 'date';
export type CategorySortOrder = 'asc' | 'desc';

export const useCategories = (
  initialFilters: CategoryFilters = {},
  initialSort: { by: CategorySortBy; order: CategorySortOrder } = { by: 'order', order: 'asc' }
) => {
  const [filters, setFilters] = useState<CategoryFilters>(initialFilters);
  const [sort, setSort] = useState<{ by: CategorySortBy; order: CategorySortOrder }>(initialSort);

  const { data: categories = [], isLoading, error, isSuccess } = useQuery({
    queryKey: ['categories'],
    queryFn: categoryService.getAll,
  });

  const filteredAndSortedCategories = useMemo(() => {
    let result = [...categories];

    if (filters.status) {
      result = result.filter((cat) => cat.status === filters.status);
    }
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      result = result.filter(
        (cat) =>
          cat.name.toLowerCase().includes(searchLower) ||
          cat.slug.toLowerCase().includes(searchLower)
      );
    }

    result.sort((a, b) => {
      let comparison = 0;
      switch (sort.by) {
        case 'name':
          comparison = a.name.localeCompare(b.name);
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
  }, [categories, filters, sort]);

  return {
    categories: filteredAndSortedCategories,
    totalCount: categories.length,
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

export const useCategory = (id: string | undefined) => {
  return useQuery({
    queryKey: ['categories', id],
    queryFn: () => (id ? categoryService.getById(id) : null),
    enabled: !!id,
  });
};

export const useCreateCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ data, iconFile, imageFile }: { data: any; iconFile?: File; imageFile?: File }) =>
      categoryService.create(data, iconFile, imageFile),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
    },
  });
};

export const useUpdateCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data, iconFile, imageFile }: { id: string; data: Partial<CategoryModel>; iconFile?: File; imageFile?: File }) =>
      categoryService.update(id, data, iconFile, imageFile),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      queryClient.invalidateQueries({ queryKey: ['categories', variables.id] });
    },
  });
};

export const useDeleteCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => categoryService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
    },
  });
};
