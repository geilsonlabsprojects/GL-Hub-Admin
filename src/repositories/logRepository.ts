import { ref, get, child } from "firebase/database";
import { db } from "@/firebase/config";
import { LogModel } from "@/models";

const PATH = "logs";

export const logRepository = {
  getAll: async (): Promise<LogModel[]> => {
    const dbRef = ref(db);
    const snapshot = await get(child(dbRef, PATH));
    if (snapshot.exists()) {
      const data = snapshot.val();
      return Object.values(data) as LogModel[];
    }
    return [];
  },

  getById: async (id: string): Promise<LogModel | null> => {
    const dbRef = ref(db);
    const snapshot = await get(child(dbRef, `${PATH}/${id}`));
    if (snapshot.exists()) {
      return snapshot.val() as LogModel;
    }
    return null;
  },

  count: async (): Promise<number> => {
    const list = await logRepository.getAll();
    return list.length;
  }
};
