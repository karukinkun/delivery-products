/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  images: {
    // 外部画像（S3）を許可
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'd2aymlk78nvn6l.cloudfront.net',
      },
    ],
  },
};

module.exports = nextConfig;
