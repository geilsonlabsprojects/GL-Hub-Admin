import { z } from 'zod';

export const VersionSchema = z.object({
  id: z.string(),
  appId: z.string(),
  versionNumber: z.string(),
  releaseNotes: z.string(),
  downloadUrl: z.string().url(),
  minSdk: z.number(),
  releaseDate: z.string(),
});

export type VersionModel = z.infer<typeof VersionSchema>;
