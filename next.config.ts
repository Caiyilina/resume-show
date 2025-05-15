import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  i18n: {
    locales: ["en", "zh-CN", "zh-TW"],
    defaultLocale: "zh-CN",
    localeDetection: false,
  },
  /* config options here */
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.externals.push("svg-captcha");
    }
    return config;
  },
};

export default nextConfig;
