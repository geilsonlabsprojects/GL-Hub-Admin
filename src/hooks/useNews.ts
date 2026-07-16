import { useQuery } from '@tanstack/react-query';
import { newsService } from '@/services/newsService';

export const useNews = () => {
  const { data: news = [], isLoading, error } = useQuery({
    queryKey: ['news'],
    queryFn: newsService.getAll,
  });

  return {
    news,
    isLoading,
    error,
  };
};

export const useNewsItem = (id: string) => {
  return useQuery({
    queryKey: ['news', id],
    queryFn: () => newsService.getById(id),
    enabled: !!id,
  });
};
