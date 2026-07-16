import { siteRepository } from "@/repositories";
import { SiteModel } from "@/models";
import { imgbbService } from "./imgbbService";
import { compressImage } from "@/utils/imageUtils";

export const siteService = {
  getAll: async (): Promise<SiteModel[]> => {
    return await siteRepository.getAll();
  },

  getById: async (id: string): Promise<SiteModel | null> => {
    return await siteRepository.getById(id);
  },

  count: async (): Promise<number> => {
    return await siteRepository.count();
  },

  generateSlug: (name: string): string => {
    return name
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
  },

  createSite: async (data: Partial<SiteModel> & {
    iconFile?: File;
    bannerFile?: File;
    screenshotFiles?: File[];
  }): Promise<void> => {
    const slug = data.siteId || siteService.generateSlug(data.name || "");
    const exists = await siteRepository.checkSiteIdExists(slug);
    if (exists) {
      throw new Error(`Site with slug "${slug}" already exists`);
    }

    let iconUrl = data.iconUrl || "";
    let bannerUrl = data.bannerUrl || "";
    let screenshots = data.screenshots || [];

    // Upload icon
    if (data.iconFile) {
      const compressedIcon = await compressImage(data.iconFile, 512, 512, 0.8);
      iconUrl = await imgbbService.uploadImage(compressedIcon);
    }

    // Upload banner
    if (data.bannerFile) {
      const compressedBanner = await compressImage(data.bannerFile, 1280, 720, 0.8);
      bannerUrl = await imgbbService.uploadImage(compressedBanner);
    }

    // Upload screenshots
    if (data.screenshotFiles && data.screenshotFiles.length > 0) {
      const uploadedScreenshots = await Promise.all(
        data.screenshotFiles.map(async (file) => {
          const compressed = await compressImage(file, 1920, 1080, 0.8);
          return await imgbbService.uploadImage(compressed);
        })
      );
      screenshots = [...screenshots, ...uploadedScreenshots];
    }

    const newSite: SiteModel = {
      siteId: slug,
      name: data.name || "",
      url: data.url || "",
      shortDescription: data.shortDescription || "",
      description: data.description || "",
      categoryId: data.categoryId || "",
      iconUrl,
      bannerUrl,
      screenshots,
      status: data.status || 'hidden',
      featured: data.featured || false,
      tags: data.tags || [],
      observations: data.observations || "",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    await siteRepository.create(newSite);
  },

  updateSite: async (siteId: string, data: Partial<SiteModel> & {
    iconFile?: File;
    bannerFile?: File;
    screenshotFiles?: File[];
  }): Promise<void> => {
    const existingSite = await siteRepository.getById(siteId);
    if (!existingSite) throw new Error("Site not found");

    let iconUrl = data.iconUrl || existingSite.iconUrl;
    let bannerUrl = data.bannerUrl || existingSite.bannerUrl;
    let screenshots = data.screenshots || existingSite.screenshots;

    // Upload icon
    if (data.iconFile) {
      const compressedIcon = await compressImage(data.iconFile, 512, 512, 0.8);
      iconUrl = await imgbbService.uploadImage(compressedIcon);
    }

    // Upload banner
    if (data.bannerFile) {
      const compressedBanner = await compressImage(data.bannerFile, 1280, 720, 0.8);
      bannerUrl = await imgbbService.uploadImage(compressedBanner);
    }

    // Upload screenshots
    if (data.screenshotFiles && data.screenshotFiles.length > 0) {
      const uploadedScreenshots = await Promise.all(
        data.screenshotFiles.map(async (file) => {
          const compressed = await compressImage(file, 1920, 1080, 0.8);
          return await imgbbService.uploadImage(compressed);
        })
      );
      screenshots = [...screenshots, ...uploadedScreenshots];
    }

    const updatedData: Partial<SiteModel> = {
      ...data,
      iconUrl,
      bannerUrl,
      screenshots,
      updatedAt: new Date().toISOString(),
    };

    // Remove file properties before updating repository
    delete (updatedData as any).iconFile;
    delete (updatedData as any).bannerFile;
    delete (updatedData as any).screenshotFiles;

    await siteRepository.update(siteId, updatedData);
  },

  deleteSite: async (siteId: string): Promise<void> => {
    await siteRepository.delete(siteId);
  },

  duplicateSite: async (sourceSiteId: string, newSiteId: string): Promise<void> => {
    await siteRepository.duplicate(sourceSiteId, newSiteId);
  }
};
