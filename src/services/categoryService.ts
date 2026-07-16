import { categoryRepository } from "@/repositories";
import { CategoryModel } from "@/models";
import { imgbbService } from "./imgbbService";

export const categoryService = {
  getAll: async (): Promise<CategoryModel[]> => {
    return await categoryRepository.getAll();
  },

  getById: async (id: string): Promise<CategoryModel | null> => {
    return await categoryRepository.getById(id);
  },

  create: async (data: Omit<CategoryModel, 'id' | 'createdAt' | 'updatedAt'>, iconFile?: File, imageFile?: File): Promise<string> => {
    let iconUrl = data.iconUrl;
    let imageUrl = data.imageUrl;

    if (iconFile) {
      iconUrl = await imgbbService.uploadImage(iconFile);
    }
    if (imageFile) {
      imageUrl = await imgbbService.uploadImage(imageFile);
    }

    const slug = data.slug || data.name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');

    return await categoryRepository.create({
      ...data,
      iconUrl,
      imageUrl,
      slug,
      createdAt: new Date(),
      updatedAt: new Date(),
    } as any);
  },

  update: async (id: string, data: Partial<CategoryModel>, iconFile?: File, imageFile?: File): Promise<void> => {
    let iconUrl = data.iconUrl;
    let imageUrl = data.imageUrl;

    if (iconFile) {
      iconUrl = await imgbbService.uploadImage(iconFile);
    }
    if (imageFile) {
      imageUrl = await imgbbService.uploadImage(imageFile);
    }

    const updateData: any = {
      ...data,
      updatedAt: new Date(),
    };

    if (iconUrl) updateData.iconUrl = iconUrl;
    if (imageUrl) updateData.imageUrl = imageUrl;
    if (data.name && !data.slug) {
      updateData.slug = data.name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
    }

    await categoryRepository.update(id, updateData);
  },

  delete: async (id: string): Promise<void> => {
    await categoryRepository.delete(id);
  },

  count: async (): Promise<number> => {
    return await categoryRepository.count();
  }
};
