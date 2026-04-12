import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  basePath: "/wandern",
  assetPrefix: "/wandern/",
};

export default nextConfig;