// ============================================================
// GALLERY IMAGES
// Add images here. "category" controls which filter tab they
// appear under. "orientation" controls the masonry sizing.
// ============================================================

export type GalleryCategory =
  | "Portraits"
  | "Cinema"
  | "Fashion"
  | "Art"
  | "Directing"
  | "Behind the Scenes";

export type GalleryImage = {
  id: string;
  src: string;
  title: string;
  category: GalleryCategory;
  year: string;
  description: string;
  orientation: "portrait" | "landscape" | "square";
};

export const galleryImages: GalleryImage[] = [
  {
    id: "g01",
    src: "/images/gallery/gallery-01.svg",
    title: "Golden Hour Study I",
    category: "Fashion",
    year: "2026",
    description: "From the making of The Last Light, Atlantic coast.",
    orientation: "portrait",
  },
  {
    id: "g02",
    src: "/images/gallery/gallery-02.svg",
    title: "Lighthouse, Brittany",
    category: "Cinema",
    year: "2025",
    description: "Still frame from Still Water.",
    orientation: "landscape",
  },
  {
    id: "g03",
    src: "/images/gallery/gallery-03.svg",
    title: "Portrait in Grey",
    category: "Portraits",
    year: "2024",
    description: "Studio portrait series, Paris.",
    orientation: "square",
  },
  {
    id: "g04",
    src: "/images/gallery/gallery-04.svg",
    title: "Interior Weather I",
    category: "Art",
    year: "2024",
    description: "Installation view, Galerie Nord, Berlin.",
    orientation: "landscape",
  },
  {
    id: "g05",
    src: "/images/gallery/gallery-05.svg",
    title: "On Set — North of Here",
    category: "Behind the Scenes",
    year: "2023",
    description: "Location scouting, Lofoten Islands.",
    orientation: "portrait",
  },
  {
    id: "g06",
    src: "/images/gallery/gallery-06.svg",
    title: "Director's Notes",
    category: "Directing",
    year: "2023",
    description: "Between takes, North of Here.",
    orientation: "square",
  },
  {
    id: "g07",
    src: "/images/gallery/gallery-07.svg",
    title: "Fjord Light",
    category: "Cinema",
    year: "2023",
    description: "Production still, North of Here.",
    orientation: "landscape",
  },
  {
    id: "g08",
    src: "/images/gallery/gallery-08.svg",
    title: "Study in Motion",
    category: "Fashion",
    year: "2022",
    description: "Editorial for Atlas Magazine.",
    orientation: "portrait",
  },
  {
    id: "g09",
    src: "/images/gallery/gallery-09.svg",
    title: "Portrait, Inès",
    category: "Portraits",
    year: "2026",
    description: "Dancer portrait, The Last Light.",
    orientation: "portrait",
  },
  {
    id: "g10",
    src: "/images/gallery/gallery-10.svg",
    title: "Empty Room",
    category: "Art",
    year: "2024",
    description: "From the Interior Weather series.",
    orientation: "square",
  },
  {
    id: "g11",
    src: "/images/gallery/gallery-11.svg",
    title: "Coastal Study",
    category: "Cinema",
    year: "2026",
    description: "Location still, The Last Light.",
    orientation: "landscape",
  },
  {
    id: "g12",
    src: "/images/gallery/gallery-12.svg",
    title: "Behind the Lens",
    category: "Behind the Scenes",
    year: "2025",
    description: "On location, Still Water.",
    orientation: "portrait",
  },
];

export const galleryCategories: (GalleryCategory | "All")[] = [
  "All",
  "Portraits",
  "Cinema",
  "Fashion",
  "Art",
  "Directing",
  "Behind the Scenes",
];
