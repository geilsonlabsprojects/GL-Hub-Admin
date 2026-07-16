import { categoryRepository } from "@/repositories";
import { CategoryModel } from "@/models";

export const categoryService = {
  getAll: async (): Promise<CategoryModel[]> => {
    return await categoryRepository.getAll();
  },

  getById: async (id: string): Promise<CategoryModel | null> => {
    return await categoryRepository.getById(id);
  },

  count: async (): Promise<number> => {
    return await categoryRepository.count();
  }
};
