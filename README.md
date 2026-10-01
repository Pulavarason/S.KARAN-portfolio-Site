# Alexander Voss — Cinematic Portfolio

A premium, cinematic Next.js portfolio for an artist/director. Built with
Next.js (App Router), TypeScript, Tailwind CSS and Framer Motion, with a
fully animated light/dark theme system, a filterable gallery with a
fullscreen lightbox, individual project pages, and a validated contact form.

> **Note on this build:** this project was written in an environment with
> no network/package-registry access, so `npm install` and `npm run build`
> could not be executed here to produce a verified build log. The code was
> written and reviewed carefully by hand, but please run the commands below
> yourself and fix anything your local `next build` / `tsc` flags — that is
> the authoritative check.

---

## 1. Installation

Requires **Node.js 18.18+** (Node 20 LTS recommended).

```bash
npm install
```

## 2. Running locally

```bash
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

## 3. Production build

```bash
npm run build
npm run start
```

`npm run build` will type-check the project and fail on any TypeScript or
lint errors — fix anything it reports before deploying.

---

## 4. Changing the artist name

Edit `data/site.ts`:

```ts
export const site = {
  name: "Alexander",          // short name, used in navbar/footer/loader
  fullName: "Alexander Voss", // full name, used in hero + about
  role: "Artist / Director",
  ...
};
```

## 5. Changing the biography

Still in `data/site.ts`, under `about`:

```ts
about: {
  bio: [
    "First paragraph...",
    "Second paragraph...",
    "Third paragraph...",
  ],
  philosophy: "A pull-quote style statement...",
  quote: "A closing quote...",
  achievements: [{ year: "2025", text: "..." }],
  collaborations: ["Studio A", "Studio B"],
  disciplines: ["Direction", "Photography"],
}
```

## 6. Replacing images

All images live in `public/images/` and are referenced by path in the data
files — nothing is hardcoded in components. The project ships with
generated placeholder SVG "photographs" (soft gradients with labels) so the
site works out of the box; swap them for real photography whenever you like.

```
public/images/
  hero/        → homepage hero backgrounds
  about/       → about page portrait
  gallery/     → gallery grid images
  projects/    → portfolio project hero + supporting images
```

To replace an image: drop a `.jpg`/`.png`/`.webp` file into the right
folder and update the matching `src` path in `data/site.ts`,
`data/gallery.ts` or `data/projects.ts`. Recommended sizes:

- Hero images: 1920×1080 or larger, landscape
- About portrait: 1200×1500, portrait
- Gallery images: any consistent aspect ratio per orientation
  (portrait ≈ 3:4, landscape ≈ 4:3, square ≈ 1:1)
- Project images: hero 1920×1080, supporting images flexible

The placeholder generator that created the current SVGs is at
`scripts/gen-placeholders.js` — safe to delete once you no longer need it.

## 7. Adding gallery images

Edit `data/gallery.ts` and add a new entry to `galleryImages`:

```ts
{
  id: "g13",
  src: "/images/gallery/my-new-photo.jpg",
  title: "New Image Title",
  category: "Portraits", // must match one of the categories below
  year: "2026",
  description: "A short description shown in the lightbox.",
  orientation: "portrait", // "portrait" | "landscape" | "square"
}
```

Categories are: `Portraits`, `Cinema`, `Fashion`, `Art`, `Directing`,
`Behind the Scenes`. To add a new category, also add it to
`galleryCategories` in the same file.

## 8. Adding projects

Edit `data/projects.ts` and add a new entry to the `projects` array —
a page is automatically generated at `/portfolio/[slug]`:

```ts
{
  slug: "my-new-project",
  number: "05",
  title: "My New Project",
  year: "2026",
  role: "Director",
  client: "Client Name",
  category: "Short Film",
  description: "A paragraph describing the project.",
  heroImage: "/images/projects/my-project-hero.jpg",
  images: ["/images/projects/my-project-a.jpg", "/images/projects/my-project-b.jpg"],
  credits: [{ label: "Director", name: "Alexander Voss" }],
}
```

It will automatically appear on the homepage's "Featured Work" (first 3
projects), the `/portfolio` index, and get its own detail page with
previous/next navigation.

## 9. Editing social links

In `data/site.ts`:

```ts
social: {
  instagram: "https://instagram.com/yourhandle",
  linkedin: "https://linkedin.com/in/yourhandle",
  vimeo: "https://vimeo.com/yourhandle",
  behance: "https://behance.net/yourhandle",
}
```

## 10. Changing contact details

Also in `data/site.ts`:

```ts
email: "hello@yourdomain.com",
phone: "+1 (000) 000-0000",
location: "City, Country",
```

The contact form (`components/ContactForm.tsx`) validates on submit and
shows a confirmation message — it does not send data anywhere by default,
since no backend is included. To wire it up, replace the `handleSubmit`
function's success branch with a call to your email service, form backend
(e.g. Formspree, Resend) or API route.

## 11. Deploying to Vercel

1. Push this project to a GitHub/GitLab/Bitbucket repository.
2. Go to [vercel.com/new](https://vercel.com/new) and import the repository.
3. Framework preset: **Next.js** (auto-detected). No environment variables
   are required for the default build.
4. Click **Deploy**.

Or from the CLI:

```bash
npm install -g vercel
vercel
```

---

## Project structure

```
app/
  layout.tsx            Root layout: fonts, theme script, navbar/footer
  page.tsx               Homepage
  about/page.tsx
  gallery/page.tsx
  portfolio/page.tsx
  portfolio/[slug]/page.tsx
  contact/page.tsx
  not-found.tsx
  globals.css

components/
  Navbar.tsx, Footer.tsx, ThemeToggle.tsx, ThemeProvider.tsx
  Hero.tsx, LoadingScreen.tsx, PageTransition.tsx, CustomCursor.tsx
  GalleryGrid.tsx, GalleryLightbox.tsx, ProjectCard.tsx, ContactForm.tsx
  MagneticButton.tsx, Reveal.tsx, ImageReveal.tsx, SectionHeading.tsx

data/
  site.ts        Artist identity, bio, social links, SEO
  projects.ts     Portfolio projects
  gallery.ts      Gallery images + categories

public/images/    All image assets (see section 6)
scripts/          One-off placeholder-image generator (safe to delete)
```

## Notes on theme system

The light/dark theme is implemented with a small React context
(`components/ThemeProvider.tsx`) plus a class on `<html>` and CSS custom
properties in `globals.css` — no extra dependency required. An inline
script in `app/layout.tsx` (`themeInitScript`) applies the saved or
system-preferred theme *before* the page paints, which prevents a flash of
the wrong theme on load. The choice is remembered in `localStorage`.

## Accessibility & motion

- Semantic headings, labelled buttons/inputs, visible focus states.
- The gallery lightbox supports `Escape`, `←`/`→`, and touch swipe.
- All animation respects `prefers-reduced-motion` (see `globals.css` and
  the loading screen / custom cursor, which are skipped entirely for users
  who request reduced motion).
