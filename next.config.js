/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        hostname: 'avatars.dicebear.com',
        protocol: 'https',
      },
      {
        hostname: 'localhost',
        protocol: 'http',
      },
    ],
  },
};

module.exports = nextConfig;
