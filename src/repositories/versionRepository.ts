import { ref, get, child } from "firebase/database";
import { db } from "@/firebase/config";
import { VersionModel } from "@/models";

const PATH = "versions";

export const versionRepository = {
  getAll: async (): Promise<VersionModel[]> => {
    const dbRef = ref(db);
    const snapshot = await get(child(dbRef, PATH));
    if (snapshot.exists()) {
      const data = snapshot.val();
      return Object.values(data) as VersionModel[];
    }
    return [];
  },

  getById: async (id: string): Promise<VersionModel | null> => {
    const dbRef = ref(db);
    const snapshot = await get(child(dbRef, `${PATH}/${id}`));
    if (snapshot.exists()) {
      return snapshot.val() as VersionModel;
    }
    return null;
  },

  count: async (): Promise<number> => {
    const list = await versionRepository.getAll();
    return list.length;
  }
};
