import type { NextConfig } from "next";

/**
 * GitHub Pages serves project sites at /<repo>, so basePath must match.
 * Set NEXT_PUBLIC_BASE_PATH in CI (e.g. /frontend or /alfahost).
 * Locally leave unset for http://localhost:3000/
 */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH?.replace(/\/$/, "") || "";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  allowedDevOrigins: ["192.168.0.159"],
  images: {
    unoptimized: true,
  },
  basePath,
  assetPrefix: basePath ? `${basePath}/` : undefined,
};

export default nextConfig;
