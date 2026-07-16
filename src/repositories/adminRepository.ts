import { ref, get } from "firebase/database";
import { db } from "@/firebase/config";
import { AdminUser } from "@/types/admin";

export const adminRepository = {
  getAdminByUid: async (uid: string): Promise<AdminUser | null> => {
    const adminRef = ref(db, `admins/${uid}`);
    const snapshot = await get(adminRef);
    if (snapshot.exists()) {
      return snapshot.val() as AdminUser;
    }
    return null;
  }
};
