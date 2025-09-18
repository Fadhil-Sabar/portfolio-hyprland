/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "picsum.dev",
                port: "",
                pathname: "/**"
            }
        ]
    }
};

export default nextConfig;
