/**
 * Service to handle ImgBB API interactions.
 * API Key is retrieved from VITE_IMGBB_API_KEY environment variable.
 */

const IMGBB_API_KEY = import.meta.env.VITE_IMGBB_API_KEY;

export const imgbbService = {
  /**
   * Placeholder for image upload.
   * To be implemented in future phases.
   */
  uploadImage: async (file: File): Promise<string> => {
    console.log("ImgBB upload not implemented yet", file);
    console.log("API Key loaded:", !!IMGBB_API_KEY);
    throw new Error("Upload not implemented");
  }
};
