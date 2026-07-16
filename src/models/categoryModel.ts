import { z } from 'zod';

export const CategorySchema = z.object({
  id: z.string(),
  name: z.string(),
  slug: z.string(),
  icon: z.string(),
  active: z.boolean(),
});

export type CategoryModel = z.infer<typeof CategorySchema>;
