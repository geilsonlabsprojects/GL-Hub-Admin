import { ref, get, child } from "firebase/database";
import { db } from "@/firebase/config";
import { SiteModel } from "@/models";

const PATH = "sites";

export const siteRepository = {
  getAll: async (): Promise<SiteModel[]> => {
    const dbRef = ref(db);
    const snapshot = await get(child(dbRef, PATH));
    if (snapshot.exists()) {
      const data = snapshot.val();
      return Object.values(data) as SiteModel[];
    }
    return [];
  },

  getById: async (id: string): Promise<SiteModel | null> => {
    const dbRef = ref(db);
    const snapshot = await get(child(dbRef, `${PATH}/${id}`));
    if (snapshot.exists()) {
      return snapshot.val() as SiteModel;
    }
    return null;
  },

  count: async (): Promise<number> => {
    const list = await siteRepository.getAll();
    return list.length;
  }
};
