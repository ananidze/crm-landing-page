/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/crm',
        permanent: true,
      },
    ]
  },
};

export default nextConfig; 