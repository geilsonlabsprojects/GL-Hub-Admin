import { useMutation, useQueryClient } from '@tanstack/react-query';
import { siteService } from '@/services/siteService';
import { SiteModel } from '@/models';

export const useCreateSite = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (data: Partial<SiteModel> & {
      iconFile?: File;
      bannerFile?: File;
      screenshotFiles?: File[];
    }) => siteService.createSite(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sites'] });
    },
  });

  return {
    createSite: mutation.mutate,
    createSiteAsync: mutation.mutateAsync,
    isLoading: mutation.isPending,
    error: mutation.error,
    success: mutation.isSuccess,
    reset: mutation.reset,
  };
};
