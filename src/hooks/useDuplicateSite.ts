import { useMutation, useQueryClient } from '@tanstack/react-query';
import { siteService } from '@/services/siteService';

export const useDuplicateSite = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({ sourceSiteId, newSiteId }: { sourceSiteId: string; newSiteId: string }) =>
      siteService.duplicateSite(sourceSiteId, newSiteId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sites'] });
    },
  });

  return {
    duplicateSite: mutation.mutate,
    duplicateSiteAsync: mutation.mutateAsync,
    isLoading: mutation.isPending,
    error: mutation.error,
    success: mutation.isSuccess,
    reset: mutation.reset,
  };
};
