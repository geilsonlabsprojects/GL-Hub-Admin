import { siteRepository } from "@/repositories";
import { SiteModel } from "@/models";

export const siteService = {
  getAll: async (): Promise<SiteModel[]> => {
    return await siteRepository.getAll();
  },

  getById: async (id: string): Promise<SiteModel | null> => {
    return await siteRepository.getById(id);
  },

  count: async (): Promise<number> => {
    return await siteRepository.count();
  }
};
