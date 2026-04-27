import type { NextConfig } from 'next';

const isDev = process.env.NODE_ENV === 'development';
const apiOrigin = String(process.env.NEXT_PUBLIC_API_ORIGIN);
const getAddressApiOrigin = String(process.env.NEXT_PUBLIC_GET_ADDRESS_API_ORIGIN);
const cloudfrontOrigin = String(process.env.NEXT_PUBLIC_CLOUDFRONT_ORIGIN);
const cognitoApiOrigin = String(process.env.NEXT_PUBLIC_COGNITO_API_ORIGIN);

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
            // key: 'Content-Security-Policy-Report-Only',
            value: cspHeader.replace(/\s{2,}/g, ' ').trim(),
          },
        ],
      },
    ];
  },
};

export default nextConfig;
