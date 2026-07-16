import { bannerRepository } from "@/repositories";
import { BannerModel } from "@/models";

export const bannerService = {
  getAll: async (): Promise<BannerModel[]> => {
    return await bannerRepository.getAll();
  },

  getById: async (id: string): Promise<BannerModel | null> => {
    return await bannerRepository.getById(id);
  },

  count: async (): Promise<number> => {
    return await bannerRepository.count();
  }
};
