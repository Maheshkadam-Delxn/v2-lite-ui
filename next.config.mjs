// /** @type {import('next').NextConfig} */
// const nextConfig = {
//      async rewrites() {
//     return [
//       {
//         source: '/api/:path*', // Incoming request pattern
//         destination: 'http://localhost:3001/api/:path*', // Destination path
//       }
//     ];
//   },
// };

// export default nextConfig;

/** @type {import('next').NextConfig} */

const nextConfig = {
  output: 'standalone',
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://v2-lite-api.vercel.app/api/:path*',
      }
    ];
  },
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Access-Control-Allow-Methods', value: 'GET,POST,PUT,DELETE,OPTIONS' },
          { key: 'Access-Control-Allow-Headers', value: 'Content-Type, Authorization' },
        ],
      },
    ];
  },
};

export default nextConfig;