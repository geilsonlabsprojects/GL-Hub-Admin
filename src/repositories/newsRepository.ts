import { ref, get, child } from "firebase/database";
import { db } from "@/firebase/config";
import { NewsModel } from "@/models";

const PATH = "news";

export const newsRepository = {
  getAll: async (): Promise<NewsModel[]> => {
    const dbRef = ref(db);
    const snapshot = await get(child(dbRef, PATH));
    if (snapshot.exists()) {
      const data = snapshot.val();
      return Object.values(data) as NewsModel[];
    }
    return [];
  },

  getById: async (id: string): Promise<NewsModel | null> => {
    const dbRef = ref(db);
    const snapshot = await get(child(dbRef, `${PATH}/${id}`));
    if (snapshot.exists()) {
      return snapshot.val() as NewsModel;
    }
    return null;
  },

  count: async (): Promise<number> => {
    const list = await newsRepository.getAll();
    return list.length;
  }
};
