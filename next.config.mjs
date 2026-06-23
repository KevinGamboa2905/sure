/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Placeholders réalistes utilisés pendant le design (avatars, mockups).
    remotePatterns: [
      { protocol: "https", hostname: "picsum.photos" },
      { protocol: "https", hostname: "i.pravatar.cc" },
    ],
  },
};

export default nextConfig;
