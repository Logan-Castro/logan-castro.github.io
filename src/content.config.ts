import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    category: z.enum(['vehicles', 'fabrication', 'mechatronics', 'class', 'dorm', 'fun']),
    status: z.enum(['completed', 'in-progress', 'on-horizon']),
    tags: z.array(z.string()).default([]),
    featured: z.boolean().default(false),
    cover: z.string().optional(),
    coverAlt: z.string().optional(),
    team: z.array(z.string()).optional(),
    context: z.string(),
  }),
});

const photos = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/photos' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    camera: z.string().optional(),
    location: z.string().optional(),
    cover: z.string().optional(),
  }),
});

export const collections = { projects, photos };
