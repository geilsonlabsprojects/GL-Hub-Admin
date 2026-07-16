import { ref, get, child } from "firebase/database";
import { db } from "@/firebase/config";
import { SettingsModel } from "@/models";

const PATH = "settings";

export const settingsRepository = {
  get: async (): Promise<SettingsModel | null> => {
    const dbRef = ref(db);
    const snapshot = await get(child(dbRef, PATH));
    if (snapshot.exists()) {
      return snapshot.val() as SettingsModel;
    }
    return null;
  },

  getAll: async (): Promise<SettingsModel[]> => {
    const settings = await settingsRepository.get();
    return settings ? [settings] : [];
  },

  getById: async (_id: string): Promise<SettingsModel | null> => {
    return settingsRepository.get();
  },

  count: async (): Promise<number> => {
    return 1;
  }
};
