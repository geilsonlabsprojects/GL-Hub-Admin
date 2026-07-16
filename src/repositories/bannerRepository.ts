import { ref, get, child } from "firebase/database";
import { db } from "@/firebase/config";
import { BannerModel } from "@/models";

const PATH = "banners";

export const bannerRepository = {
  getAll: async (): Promise<BannerModel[]> => {
    const dbRef = ref(db);
    const snapshot = await get(child(dbRef, PATH));
    if (snapshot.exists()) {
      const data = snapshot.val();
      return Object.values(data) as BannerModel[];
    }
    return [];
  },

  getById: async (id: string): Promise<BannerModel | null> => {
    const dbRef = ref(db);
    const snapshot = await get(child(dbRef, `${PATH}/${id}`));
    if (snapshot.exists()) {
      return snapshot.val() as BannerModel;
    }
    return null;
  },

  count: async (): Promise<number> => {
    const list = await bannerRepository.getAll();
    return list.length;
  }
};
