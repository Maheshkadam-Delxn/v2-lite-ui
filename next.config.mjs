/** @type {import('next').NextConfig} */
const nextConfig = {
     async rewrites() {
    return [
      {
        source: '/api/:path*', // Incoming request pattern
        destination: 'http://localhost:3002/api/:path*', // Destination path
      }
    ];
  },
};

export default nextConfig;
