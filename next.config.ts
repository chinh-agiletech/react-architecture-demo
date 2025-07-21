import type { NextConfig } from "next";
import nextI18nConfig from './next-i18next.config.js';

const nextConfig: NextConfig = {
  // Next.js 13+ App Router is enabled by default
  
  // Integrate i18n configuration
  i18n: nextI18nConfig.i18n
};

export default nextConfig;
