import { z } from 'zod';

export const HomeSlideSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string().optional(),
  imageUrl: z.string(),
  linkUrl: z.string().optional(),
  type: z.enum(['app', 'site', 'category', 'external']),
  status: z.enum(['active', 'inactive']).default('active'),
  order: z.number().default(0),
  createdAt: z.date().optional(),
});

export type HomeSlideModel = z.infer<typeof HomeSlideSchema>;
