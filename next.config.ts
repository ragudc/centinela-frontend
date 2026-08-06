import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Next's image optimizer defaults to `Content-Disposition: attachment`,
    // which some browser contexts refuse to paint inline in an <img> even
    // though the response is a valid 200 image — causing blank/broken
    // product images despite the network request "succeeding".
    contentDispositionType: "inline",
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
};

export default nextConfig;
