import { versionRepository } from "@/repositories";
import { VersionModel } from "@/models";

export const versionService = {
  getAll: async (): Promise<VersionModel[]> => {
    return await versionRepository.getAll();
  },

  getById: async (id: string): Promise<VersionModel | null> => {
    return await versionRepository.getById(id);
  },

  count: async (): Promise<number> => {
    return await versionRepository.count();
  }
};
