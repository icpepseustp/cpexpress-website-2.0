import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      'avatar.iran.liara.run',
      'imgs.search.brave.com',
      'firebasestorage.googleapis.com'
    ],    
  },
};

export default nextConfig;