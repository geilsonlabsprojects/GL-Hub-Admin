import { useMutation, useQueryClient } from '@tanstack/react-query';
import { appService } from '@/services/appService';

export const useDeleteApp = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (appId: string) => appService.delete(appId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['apps'] });
    },
  });

  return {
    deleteApp: mutation.mutate,
    deleteAppAsync: mutation.mutateAsync,
    isLoading: mutation.isPending,
    error: mutation.error,
    success: mutation.isSuccess,
    reset: mutation.reset,
  };
};
