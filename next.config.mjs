/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'app-house-keeper-bucket.s3.eu-north-1.amazonaws.com',
        pathname: '**',
      },
    ],
    minimumCacheTTL: 3600, // 1 hora
    deviceSizes: [640, 750, 1080, 1200, 1920],
    imageSizes: [32, 64, 96, 128, 256, 384],
  },
  env: {
    metadataBase: 'https://www.ar756.com/', // Defina a URL base do seu site aqui
  },
  reactStrictMode: true,
    async headers() {
      return [
        {
          source: '/:path*',
          headers: [
            { key: 'Access-Control-Allow-Credentials', value: 'true' },
            { key: 'Access-Control-Allow-Origin', value: '*' },
            { key: 'Access-Control-Allow-Methods', value: 'GET,OPTIONS,PATCH,DELETE,POST,PUT' },
            { key: 'Access-Control-Allow-Headers', value: 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization' },
            { key: 'Cache-Control', value: 'public, max-age=3600, must-revalidate' },
            { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
          ],
        },
      ];
    },
};

export default nextConfig;
