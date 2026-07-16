import { ref, get, child, set, push, update, remove } from "firebase/database";
import { db } from "@/firebase/config";
import { FeaturedModel } from "@/models";

const PATH = "featured";

export const featuredRepository = {
  getAll: async (): Promise<FeaturedModel[]> => {
    const dbRef = ref(db);
    const snapshot = await get(child(dbRef, PATH));
    if (snapshot.exists()) {
      const data = snapshot.val();
      return Object.values(data) as FeaturedModel[];
    }
    return [];
  },

  getById: async (id: string): Promise<FeaturedModel | null> => {
    const dbRef = ref(db);
    const snapshot = await get(child(dbRef, `${PATH}/${id}`));
    if (snapshot.exists()) {
      return snapshot.val() as FeaturedModel;
    }
    return null;
  },

  create: async (data: Omit<FeaturedModel, 'id'>): Promise<string> => {
    const newRef = push(ref(db, PATH));
    const id = newRef.key as string;
    await set(newRef, { ...data, id });
    return id;
  },

  update: async (id: string, data: Partial<FeaturedModel>): Promise<void> => {
    await update(ref(db, `${PATH}/${id}`), data);
  },

  delete: async (id: string): Promise<void> => {
    await remove(ref(db, `${PATH}/${id}`));
  },

  updatePriority: async (id: string, priority: number): Promise<void> => {
    await update(ref(db, `${PATH}/${id}`), { priority });
  }
};
