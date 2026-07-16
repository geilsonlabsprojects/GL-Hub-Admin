import { settingsRepository } from "@/repositories";
import { SettingsModel } from "@/models";

export const settingsService = {
  get: async (): Promise<SettingsModel | null> => {
    return await settingsRepository.get();
  },

  getAll: async (): Promise<SettingsModel[]> => {
    return await settingsRepository.getAll();
  },

  getById: async (id: string): Promise<SettingsModel | null> => {
    return await settingsRepository.getById(id);
  },

  count: async (): Promise<number> => {
    return await settingsRepository.count();
  }
};
