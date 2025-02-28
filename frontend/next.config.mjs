/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "db-imagee.arinji.com",
        protocol: "https",
      },
    ],
  },
};

export default nextConfig;
