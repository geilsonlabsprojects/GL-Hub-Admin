/**
 * Compresses an image file using the Canvas API.
 *
 * @param file - The image file to compress.
 * @param maxWidth - The maximum width of the compressed image.
 * @param maxHeight - The maximum height of the compressed image.
 * @param quality - The quality of the compression (0 to 1).
 * @returns A promise that resolves to the compressed image file.
 */
export const compressImage = (
  file: File,
  maxWidth: number,
  maxHeight: number,
  quality: number
): Promise<File> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;

        // Calculate aspect ratio and scale within bounds
        let ratio = 1;
        if (width > maxWidth) {
          ratio = maxWidth / width;
        }
        if (height * ratio > maxHeight) {
          ratio = maxHeight / height;
        }

        width *= ratio;
        height *= ratio;

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('Failed to get canvas context'));
          return;
        }

        ctx.drawImage(img, 0, 0, width, height);

        canvas.toBlob(
          (blob) => {
            if (blob) {
              const compressedFile = new File([blob], file.name, {
                type: 'image/jpeg',
                lastModified: Date.now(),
              });
              resolve(compressedFile);
            } else {
              reject(new Error('Canvas to Blob failed'));
            }
          },
          'image/jpeg',
          quality
        );
      };
      img.onerror = (error) => reject(error);
    };
    reader.onerror = (error) => reject(error);
  });
};
