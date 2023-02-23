/** @type {import('next').NextConfig} */

const nextConfig = {
  compiler: {
    styledComponents: true,
  },
  env: {
    ACCESS_KEY: process.env.AWS_ACCESSKEY,
    SECRET_KEY: process.env.AWS_SECRET_ACCESSKEY,
  },
};

module.exports = nextConfig;
