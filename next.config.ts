import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  async redirects() {
    return [
      {
        source: "/payment-success",
        destination: "/payment/success",
        permanent: true,
      },
      {
        source: "/payment-cancel",
        destination: "/payment/cancel",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;

