import { newsRepository } from "@/repositories";
import { NewsModel } from "@/models";

export const newsService = {
  getAll: async (): Promise<NewsModel[]> => {
    return await newsRepository.getAll();
  },

  getById: async (id: string): Promise<NewsModel | null> => {
    return await newsRepository.getById(id);
  },

  count: async (): Promise<number> => {
    return await newsRepository.count();
  }
};
