import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  env: {
    coingeckoApiUrl: process.env.NEXT_PUBLIC_COINGECKO_API_URL,
    coingeckoApiKey: process.env.NEXT_PUBLIC_COINGECKO_API_KEY,
  }
};

export default nextConfig;
