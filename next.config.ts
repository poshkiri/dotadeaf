import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

// No default Content-Security-Policy in this app — external scripts from
// prod.spline.design and unpkg.com (Spline runtime) are not blocked by Next.js.
// If you add CSP headers later, allow script-src/connect-src for those hosts.

const nextConfig: NextConfig = {
  transpilePackages: ["@splinetool/react-spline", "@splinetool/runtime"],
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "prod.spline.design", pathname: "/**" },
    ],
  },
};
const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

export default withNextIntl(nextConfig);
