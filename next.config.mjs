/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/certificate",
        destination: "/",
        permanent: true,
      },
      {
        source: "/certificate/:id*",
        destination: "/",
        permanent: true,
      },
      {
        source: "/verify",
        destination: "/",
        permanent: true,
      },
      {
        source: "/certificates/:path*",
        destination: "/",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
