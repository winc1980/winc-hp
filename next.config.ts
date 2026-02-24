import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ["images.microcms-assets.io"],
    unoptimized: true,
  },
  target: 'serverless', // 追記
};

export default nextConfig;
