/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@m-games/ui', '@m-games/clearance-engine', '@m-games/database'],
  images: {
    domains: ['images.unsplash.com', 'zlbggxqsyswrfruxuqkq.supabase.co'],
  },
};

export default nextConfig;
