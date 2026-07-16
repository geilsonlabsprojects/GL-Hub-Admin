import { z } from 'zod';

export const SiteSchema = z.object({
  id: z.string(),
  name: z.string(),
  url: z.string().url(),
  description: z.string(),
  iconUrl: z.string(),
  active: z.boolean(),
  createdAt: z.string(),
});

export type SiteModel = z.infer<typeof SiteSchema>;
