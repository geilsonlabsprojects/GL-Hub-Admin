import { useMutation, useQueryClient } from '@tanstack/react-query';
import { appService } from '@/services/appService';
import { AppModel } from '@/models';

interface UpdateAppParams {
  appId: string;
  data: Partial<AppModel>;
}

export const useUpdateApp = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({ appId, data }: UpdateAppParams) => appService.update(appId, data),
    onSuccess: (_, { appId }) => {
      queryClient.invalidateQueries({ queryKey: ['apps'] });
      queryClient.invalidateQueries({ queryKey: ['apps', appId] });
    },
  });

  return {
    updateApp: mutation.mutate,
    updateAppAsync: mutation.mutateAsync,
    isLoading: mutation.isPending,
    error: mutation.error,
    success: mutation.isSuccess,
    reset: mutation.reset,
  };
};
