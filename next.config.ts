import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "monpetitparfait.fr",
        pathname: "/wp-content/uploads/**",
      },
    ],
  },
};

export default nextConfig;
