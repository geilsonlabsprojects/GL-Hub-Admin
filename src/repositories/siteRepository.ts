import { ref, get, child, set, update, remove } from "firebase/database";
import { db } from "@/firebase/config";
import { SiteModel } from "@/models";

const PATH = "sites";

export const siteRepository = {
  getAll: async (): Promise<SiteModel[]> => {
    const dbRef = ref(db);
    const snapshot = await get(child(dbRef, PATH));
    if (snapshot.exists()) {
      const data = snapshot.val();
      return Object.values(data) as SiteModel[];
    }
    return [];
  },

  getById: async (siteId: string): Promise<SiteModel | null> => {
    const dbRef = ref(db);
    const snapshot = await get(child(dbRef, `${PATH}/${siteId}`));
    if (snapshot.exists()) {
      return snapshot.val() as SiteModel;
    }
    return null;
  },

  create: async (site: SiteModel): Promise<void> => {
    await set(ref(db, `${PATH}/${site.siteId}`), site);
  },

  update: async (siteId: string, data: Partial<SiteModel>): Promise<void> => {
    await update(ref(db, `${PATH}/${siteId}`), data);
  },

  delete: async (siteId: string): Promise<void> => {
    await remove(ref(db, `${PATH}/${siteId}`));
  },

  checkSiteIdExists: async (siteId: string): Promise<boolean> => {
    const dbRef = ref(db);
    const snapshot = await get(child(dbRef, `${PATH}/${siteId}`));
    return snapshot.exists();
  },

  duplicate: async (sourceSiteId: string, newSiteId: string): Promise<void> => {
    const sourceSite = await siteRepository.getById(sourceSiteId);
    if (!sourceSite) throw new Error("Source site not found");

    const duplicatedSite: SiteModel = {
      ...sourceSite,
      siteId: newSiteId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    await siteRepository.create(duplicatedSite);
  },

  count: async (): Promise<number> => {
    const list = await siteRepository.getAll();
    return list.length;
  }
};
