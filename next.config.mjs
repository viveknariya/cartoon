import nextIntlPlugin from "next-intl/plugin";

const withNextIntl = nextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/sitemap.xml",
        destination: "/sitemap.xml.js",
      },
    ];
  },
};

export default withNextIntl(nextConfig);
