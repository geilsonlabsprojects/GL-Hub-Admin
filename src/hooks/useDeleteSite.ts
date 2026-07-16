import { useMutation, useQueryClient } from '@tanstack/react-query';
import { siteService } from '@/services/siteService';

export const useDeleteSite = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (siteId: string) => siteService.deleteSite(siteId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sites'] });
    },
  });

  return {
    deleteSite: mutation.mutate,
    deleteSiteAsync: mutation.mutateAsync,
    isLoading: mutation.isPending,
    error: mutation.error,
    success: mutation.isSuccess,
    reset: mutation.reset,
  };
};
