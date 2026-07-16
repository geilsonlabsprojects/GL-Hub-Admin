import { ref, get, child } from "firebase/database";
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

  count: async (): Promise<number> => {
    const list = await appRepository.getAll();
    return list.length;
  }
};
