/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // All photography is served from local files in /public/images.
    // Formats kept modern so grids don't ship oversized files to phones.
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
