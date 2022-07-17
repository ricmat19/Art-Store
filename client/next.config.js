/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  redirects: async () => {
    return [{
      source: "/",
      destination: "/products/print",
      permanent: true
    }]
  }
}

module.exports = nextConfig
