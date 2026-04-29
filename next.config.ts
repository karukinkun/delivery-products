import type { NextConfig } from 'next';

const isDev = process.env.NODE_ENV === 'development';
const apiOrigin = process.env.API_ORIGIN ?? '';
const getAddressApiOrigin = process.env.NEXT_PUBLIC_GET_ADDRESS_API_ORIGIN ?? '';
const cloudfrontOrigin = process.env.NEXT_PUBLIC_CLOUDFRONT_DOMAIN ?? '';
const cognitoApiOrigin = process.env.COGNITO_API_ORIGIN ?? '';

const cspHeader = `
  default-src 'self';
  script-src 'self' ${isDev ? "'unsafe-eval' 'unsafe-inline'" : ''};
  style-src 'self' 'unsafe-inline';
  img-src 'self';
  font-src 'self';
  connect-src 'self' ${apiOrigin} ${getAddressApiOrigin} ${cognitoApiOrigin};
  object-src 'none';
  base-uri 'self';
  form-action 'self';
  frame-ancestors 'none';
  upgrade-insecure-requests;
`;

const nextConfig: NextConfig = {
  reactStrictMode: true,
  transpilePackages: ['aws-amplify'],
  devIndicators: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: cloudfrontOrigin,
      },
    ],
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: cspHeader.replace(/\s{2,}/g, ' ').trim(),
          },
          // {
          //   // CORSを許可するオリジン
          //   key: 'Access-Control-Allow-Origin',
          //   value: 'https://sample-prisma-next-app.vercel.app',
          // },
          // {
          //   // 許可するメソッド
          //   key: 'Access-Control-Allow-Methods',
          //   value: 'GET,OPTIONS,POST',
          // },
          // {
          //   // 許可するリクエストヘッダ
          //   key: 'Access-Control-Allow-Headers',
          //   value: 'Content-Type',
          // },
        ],
      },
    ];
  },
};

export default nextConfig;
