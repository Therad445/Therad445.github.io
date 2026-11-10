import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';
const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects', generateId: ({ data }) => `${data.lang}/${data.slug}` }),
  schema: z.object({ lang: z.enum(['ru','en']), slug: z.string(), title: z.string(), noteTitle: z.string().optional(), summary: z.string(), category: z.string(), status: z.string(), year: z.string(), order: z.number(), tags: z.array(z.string()), repo: z.string().url(), branch: z.string().default('main'), date: z.string(), featured: z.boolean().default(false), selection: z.enum(['primary','additional']).default('primary') })
});
const notes = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/notes', generateId: ({ data }) => `${data.lang}/${data.slug}` }),
  schema: z.object({ lang: z.enum(['ru','en']), slug: z.string(), title: z.string(), summary: z.string(), date: z.string(), kind: z.string().optional() })
});
const research = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/research', generateId: ({ data }) => `${data.lang}/${data.slug}` }),
  schema: z.object({ lang: z.enum(['ru','en']), slug: z.string(), title: z.string(), summary: z.string(), status: z.string(), date: z.string(), updated: z.string() })
});
export const collections = { projects, notes, research };
