import { z } from 'zod';

export const BannerSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string().optional(),
  imageUrl: z.string(),
  linkUrl: z.string().optional(),
  type: z.enum(['internal', 'external']).default('internal'),
  status: z.enum(['active', 'inactive']).default('active'),
  order: z.number().default(0),
  buttonLabel: z.string().optional(),
  color: z.string().optional(),
  startDate: z.date().optional(),
  endDate: z.date().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export type BannerModel = z.infer<typeof BannerSchema>;
