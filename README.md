# Radmir Islamov / Радмир Исламов

Personal website and blog in Russian and English. Built with Astro, TypeScript and Markdown. Static HTML, system fonts, light and dark themes, minimal client-side JavaScript.

Website: https://therad445.github.io

## Local development

Node.js 22.12 or later is required.

```bash
npm ci
npm run dev
```

## Checks and production build

```bash
npm run check
npm run build
npm test
npm run preview
```

The deployable output is `dist/`. The checks cover routes, internal links, language alternatives, structured data, sitemap and the JavaScript budget.

## Content

- `src/data/site.ts` — biography, education, research, publications, books and contacts, in both languages.
- `src/content/projects/` — Markdown project notes. Each translation has its own language-prefixed ID.
- `src/content.config.ts` — validated content schema. `noteTitle` is an optional conversational title; `date` is the note date, not the project completion date.
- `src/layouts/Layout.astro` — navigation, theme and SEO metadata.
- `src/styles/global.css` — typography, layout and themes.
- `SOURCES.md` — public sources supporting the portfolio.

Research in progress and course experiments are labelled separately from published articles. Update both language versions together and keep results linked to their sources.

## GitHub Pages

This is a user site, published from `Therad445/Therad445.github.io` at the domain root. In repository **Settings → Pages**, the source must be **GitHub Actions**.

Every push to `main` builds, checks and deploys the site through `.github/workflows/deploy-pages.yml`. The workflow can also be started manually. It needs no personal access token or paid service.

`SITE_URL` sets canonical URLs, Open Graph and the sitemap. `PUBLIC_INDEXABLE=false` disables indexing for a private preview; production defaults to indexable. When changing domains, update `SITE_URL` in the workflow and `astro.config.mjs`, then configure DNS and the custom domain in GitHub Pages. Deploy only `dist/` to another static host.

Private editorial notes, source biographical documents, credentials and development history are deliberately excluded from this public repository. The source-code licence has not been assigned; dependencies retain their own licences.

## Русский

Двуязычный личный сайт и блог Радмира Исламова. Биография и краткие сведения находятся в `src/data/site.ts`, заметки — в `src/content/projects/`. После изменений в `main` сайт обновляется автоматически. Для предварительного просмотра используйте `npm run dev`; перед отправкой изменений выполните проверку, сборку и тесты из примера выше.
