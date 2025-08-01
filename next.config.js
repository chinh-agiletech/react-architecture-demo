/** @type {import('next').NextConfig} */

const nextConfig = {
  typescript: {
    // Khi gặp lỗi TypeScript, chúng ta vẫn có thể build ứng dụng
    ignoreBuildErrors: true,
  },
  eslint: {
    // Tương tự, bỏ qua lỗi ESLint khi build
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'file.xhotel.vn',
        port: '',
        pathname: '**',
      },
    ],
  },
  // Các cấu hình khác của dự án
};

module.exports = nextConfig;
