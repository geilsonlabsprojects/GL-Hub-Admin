import { z } from 'zod';

export type AppStatus = 'published' | 'hidden' | 'beta' | 'archived' | 'maintenance';

export const AppSchema = z.object({
  appId: z.string(),
  name: z.string(),
  shortDescription: z.string(),
  description: z.string(),
  company: z.string(),
  category: z.string(),
  icon: z.string(),
  banner: z.string(),
  screenshots: z.array(z.string()),
  versionName: z.string(),
  versionCode: z.number(),
  apkUrl: z.string(),
  githubRelease: z.string().optional(),
  website: z.string().optional(),
  permissions: z.string().optional(),
  size: z.string(),
  minSdk: z.string(),
  targetSdk: z.string(),
  architecture: z.string(),
  status: z.enum(['published', 'hidden', 'beta', 'archived', 'maintenance']),
  beta: z.boolean(),
  featured: z.boolean(),
  tags: z.array(z.string()),
  downloads: z.number(),
  observations: z.string().optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type AppModel = z.infer<typeof AppSchema>;
