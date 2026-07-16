import { z } from 'zod';

export const LogSchema = z.object({
  id: z.string(),
  userId: z.string(),
  action: z.string(),
  target: z.string(),
  details: z.string(),
  timestamp: z.string(),
});

export type LogModel = z.infer<typeof LogSchema>;
