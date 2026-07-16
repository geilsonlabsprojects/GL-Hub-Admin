import { z } from 'zod';

export const DownloadSchema = z.object({
  id: z.string(),
  appId: z.string(),
  userId: z.string(),
  platform: z.string(),
  timestamp: z.string(),
});

export type DownloadModel = z.infer<typeof DownloadSchema>;
