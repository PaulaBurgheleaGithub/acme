/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
        {
            protocol: 'https',
            hostname: 'picsum.photos',
            port: '',
            pathname: '/id/**',
        },
        {
            protocol: 'https',
            hostname: 'fastly.picsum.photos',
            port: '',
            pathname: '/id/**',
        },
        ],
    },
};

module.exports = nextConfig;
