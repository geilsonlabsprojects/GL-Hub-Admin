import { adminRepository } from "@/repositories";
import { AdminModel } from "@/models";

export const adminService = {
  getAll: async (): Promise<AdminModel[]> => {
    return await adminRepository.getAll();
  },

  getById: async (id: string): Promise<AdminModel | null> => {
    return await adminRepository.getById(id);
  },

  count: async (): Promise<number> => {
    return await adminRepository.count();
  }
};
