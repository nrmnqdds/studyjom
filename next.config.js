/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, options) => {
    config.module.rules.push({
      test: /\.lottie$/,
      type: "asset/resource",
    });

    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "corsproxy.io",
        pathname: "**",
        port: "",
      },
      {
        protocol: "https",
        hostname: "istudy-bucket2.s3.ap-southeast-1.amazonaws.com",
        pathname: "**",
        port: "",
      },
    ],
  },
};

module.exports = nextConfig;
