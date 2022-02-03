/** @type {import('next').NextConfig} */

// const withBundleAnalyzer = require('@next/bundle-analyzer')({
//   enabled: true
// });

module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['m.media-amazon.com', 'firebasestorage.googleapis.com']
  }
};
