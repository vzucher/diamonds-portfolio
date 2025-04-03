/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  experimental: {
    largePageDataBytes: 20 * 1024 * 1024, // 20MB
  },
};

module.exports = nextConfig; 