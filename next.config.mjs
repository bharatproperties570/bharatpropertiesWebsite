/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'images.unsplash.com',
            },
            {
                protocol: 'https',
                hostname: 'cdn.pixabay.com',
            },
            {
                protocol: 'https',
                hostname: 'plus.unsplash.com',
            },
            {
                protocol: 'https',
                hostname: 'drive.google.com',
            },
            {
                protocol: 'http',
                hostname: 'localhost',
                port: '4000',
            },
            {
                protocol: 'http',
                hostname: 'localhost',
                port: '4001',
            },
        ],
    },
};

export default nextConfig;
