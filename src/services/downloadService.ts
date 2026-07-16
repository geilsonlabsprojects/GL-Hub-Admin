import { downloadRepository } from "@/repositories";
import { DownloadModel } from "@/models";

export const downloadService = {
  getAll: async (): Promise<DownloadModel[]> => {
    return await downloadRepository.getAll();
  },

  getById: async (id: string): Promise<DownloadModel | null> => {
    return await downloadRepository.getById(id);
  },

  count: async (): Promise<number> => {
    return await downloadRepository.count();
  }
};
