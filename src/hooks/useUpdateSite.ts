import { useMutation, useQueryClient } from '@tanstack/react-query';
import { siteService } from '@/services/siteService';
import { SiteModel } from '@/models';

export const useUpdateSite = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({ siteId, data }: {
      siteId: string;
      data: Partial<SiteModel> & {
        iconFile?: File;
        bannerFile?: File;
        screenshotFiles?: File[];
      };
    }) => siteService.updateSite(siteId, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['sites'] });
      queryClient.invalidateQueries({ queryKey: ['sites', variables.siteId] });
    },
  });

  return {
    updateSite: mutation.mutate,
    updateSiteAsync: mutation.mutateAsync,
    isLoading: mutation.isPending,
    error: mutation.error,
    success: mutation.isSuccess,
    reset: mutation.reset,
  };
};
