import { useQuery } from '@tanstack/react-query';
import { userService } from '@/services/userService';

export const useUsers = () => {
  const { data: users = [], isLoading, error } = useQuery({
    queryKey: ['users'],
    queryFn: userService.getAll,
  });

  return {
    users,
    isLoading,
    error,
  };
};

export const useUser = (id: string) => {
  return useQuery({
    queryKey: ['users', id],
    queryFn: () => userService.getById(id),
    enabled: !!id,
  });
};
