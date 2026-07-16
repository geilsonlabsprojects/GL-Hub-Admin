import { z } from 'zod';

export const AdminSchema = z.object({
  uid: z.string(),
  name: z.string(),
  email: z.string().email(),
  role: z.string(),
  active: z.boolean(),
  photoURL: z.string().optional(),
});

export type AdminModel = z.infer<typeof AdminSchema>;
