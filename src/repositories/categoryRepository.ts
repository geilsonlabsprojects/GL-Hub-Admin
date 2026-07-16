import { ref, get, child } from "firebase/database";
import { db } from "@/firebase/config";
import { CategoryModel } from "@/models";

const PATH = "categories";

export const categoryRepository = {
  getAll: async (): Promise<CategoryModel[]> => {
    const dbRef = ref(db);
    const snapshot = await get(child(dbRef, PATH));
    if (snapshot.exists()) {
      const data = snapshot.val();
      return Object.values(data) as CategoryModel[];
    }
    return [];
  },

  getById: async (id: string): Promise<CategoryModel | null> => {
    const dbRef = ref(db);
    const snapshot = await get(child(dbRef, `${PATH}/${id}`));
    if (snapshot.exists()) {
      return snapshot.val() as CategoryModel;
    }
    return null;
  },

  count: async (): Promise<number> => {
    const list = await categoryRepository.getAll();
    return list.length;
  }
};
