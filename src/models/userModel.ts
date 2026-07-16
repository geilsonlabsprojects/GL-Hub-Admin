import { z } from 'zod';

export const UserSchema = z.object({
  uid: z.string(),
  name: z.string(),
  email: z.string().email(),
  photoURL: z.string().optional(),
  lastLogin: z.string(),
  active: z.boolean(),
});

export type UserModel = z.infer<typeof UserSchema>;
