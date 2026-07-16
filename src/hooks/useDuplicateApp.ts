import { useMutation, useQueryClient } from '@tanstack/react-query';
import { appService } from '@/services/appService';

interface DuplicateAppParams {
  sourceAppId: string;
  newAppId: string;
}

export const useDuplicateApp = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({ sourceAppId, newAppId }: DuplicateAppParams) =>
      appService.duplicate(sourceAppId, newAppId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['apps'] });
    },
  });

  return {
    duplicateApp: mutation.mutate,
    duplicateAppAsync: mutation.mutateAsync,
    isLoading: mutation.isPending,
    error: mutation.error,
    success: mutation.isSuccess,
    reset: mutation.reset,
  };
};
