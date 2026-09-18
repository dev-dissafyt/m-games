/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@m-games/ui', '@m-games/clearance-engine', '@m-games/database'],
  images: {
    domains: ['images.unsplash.com', 'zlbggxqsyswrfruxuqkq.supabase.co', 'ddetxmhghairsapcqmto.supabase.co'],
  },
  async redirects() {
    return [
      {
        source: '/configurator',
        destination: '/designer?mode=3d',
        permanent: false,
      },
      {
        source: '/commercial/planner',
        destination: '/designer?mode=planner',
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
