import { z } from 'zod';

export const SettingsSchema = z.object({
  maintenanceMode: z.boolean(),
  globalMessage: z.string(),
  minAppVersion: z.string(),
  defaultTheme: z.string(),
});

export type SettingsModel = z.infer<typeof SettingsSchema>;
