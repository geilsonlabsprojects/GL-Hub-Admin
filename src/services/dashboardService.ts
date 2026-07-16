import { ref, onValue } from "firebase/database";
import { db } from "@/firebase/config";
import {
  appRepository,
  userRepository,
  siteRepository,
  newsRepository,
  categoryRepository,
  logRepository,
  downloadRepository
} from "@/repositories";

export interface DashboardStats {
  apps: number;
  users: number;
  sites: number;
  news: number;
  categories: number;
  logs: number;
  downloads: number;
}

export const dashboardService = {
  getStats: async (): Promise<DashboardStats> => {
    const [apps, users, sites, news, categories, logs, downloads] = await Promise.all([
      appRepository.count(),
      userRepository.count(),
      siteRepository.count(),
      newsRepository.count(),
      categoryRepository.count(),
      logRepository.count(),
      downloadRepository.count()
    ]);

    return {
      apps,
      users,
      sites,
      news,
      categories,
      logs,
      downloads
    };
  },

  subscribeToStats: (callback: (stats: DashboardStats) => void) => {
    const paths = ["apps", "users", "sites", "news", "categories", "logs", "downloads"];
    const stats: DashboardStats = {
      apps: 0,
      users: 0,
      sites: 0,
      news: 0,
      categories: 0,
      logs: 0,
      downloads: 0
    };

    const unsubscribes = paths.map((path) => {
      const dbRef = ref(db, path);
      return onValue(dbRef, (snapshot) => {
        const count = snapshot.exists() ? Object.keys(snapshot.val()).length : 0;
        stats[path as keyof DashboardStats] = count;
        callback({ ...stats });
      });
    });

    return () => unsubscribes.forEach((unsub) => unsub());
  }
};
