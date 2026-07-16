import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { appService } from '@/services/appService';
import { AppModel } from '@/models';

export const useApps = () => {
  const queryClient = useQueryClient();

  const { data: apps = [], isLoading, error } = useQuery({
    queryKey: ['apps'],
    queryFn: appService.getAll,
  });

  return {
    apps,
    isLoading,
    error,
  };
};

export const useApp = (id: string) => {
  return useQuery({
    queryKey: ['apps', id],
    queryFn: () => appService.getById(id),
    enabled: !!id,
  });
};
