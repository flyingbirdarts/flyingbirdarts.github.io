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
| Art collections (one per gallery page) | `src/content/art/<slug>.yaml` → `/gallery/<slug>/` |
| Painting images | `src/assets/art/<slug>/` (collection covers in `src/assets/art/_covers/`) |
| Albums | `src/content/albums/<slug>.yaml` → `/music/<slug>/` |
| Album preview tracks | `public/music/<slug>/tracks/*.mp3` |
| Page header images | `src/assets/headers/` |
| Home page images | `src/assets/home/` |
| Site title, nav, email, analytics | `src/site.ts` |

To add a painting, drop the image into `src/assets/art/<slug>/` and add an entry to that collection's `paintings` list:

```yaml
  - image: ../../assets/art/mountains/newpainting.jpg
    title: New Painting
    material: Acrylic on canvas
    dimensions: 40 x 30
```

## Deployment

`.github/workflows/deploy.yml` builds and deploys on every push to `master`. In the repository settings, **Pages → Build and deployment → Source** must be set to **GitHub Actions**.

`_legacy/` holds the original Jekyll site for reference while the port is in progress. It is not part of the build and will be removed once the port is complete.
