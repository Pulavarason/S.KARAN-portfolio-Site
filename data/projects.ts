// ============================================================
// PORTFOLIO PROJECTS
// Add, remove or edit projects here. Each project automatically
// gets a page at /portfolio/[slug].
// ============================================================

export type Project = {
  slug: string;
  number: string;
  title: string;
  year: string;
  role: string;
  client: string;
  category: string;
  description: string;
  heroImage: string;
  images: string[];
  credits: { label: string; name: string }[];
};

export const projects: Project[] = [
  {
    slug: "the-last-light",
    number: "01",
    title: "The Last Light",
    year: "2026",
    role: "Director / Artist",
    client: "Maison Lumière",
    category: "Fashion Film",
    description:
      "A meditation on the golden hour, shot over three evenings on the Atlantic coast. The film follows a single dancer as daylight dissolves into dusk, exploring the fragile boundary between presence and disappearance.",
    heroImage: "/images/projects/project-01-hero.svg",
    images: [
      "/images/projects/project-01-a.svg",
      "/images/projects/project-01-b.svg",
      "/images/projects/project-01-c.svg",
    ],
    credits: [
      { label: "Director", name: "Alexander Voss" },
      { label: "Cinematography", name: "Alexander Voss" },
      { label: "Production", name: "Northbound Films" },
      { label: "Choreography", name: "Inès Marchal" },
    ],
  },
  {
    slug: "still-water",
    number: "02",
    title: "Still Water",
    year: "2025",
    role: "Director",
    client: "Atlas Magazine",
    category: "Documentary",
    description:
      "A short documentary portrait of the last lighthouse keepers of the Brittany coast — a study of solitude, ritual and the quiet dignity of obsolete work.",
    heroImage: "/images/projects/project-02-hero.svg",
    images: [
      "/images/projects/project-02-a.svg",
      "/images/projects/project-02-b.svg",
      "/images/projects/project-02-c.svg",
    ],
    credits: [
      { label: "Director", name: "Alexander Voss" },
      { label: "Editor", name: "Camille Roy" },
      { label: "Sound Design", name: "Studio Noir" },
    ],
  },
  {
    slug: "interior-weather",
    number: "03",
    title: "Interior Weather",
    year: "2024",
    role: "Artist / Director",
    client: "Galerie Nord",
    category: "Installation",
    description:
      "A three-channel video installation exploring the emotional climates of domestic space — light moving through empty rooms as a proxy for memory.",
    heroImage: "/images/projects/project-03-hero.svg",
    images: [
      "/images/projects/project-03-a.svg",
      "/images/projects/project-03-b.svg",
      "/images/projects/project-03-c.svg",
    ],
    credits: [
      { label: "Artist", name: "Alexander Voss" },
      { label: "Curator", name: "The Grey Room Gallery" },
      { label: "Technical Production", name: "Studio Noir" },
    ],
  },
  {
    slug: "north-of-here",
    number: "04",
    title: "North of Here",
    year: "2023",
    role: "Director / Cinematographer",
    client: "Independent",
    category: "Short Film",
    description:
      "A wordless short film shot across the fjords of northern Norway, following two strangers whose paths cross in a landscape too vast for language.",
    heroImage: "/images/projects/project-04-hero.svg",
    images: [
      "/images/projects/project-04-a.svg",
      "/images/projects/project-04-b.svg",
      "/images/projects/project-04-c.svg",
    ],
    credits: [
      { label: "Director", name: "Alexander Voss" },
      { label: "Cinematography", name: "Alexander Voss" },
      { label: "Producer", name: "Elin Haugen" },
    ],
  },
];

export function getProjectBySlug(slug: string) {
  return projects.find((p) => p.slug === slug);
}

export function getAdjacentProjects(slug: string) {
  const index = projects.findIndex((p) => p.slug === slug);
  const prev = projects[(index - 1 + projects.length) % projects.length];
  const next = projects[(index + 1) % projects.length];
  return { prev, next };
}
