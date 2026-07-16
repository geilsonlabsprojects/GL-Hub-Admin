import { ref, get, child, set, push, update, remove } from "firebase/database";
import { db } from "@/firebase/config";
import { HomeSlideModel } from "@/models";

const PATH = "homeSlides";

export const homeSliderRepository = {
  getAll: async (): Promise<HomeSlideModel[]> => {
    const dbRef = ref(db);
    const snapshot = await get(child(dbRef, PATH));
    if (snapshot.exists()) {
      const data = snapshot.val();
      return Object.values(data) as HomeSlideModel[];
    }
    return [];
  },

  getById: async (id: string): Promise<HomeSlideModel | null> => {
    const dbRef = ref(db);
    const snapshot = await get(child(dbRef, `${PATH}/${id}`));
    if (snapshot.exists()) {
      return snapshot.val() as HomeSlideModel;
    }
    return null;
  },

  create: async (data: Omit<HomeSlideModel, 'id'>): Promise<string> => {
    const newRef = push(ref(db, PATH));
    const id = newRef.key as string;
    await set(newRef, { ...data, id });
    return id;
  },

  update: async (id: string, data: Partial<HomeSlideModel>): Promise<void> => {
    await update(ref(db, `${PATH}/${id}`), data);
  },

  delete: async (id: string): Promise<void> => {
    await remove(ref(db, `${PATH}/${id}`));
  },

  updateOrder: async (id: string, order: number): Promise<void> => {
    await update(ref(db, `${PATH}/${id}`), { order });
  }
};
