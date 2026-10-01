/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    dangerouslyAllowSVG: true,
    contentDispositionType: "inline",
    formats: ["image/avif", "image/webp"],
  },
};

module.exports = nextConfig;
