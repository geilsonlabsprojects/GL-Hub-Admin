import { userRepository } from "@/repositories";
import { UserModel } from "@/models";

export const userService = {
  getAll: async (): Promise<UserModel[]> => {
    return await userRepository.getAll();
  },

  getById: async (id: string): Promise<UserModel | null> => {
    return await userRepository.getById(id);
  },

  count: async (): Promise<number> => {
    return await userRepository.count();
  }
};
