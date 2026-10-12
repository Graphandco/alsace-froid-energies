/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "alsace-froid-energies.graphandco.com",
        pathname: "/wp-content/uploads/**",
      },
      {
        protocol: "https",
        hostname: "sites.graphandco.net",
        pathname: "/alsace-froid-energies/wp-content/uploads/**",
      },
    ],
  },
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
