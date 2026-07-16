import { logRepository } from "@/repositories";
import { LogModel } from "@/models";

export const logService = {
  getAll: async (): Promise<LogModel[]> => {
    return await logRepository.getAll();
  },

  getById: async (id: string): Promise<LogModel | null> => {
    return await logRepository.getById(id);
  },

  count: async (): Promise<number> => {
    return await logRepository.count();
  }
};
