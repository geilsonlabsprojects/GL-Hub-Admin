import { ref, get, child } from "firebase/database";
import { db } from "@/firebase/config";
import { DownloadModel } from "@/models";

const PATH = "downloads";

export const downloadRepository = {
  getAll: async (): Promise<DownloadModel[]> => {
    const dbRef = ref(db);
    const snapshot = await get(child(dbRef, PATH));
    if (snapshot.exists()) {
      const data = snapshot.val();
      return Object.values(data) as DownloadModel[];
    }
    return [];
  },

  getById: async (id: string): Promise<DownloadModel | null> => {
    const dbRef = ref(db);
    const snapshot = await get(child(dbRef, `${PATH}/${id}`));
    if (snapshot.exists()) {
      return snapshot.val() as DownloadModel;
    }
    return null;
  },

  count: async (): Promise<number> => {
    const list = await downloadRepository.getAll();
    return list.length;
  }
};
