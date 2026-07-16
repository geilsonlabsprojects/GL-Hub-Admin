import { z } from 'zod';

export type SiteStatus = 'published' | 'hidden' | 'archived' | 'maintenance';

export const SiteSchema = z.object({
  siteId: z.string(), // slug
  name: z.string(),
  url: z.string().url(),
  shortDescription: z.string(),
  description: z.string(),
  categoryId: z.string(),
  iconUrl: z.string(),
  bannerUrl: z.string(),
  screenshots: z.array(z.string()),
  status: z.enum(['published', 'hidden', 'archived', 'maintenance']),
  featured: z.boolean(),
  tags: z.array(z.string()),
  observations: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type SiteModel = z.infer<typeof SiteSchema>;
