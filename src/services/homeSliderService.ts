import { homeSliderRepository } from "@/repositories";
import { HomeSlideModel } from "@/models";
import { imgbbService } from "./imgbbService";

export const homeSliderService = {
  getAll: async (): Promise<HomeSlideModel[]> => {
    return await homeSliderRepository.getAll();
  },

  getById: async (id: string): Promise<HomeSlideModel | null> => {
    return await homeSliderRepository.getById(id);
  },

  create: async (data: Omit<HomeSlideModel, 'id' | 'createdAt'>, imageFile?: File): Promise<string> => {
    let imageUrl = data.imageUrl;
    if (imageFile) {
      imageUrl = await imgbbService.uploadImage(imageFile);
    }

    return await homeSliderRepository.create({
      ...data,
      imageUrl,
      createdAt: new Date(),
    } as any);
  },

  update: async (id: string, data: Partial<HomeSlideModel>, imageFile?: File): Promise<void> => {
    let imageUrl = data.imageUrl;
    if (imageFile) {
      imageUrl = await imgbbService.uploadImage(imageFile);
    }

    const updateData: any = {
      ...data,
    };
    if (imageUrl) updateData.imageUrl = imageUrl;

    await homeSliderRepository.update(id, updateData);
  },

  delete: async (id: string): Promise<void> => {
    await homeSliderRepository.delete(id);
  },

  updateOrder: async (id: string, order: number): Promise<void> => {
    await homeSliderRepository.updateOrder(id, order);
  }
};
