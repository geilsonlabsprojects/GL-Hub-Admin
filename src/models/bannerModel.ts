import { z } from 'zod';

export const BannerSchema = z.object({
  id: z.string(),
  title: z.string(),
  imageUrl: z.string(),
  linkUrl: z.string(),
  order: z.number(),
  active: z.boolean(),
});

export type BannerModel = z.infer<typeof BannerSchema>;
