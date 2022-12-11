/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    loader: "default",
    domains: ['https://pokeapi.co', 'https://raw.githubusercontent.com'],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "raw.githubusercontent.com"
      }
    ]
  }
}

module.exports = nextConfig
