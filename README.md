# paulalexandrejohn.com

Portfolio site for artist and Indian classical musician Paul Alexandre John, built with [Astro](https://astro.build) and deployed to GitHub Pages.

## Development

```sh
npm install
npm run dev      # http://localhost:4321
npm run build    # static site in dist/
npx astro check  # type-check
```

## Content

| What | Where |
| --- | --- |
| Art collections (one per gallery page) | `src/content/art/<slug>.md` → `/gallery/<slug>/` |
| Painting images | `src/assets/art/<slug>/` (collection covers in `src/assets/art/_covers/`) |
| Albums | `src/content/albums/<slug>.yaml` → `/music/<slug>/` |
| Album preview tracks | `public/music/<slug>/tracks/*.mp3` |
| Page header images | `src/assets/headers/` |
| Home page images | `src/assets/home/` |
| Site title, nav, email, analytics | `src/site.ts` |
| Sitemap and `/llms.txt` | Generated at build time from the content above (`astro.config.mjs`, `src/pages/llms.txt.ts`) |

To add a painting, drop the image into `src/assets/art/<slug>/` and add an entry to the `paintings` list in that collection's front matter:

```yaml
  - image: ../../assets/art/mountains/newpainting.jpg
    title: New Painting
    material: Acrylic on canvas
    dimensions: 40 x 30
```

A painting can also have `link: /gallery/<slug>/`, which adds a "Read about this painting" link to its lightbox caption.

Text written below a collection's front matter appears above its gallery. Set `featured: true` for a single work (like Fenway Park): the first painting is shown beside the text with a "Prints available" box, and the rest are shown as close-up details.

Each album file has `cdAvailable: true`, which shows a "CDs available" box with an email-to-order button; set it to `false` if an album sells out.

## Deployment

`.github/workflows/deploy.yml` builds and deploys on every push to `main`. In the repository settings, **Pages → Build and deployment → Source** must be set to **GitHub Actions**.
