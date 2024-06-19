/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ["knex"],
  },
  basePath: process.env.NEXT_PUBLIC_BASE_PATH ?? "",
  output: "standalone",
};

export default nextConfig;
