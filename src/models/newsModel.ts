import { z } from 'zod';

export const NewsSchema = z.object({
  id: z.string(),
  title: z.string(),
  content: z.string(),
  imageUrl: z.string(),
  authorId: z.string(),
  publishedAt: z.string(),
  active: z.boolean(),
});

export type NewsModel = z.infer<typeof NewsSchema>;
