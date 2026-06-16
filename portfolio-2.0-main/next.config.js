/** @type {import('next').NextConfig} */
const nextConfig = {
  devIndicators: false,
  webpack(config) {
    config.output.assetModuleFilename = 'static/media/[hash:8][ext]';
    return config;
  },
};

module.exports = nextConfig;
