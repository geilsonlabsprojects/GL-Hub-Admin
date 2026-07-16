import { featuredRepository } from "@/repositories";
import { FeaturedModel } from "@/models";

export const featuredService = {
  getAll: async (): Promise<FeaturedModel[]> => {
    return await featuredRepository.getAll();
  },

  getById: async (id: string): Promise<FeaturedModel | null> => {
    return await featuredRepository.getById(id);
  },

  create: async (data: Omit<FeaturedModel, 'id' | 'createdAt'>): Promise<string> => {
    return await featuredRepository.create({
      ...data,
      createdAt: new Date(),
    } as any);
  },

  update: async (id: string, data: Partial<FeaturedModel>): Promise<void> => {
    await featuredRepository.update(id, data);
  },

  delete: async (id: string): Promise<void> => {
    await featuredRepository.delete(id);
  },

  updatePriority: async (id: string, priority: number): Promise<void> => {
    await featuredRepository.updatePriority(id, priority);
  }
};
