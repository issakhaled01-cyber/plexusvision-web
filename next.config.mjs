/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.plexusvision.com",
      },
      {
        protocol: "https",
        hostname: "plexusvision.com",
      },
    ],
  },
};

export default nextConfig;
