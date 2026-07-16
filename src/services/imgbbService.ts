/**
 * Service to handle ImgBB API interactions.
 * API Key is retrieved from VITE_IMGBB_API_KEY environment variable.
 */

const IMGBB_API_KEY = import.meta.env.VITE_IMGBB_API_KEY;

export const imgbbService = {
  /**
   * Uploads an image to ImgBB and returns the display URL.
   */
  uploadImage: async (file: File): Promise<string> => {
    if (!IMGBB_API_KEY) {
      throw new Error("ImgBB API Key not found in environment variables");
    }

    const formData = new FormData();
    formData.append("image", file);

    const response = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData?.error?.message || "Failed to upload image to ImgBB");
    }

    const data = await response.json();
    return data.data.display_url;
  }
};
