import { ref, get, child } from "firebase/database";
import { db } from "@/firebase/config";
import { UserModel } from "@/models";

const PATH = "users";

export const userRepository = {
  getAll: async (): Promise<UserModel[]> => {
    const dbRef = ref(db);
    const snapshot = await get(child(dbRef, PATH));
    if (snapshot.exists()) {
      const data = snapshot.val();
      return Object.values(data) as UserModel[];
    }
    return [];
  },

  getById: async (id: string): Promise<UserModel | null> => {
    const dbRef = ref(db);
    const snapshot = await get(child(dbRef, `${PATH}/${id}`));
    if (snapshot.exists()) {
      return snapshot.val() as UserModel;
    }
    return null;
  },

  count: async (): Promise<number> => {
    const list = await userRepository.getAll();
    return list.length;
  }
};
