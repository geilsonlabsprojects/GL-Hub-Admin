import { z } from 'zod';

export const CategorySchema = z.object({
  id: z.string(),
  name: z.string(),
  slug: z.string(),
  description: z.string().optional(),
  iconUrl: z.string().optional(),
  imageUrl: z.string().optional(),
  color: z.string().optional(),
  order: z.number().default(0),
  status: z.enum(['active', 'inactive']).default('active'),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export type CategoryModel = z.infer<typeof CategorySchema>;
