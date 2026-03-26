import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/fr", destination: "/", permanent: false },
      { source: "/fr/:path*", destination: "/:path*", permanent: false },
    ];
  },
};

export default nextConfig;
