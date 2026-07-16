import { z } from 'zod';

export const FeaturedSchema = z.object({
  id: z.string(),
  itemId: z.string(),
  type: z.enum(['app', 'site', 'category']),
  priority: z.number().default(0),
  active: z.boolean().default(true),
  createdAt: z.date().optional(),
});

export type FeaturedModel = z.infer<typeof FeaturedSchema>;
