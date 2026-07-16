import { ref, get, child, set, update, remove } from "firebase/database";
import { db } from "@/firebase/config";
import { AppModel } from "@/models";

const PATH = "apps";

export const appRepository = {
  getAll: async (): Promise<AppModel[]> => {
    const dbRef = ref(db);
    const snapshot = await get(child(dbRef, PATH));
    if (snapshot.exists()) {
      const data = snapshot.val();
      return Object.values(data) as AppModel[];
    }
    return [];
  },

  getById: async (id: string): Promise<AppModel | null> => {
    const dbRef = ref(db);
    const snapshot = await get(child(dbRef, `${PATH}/${id}`));
    if (snapshot.exists()) {
      return snapshot.val() as AppModel;
    }
    return null;
  },

  create: async (app: AppModel): Promise<void> => {
    const dbRef = ref(db, `${PATH}/${app.appId}`);
    await set(dbRef, app);
  },

  update: async (appId: string, data: Partial<AppModel>): Promise<void> => {
    const dbRef = ref(db, `${PATH}/${appId}`);
    await update(dbRef, data);
  },

  delete: async (appId: string): Promise<void> => {
    const dbRef = ref(db, `${PATH}/${appId}`);
    await remove(dbRef);
  },

  checkAppIdExists: async (appId: string): Promise<boolean> => {
    const dbRef = ref(db);
    const snapshot = await get(child(dbRef, `${PATH}/${appId}`));
    return snapshot.exists();
  },

  duplicate: async (sourceAppId: string, newAppId: string): Promise<void> => {
    const sourceApp = await appRepository.getById(sourceAppId);
    if (!sourceApp) throw new Error("Source app not found");

    const newApp = {
      ...sourceApp,
      appId: newAppId,
      name: `${sourceApp.name} (Copy)`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    await appRepository.create(newApp);
  },

  count: async (): Promise<number> => {
    const list = await appRepository.getAll();
    return list.length;
  }
};
