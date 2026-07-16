import { z } from 'zod';

export const AppSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  iconUrl: z.string(),
  categoryId: z.string(),
  downloadCount: z.number(),
  rating: z.number(),
  version: z.string(),
  active: z.boolean(),
  createdAt: z.string(),
});

export type AppModel = z.infer<typeof AppSchema>;
