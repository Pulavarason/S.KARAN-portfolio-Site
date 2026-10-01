// ============================================================
// SITE CONFIGURATION
// Edit this file to change the artist's name, biography,
// social links, contact details and SEO metadata.
// No component code needs to change.
// ============================================================
export const site = {
  name: "Karna",
  fullName: "S. Karna",
  role: "Director & Actor",
  tagline: "Stories shaped by emotion, presence and performance.",
  statement:
    "I bring characters to life across short films, series and television.",
  email: "skarna13111986@gmail.com",
  phone: "+91 89391 25151",
  location: "Chennai, India", // not shown in the footer any more

  // Extra profile details (used on About / Contact if you want to show them)
  profile: {
    age: 39,
    height: "5'5\"",
    experience: "4 years",
    education: "MCA",
  },

  social: {
    instagram: "https://instagram.com/", // TODO: client's real Instagram
    linkedin: "https://linkedin.com/", // TODO: client's real LinkedIn
    vimeo: "https://vimeo.com/", // TODO: or replace with YouTube
    behance: "https://behance.net/", // TODO: or remove
  },

  nav: [
    { label: "Home", href: "/", index: "01" },
    { label: "About", href: "/about", index: "02" },
    { label: "Gallery", href: "/gallery", index: "03" },
    { label: "Portfolio", href: "/portfolio", index: "04" },
    { label: "Contact", href: "/contact", index: "05" },
  ],

  about: {
    portrait: "/images/about/portrait.svg", // TODO: replace with the client's photo
    bio: [
      "S. Karna is an actor and visual artist with four years of experience in the film and television industry, working across short films, series and television.",
      "With a Master of Computer Applications (MCA) background, he brings a disciplined, thoughtful approach to every role, and he is drawn to honest, grounded performances.",
      "Today he continues to collaborate with directors, production houses and independent filmmakers to tell stories that feel real and stay with the audience.",
    ],
    philosophy:
      "\"A good performance is not about showing emotion. It is about living the moment so truthfully that the audience forgets it is acting.\"",
    disciplines: [
      "Acting",
      "Short Films",
      "Series",
      "Television",
      "Photography",
    ],
    // TODO: replace with the client's real achievements
    achievements: [
      { year: "2026", text: "Added: your latest project or award" },
      { year: "2024", text: "Added: a notable role or release" },
      { year: "2022", text: "Began professional acting career" },
    ],
    // TODO: replace with real collaborators / production houses
    collaborations: [
      "Production House One",
      "Production House Two",
      "Director Name",
      "Studio Name",
    ],
    quote: "\"Every role is a chance to tell someone's truth.\"",
  },

  seo: {
    title: "S. Karna — Actor & Artist",
    description:
      "The work of S. Karna, an actor and artist with four years of experience across short films, series and television.",
    url: "https://yourdomain.com", // TODO: replace with the real domain
    ogImage: "/images/hero/hero-01.svg",
  },
};