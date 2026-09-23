import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// One Markdown file per art collection, e.g. src/content/art/mountains.md → /gallery/mountains/
// The front matter lists the paintings; any text below it is shown as the collection's write-up.
const art = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/art' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      order: z.number(),
      cover: image(),
      header: image(),
      /** A single work: the first painting is the whole piece and the rest are close-ups. */
      featured: z.boolean().default(false),
      paintings: z.array(
        z.object({
          image: image(),
          title: z.string(),
          material: z.string().optional(),
          dimensions: z.string().optional(),
        }),
      ),
    }),
});

// One YAML file per album, e.g. src/content/albums/dusk-monsoon.yaml → /music/dusk-monsoon/
// Track files live in public/music/<album>/tracks/.
const albums = defineCollection({
  loader: glob({ pattern: '*.yaml', base: './src/content/albums' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      year: z.number(),
      label: z.string(),
      order: z.number(),
      cover: image(),
      header: image(),
      spotifyAlbumId: z.string().optional(),
      tracks: z.array(
        z.object({
          title: z.string(),
          length: z.string(),
          file: z.string(),
        }),
      ),
    }),
});

export const collections = { art, albums };
