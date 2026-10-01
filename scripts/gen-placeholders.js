// One-off script used to generate the placeholder editorial-style SVG
// images shipped in /public/images. Not needed at runtime — safe to
// delete once you replace the placeholders with real photography.
const fs = require("fs");
const path = require("path");

const palettes = [
  ["#2b2b28", "#57544a"],
  ["#3a352e", "#7a6f5c"],
  ["#26241f", "#4d4238"],
  ["#33302a", "#847a63"],
  ["#201f1c", "#5c5648"],
  ["#3e3a30", "#8f8467"],
];

function svg(w, h, label, sub, seed) {
  const [c1, c2] = palettes[seed % palettes.length];
  const lines = Array.from({ length: 6 }).map((_, i) => {
    const y = (h / 7) * (i + 1);
    const op = (0.03 + (i % 3) * 0.02).toFixed(2);
    return `<line x1="0" y1="${y}" x2="${w}" y2="${y}" stroke="#ffffff" stroke-opacity="${op}" stroke-width="1"/>`;
  }).join("");
  return `<svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g${seed}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${c1}"/>
      <stop offset="100%" stop-color="${c2}"/>
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="url(#g${seed})"/>
  ${lines}
  <circle cx="${w * 0.82}" cy="${h * 0.22}" r="${Math.min(w, h) * 0.14}" fill="#ffffff" fill-opacity="0.05"/>
  <text x="${w * 0.06}" y="${h - h * 0.09}" font-family="Georgia, 'Times New Roman', serif" font-size="${Math.max(18, w * 0.045)}" fill="#f5f5f0" fill-opacity="0.88" letter-spacing="2">${label}</text>
  <text x="${w * 0.06}" y="${h - h * 0.045}" font-family="Helvetica, Arial, sans-serif" font-size="${Math.max(11, w * 0.018)}" fill="#f5f5f0" fill-opacity="0.5" letter-spacing="3">${sub}</text>
</svg>`;
}

const outDir = path.join(__dirname, "..", "public", "images");

const jobs = [
  // Hero images
  { dir: "hero", file: "hero-01.svg", w: 1920, h: 1080, label: "ALEXANDER VOSS", sub: "ARTIST / DIRECTOR", seed: 0 },
  { dir: "hero", file: "hero-02.svg", w: 1920, h: 1080, label: "THE LAST LIGHT", sub: "2026", seed: 1 },
  { dir: "hero", file: "hero-03.svg", w: 1920, h: 1080, label: "NORTH OF HERE", sub: "2023", seed: 2 },

  // About
  { dir: "about", file: "portrait.svg", w: 1200, h: 1500, label: "ALEXANDER", sub: "PORTRAIT", seed: 3 },

  // Project heroes + supporting images
  { dir: "projects", file: "project-01-hero.svg", w: 1920, h: 1080, label: "THE LAST LIGHT", sub: "01 — HERO", seed: 1 },
  { dir: "projects", file: "project-01-a.svg", w: 1400, h: 1750, label: "THE LAST LIGHT", sub: "01 — A", seed: 4 },
  { dir: "projects", file: "project-01-b.svg", w: 1920, h: 1080, label: "THE LAST LIGHT", sub: "01 — B", seed: 5 },
  { dir: "projects", file: "project-01-c.svg", w: 1400, h: 1750, label: "THE LAST LIGHT", sub: "01 — C", seed: 0 },

  { dir: "projects", file: "project-02-hero.svg", w: 1920, h: 1080, label: "STILL WATER", sub: "02 — HERO", seed: 2 },
  { dir: "projects", file: "project-02-a.svg", w: 1920, h: 1080, label: "STILL WATER", sub: "02 — A", seed: 3 },
  { dir: "projects", file: "project-02-b.svg", w: 1400, h: 1750, label: "STILL WATER", sub: "02 — B", seed: 4 },
  { dir: "projects", file: "project-02-c.svg", w: 1920, h: 1080, label: "STILL WATER", sub: "02 — C", seed: 5 },

  { dir: "projects", file: "project-03-hero.svg", w: 1920, h: 1080, label: "INTERIOR WEATHER", sub: "03 — HERO", seed: 0 },
  { dir: "projects", file: "project-03-a.svg", w: 1920, h: 1080, label: "INTERIOR WEATHER", sub: "03 — A", seed: 1 },
  { dir: "projects", file: "project-03-b.svg", w: 1400, h: 1750, label: "INTERIOR WEATHER", sub: "03 — B", seed: 2 },
  { dir: "projects", file: "project-03-c.svg", w: 1920, h: 1080, label: "INTERIOR WEATHER", sub: "03 — C", seed: 3 },

  { dir: "projects", file: "project-04-hero.svg", w: 1920, h: 1080, label: "NORTH OF HERE", sub: "04 — HERO", seed: 4 },
  { dir: "projects", file: "project-04-a.svg", w: 1400, h: 1750, label: "NORTH OF HERE", sub: "04 — A", seed: 5 },
  { dir: "projects", file: "project-04-b.svg", w: 1920, h: 1080, label: "NORTH OF HERE", sub: "04 — B", seed: 0 },
  { dir: "projects", file: "project-04-c.svg", w: 1400, h: 1750, label: "NORTH OF HERE", sub: "04 — C", seed: 1 },
];

// Gallery images (12), with sizes matching their orientation
const galleryMeta = [
  ["gallery-01.svg", "portrait", "GOLDEN HOUR STUDY I"],
  ["gallery-02.svg", "landscape", "LIGHTHOUSE, BRITTANY"],
  ["gallery-03.svg", "square", "PORTRAIT IN GREY"],
  ["gallery-04.svg", "landscape", "INTERIOR WEATHER I"],
  ["gallery-05.svg", "portrait", "ON SET — NORTH OF HERE"],
  ["gallery-06.svg", "square", "DIRECTOR'S NOTES"],
  ["gallery-07.svg", "landscape", "FJORD LIGHT"],
  ["gallery-08.svg", "portrait", "STUDY IN MOTION"],
  ["gallery-09.svg", "portrait", "PORTRAIT, INÈS"],
  ["gallery-10.svg", "square", "EMPTY ROOM"],
  ["gallery-11.svg", "landscape", "COASTAL STUDY"],
  ["gallery-12.svg", "portrait", "BEHIND THE LENS"],
];

galleryMeta.forEach(([file, orientation, label], i) => {
  const dims =
    orientation === "portrait"
      ? [1000, 1300]
      : orientation === "landscape"
      ? [1400, 950]
      : [1100, 1100];
  jobs.push({ dir: "gallery", file, w: dims[0], h: dims[1], label, sub: "GALLERY", seed: i });
});

jobs.forEach((job) => {
  const dir = path.join(outDir, job.dir);
  fs.mkdirSync(dir, { recursive: true });
  const content = svg(job.w, job.h, job.label, job.sub, job.seed);
  fs.writeFileSync(path.join(dir, job.file), content, "utf8");
});

console.log(`Generated ${jobs.length} placeholder images.`);
