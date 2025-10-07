/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['localhost'],
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'mern-project-uploads.s3.us-east-1.amazonaws.com',
                pathname: '/**',
            },
        ],
    },
};

export default nextConfig;
