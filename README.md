# Radmir Islamov / Радмир Исламов

Personal website and blog in Russian and English. Built with Astro, TypeScript and Markdown. Static HTML, locally hosted Literata and Golos Text variable fonts, light and dark themes, minimal client-side JavaScript.

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

- `src/data/site.ts` — biography, awards, research summaries, publications, presentations, books and contacts, in both languages.
- `src/data/career.json` — shared RU/EN work experience, education, skills and CV project selection. Used by both the website and PDF generator. Employment dates contain years only.
- `src/content/research/` — detailed research notes, status and substantive update dates. Add matching RU/EN entries.
- `src/content/projects/` — Markdown project notes. Each translation has its own language-prefixed ID.
- `src/content/notes/` — Markdown essays and personal notes, separate from project documentation. Add matching RU/EN files with the same slug.
- `src/content.config.ts` — validated content schema. `noteTitle` is an optional conversational title; `date` is the note date, not the project completion date.
- `src/layouts/Layout.astro` — navigation, theme and SEO metadata.
- `src/styles/global.css` — typography, layout and themes.
- `src/styles/fonts.css`, `public/fonts/` — local WOFF2 fonts and their SIL Open Font Licences; no third-party font requests.
- `DESIGN_NOTES.md` — visual references, palette, typography and font provenance.
- `src/components/LogFlow.astro`, `ProjectEvidence.astro` — source-grounded diagrams and real outputs from controlled synthetic-input runs.
- `public/data/project-demos/` — source SHAs, actual outputs, limitations and reproduction scripts for Nginx and SRE; the CUDA figure documents code, not a GPU benchmark.
- `public/cv/` — one-page RU/EN PDF résumés, linked from home, about and contact.
- `src/pages/[lang]/rss.xml.ts` — language-specific note feeds; no external service.
- `src/data/citations.ts`, `src/pages/citations/` — citation formatting and BibTeX downloads; metadata and coauthor credits are preserved.
- `public/images/` — local portraits, an attributed public-domain historical illustration and the experimental figure. Image provenance is recorded in `SOURCES.md`.
- `public/data/halfcheetah-summary.csv` — a snapshot of the public experiment data. Regenerate its figure with `python3 scripts/render-figures.py` (optional editorial dependency: Matplotlib; not needed for the Astro build).
- `SOURCES.md` — public sources supporting the portfolio.

Research in progress, course experiments, conference presentations and published articles are listed separately. Update both language versions together, preserve coauthor credits and keep results linked to their sources. Certificates supplied by the owner can support factual entries without publishing the original scans. Never place personal source documents in `public/`.

## GitHub Pages

This is a user site, published from `Therad445/Therad445.github.io` at the domain root. In repository **Settings → Pages**, the source must be **GitHub Actions**.

Every push to `main` builds, checks and deploys the site through `.github/workflows/deploy-pages.yml`. The workflow can also be started manually. It needs no personal access token or paid service.

`SITE_URL` sets canonical URLs, Open Graph and the sitemap. `PUBLIC_INDEXABLE=false` disables indexing for a private preview; production defaults to indexable. When changing domains, update `SITE_URL` in the workflow and `astro.config.mjs`, then configure DNS and the custom domain in GitHub Pages. Deploy only `dist/` to another static host.

Private editorial notes, source biographical documents, credentials and development history are deliberately excluded from this public repository. The source-code licence has not been assigned; dependencies retain their own licences.

## Русский

Двуязычный личный сайт и блог Радмира Исламова. Биография и краткие сведения находятся в `src/data/site.ts`, заметки — в `src/content/projects/`. После изменений в `main` сайт обновляется автоматически. Для предварительного просмотра используйте `npm run dev`; перед отправкой изменений выполните проверку, сборку и тесты из примера выше.

## Regenerating résumés

The PDFs are committed, so Python is not needed for the normal website build. After changing `src/data/career.json`:

```bash
python3 -m pip install reportlab fonttools brotli
python3 scripts/render-cv.py
```

The script derives embedded fonts from the local licensed Golos Text WOFF2. Render both PDFs with Poppler and inspect every page before committing. Keep each CV to one page, preserve searchable text and links, and exclude private contacts and unverified metrics.

## Editorial update, 10 November 2026

The site has 36 localized HTML pages: 18 RU/EN pairs. Three detailed research notes and three new essays/technical notes were added; the reading selection contains six discussed favourites. RSS contains notes, not research status updates. Research pages display their own substantive update date. One source of truth for employment and education feeds the biography and PDFs.

Do not describe the CUDA diagram as a performance measurement, the short local SRE run as production uptime, or the historical illustration as OCR evaluation data. The next image update requires original portraits and confirmed user-authored photographs; no gallery has been fabricated.
