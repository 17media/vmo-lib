/** @type {import('next').NextConfig} */
const nextConfig = {
  assetPrefix: process.env.NODE_ENV === 'development' ? '' : './',
};

module.exports = nextConfig;
