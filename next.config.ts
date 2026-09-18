import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Emit plain .html at build time. This is the load-bearing setting:
  // it puts real content in the initial response instead of an empty shell.
  output: "export",
  reactStrictMode: true,
  trailingSlash: false,
  images: { unoptimized: true },
};

export default nextConfig;
