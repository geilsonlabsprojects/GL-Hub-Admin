import { ref, get, child, set, push, update, remove } from "firebase/database";
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

  create: async (data: Omit<CategoryModel, 'id'>): Promise<string> => {
    const newRef = push(ref(db, PATH));
    const id = newRef.key as string;
    await set(newRef, { ...data, id });
    return id;
  },

  update: async (id: string, data: Partial<CategoryModel>): Promise<void> => {
    await update(ref(db, `${PATH}/${id}`), data);
  },

  delete: async (id: string): Promise<void> => {
    await remove(ref(db, `${PATH}/${id}`));
  },

  count: async (): Promise<number> => {
    const list = await categoryRepository.getAll();
    return list.length;
  }
};
