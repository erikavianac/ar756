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
          ],
        },
      ];
    },
};

export default nextConfig;
