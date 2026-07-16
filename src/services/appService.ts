import { appRepository } from "@/repositories";
import { AppModel } from "@/models";
import { imgbbService } from "./imgbbService";
import { compressImage } from "@/utils/imageUtils";

export const appService = {
  getAll: async (): Promise<AppModel[]> => {
    return await appRepository.getAll();
  },

  getById: async (id: string): Promise<AppModel | null> => {
    return await appRepository.getById(id);
  },

  count: async (): Promise<number> => {
    return await appRepository.count();
  },

  /**
   * Generates a URL-friendly slug from an app name.
   */
  generateAppId: (name: string): string => {
    return name
      .toLowerCase()
      .trim()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '') // Remove accents
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
  },

  /**
   * Checks if an appId already exists in the database.
   */
  checkAppIdExists: async (appId: string): Promise<boolean> => {
    return await appRepository.checkAppIdExists(appId);
  },

  /**
   * Creates a new app with basic validations.
   */
  create: async (app: AppModel): Promise<void> => {
    const exists = await appRepository.checkAppIdExists(app.appId);
    if (exists) {
      throw new Error(`App with ID "${app.appId}" already exists.`);
    }

    const now = new Date().toISOString();
    const newApp = {
      ...app,
      createdAt: now,
      updatedAt: now,
    };

    await appRepository.create(newApp);
  },

  /**
   * Updates an existing app and its updatedAt timestamp.
   */
  update: async (appId: string, data: Partial<AppModel>): Promise<void> => {
    await appRepository.update(appId, {
      ...data,
      updatedAt: new Date().toISOString(),
    });
  },

  /**
   * Deletes an app.
   */
  delete: async (appId: string): Promise<void> => {
    await appRepository.delete(appId);
  },

  /**
   * Duplicates an existing app with a new appId.
   */
  duplicate: async (sourceAppId: string, newAppId: string): Promise<void> => {
    const exists = await appRepository.checkAppIdExists(newAppId);
    if (exists) {
      throw new Error(`Target App ID "${newAppId}" already exists.`);
    }

    await appRepository.duplicate(sourceAppId, newAppId);
  },

  /**
   * Compresses and uploads an image based on its type.
   */
  uploadImage: async (file: File, type: 'icon' | 'banner' | 'screenshot'): Promise<string> => {
    let processedFile = file;

    if (type === 'icon') {
      // Compress icons to 512x512
      processedFile = await compressImage(file, 512, 512, 0.9);
    } else if (type === 'banner') {
      // Compress banners to 1280x720
      processedFile = await compressImage(file, 1280, 720, 0.8);
    }

    return await imgbbService.uploadImage(processedFile);
  }
};
