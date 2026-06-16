/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  devIndicators: false,
  webpack(config) {
    config.output.assetModuleFilename = 'static/media/[hash:8][ext]';
    return config;
  },
};

module.exports = nextConfig;

