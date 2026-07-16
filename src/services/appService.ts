import { appRepository } from "@/repositories";
import { AppModel } from "@/models";

export const appService = {
  getAll: async (): Promise<AppModel[]> => {
    return await appRepository.getAll();
  },

  getById: async (id: string): Promise<AppModel | null> => {
    return await appRepository.getById(id);
  },

  count: async (): Promise<number> => {
    return await appRepository.count();
  }
};
