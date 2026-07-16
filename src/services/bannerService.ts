import { bannerRepository } from "@/repositories";
import { BannerModel } from "@/models";
import { imgbbService } from "./imgbbService";

export const bannerService = {
  getAll: async (): Promise<BannerModel[]> => {
    return await bannerRepository.getAll();
  },

  getById: async (id: string): Promise<BannerModel | null> => {
    return await bannerRepository.getById(id);
  },

  create: async (data: Omit<BannerModel, 'id' | 'createdAt' | 'updatedAt'>, imageFile?: File): Promise<string> => {
    let imageUrl = data.imageUrl;
    if (imageFile) {
      imageUrl = await imgbbService.uploadImage(imageFile);
    }

    return await bannerRepository.create({
      ...data,
      imageUrl,
      createdAt: new Date(),
      updatedAt: new Date(),
    } as any);
  },

  update: async (id: string, data: Partial<BannerModel>, imageFile?: File): Promise<void> => {
    let imageUrl = data.imageUrl;
    if (imageFile) {
      imageUrl = await imgbbService.uploadImage(imageFile);
    }

    const updateData: any = {
      ...data,
      updatedAt: new Date(),
    };
    if (imageUrl) updateData.imageUrl = imageUrl;

    await bannerRepository.update(id, updateData);
  },

  delete: async (id: string): Promise<void> => {
    await bannerRepository.delete(id);
  },

  count: async (): Promise<number> => {
    return await bannerRepository.count();
  }
};
