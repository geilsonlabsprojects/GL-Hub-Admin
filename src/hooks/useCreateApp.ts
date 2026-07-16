import { useMutation, useQueryClient } from '@tanstack/react-query';
import { appService } from '@/services/appService';
import { AppModel } from '@/models';

export const useCreateApp = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (newApp: AppModel) => appService.create(newApp),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['apps'] });
    },
  });

  return {
    createApp: mutation.mutate,
    createAppAsync: mutation.mutateAsync,
    isLoading: mutation.isPending,
    error: mutation.error,
    success: mutation.isSuccess,
    reset: mutation.reset,
  };
};
