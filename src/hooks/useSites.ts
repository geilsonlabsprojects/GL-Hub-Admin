import { useQuery } from '@tanstack/react-query';
import { siteService } from '@/services/siteService';

export const useSites = () => {
  const { data: sites = [], isLoading, error } = useQuery({
    queryKey: ['sites'],
    queryFn: siteService.getAll,
  });

  return {
    sites,
    isLoading,
    error,
  };
};

export const useSite = (id: string) => {
  return useQuery({
    queryKey: ['sites', id],
    queryFn: () => siteService.getById(id),
    enabled: !!id,
  });
};
