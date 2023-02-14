/** @type {import('next').NextConfig} */

const ACCESS_KEY = process.env.AWS_ACCESSKEY;
const SECRET_KEY = process.env.AWS_SECRET_ACCESSKEY;

const nextConfig = {
  compiler: {
    styledComponents: true,
  },
  env: {
    ACCESS_KEY: ACCESS_KEY,
    SECRET_KEY: SECRET_KEY,
    RECOIL_DUPLICATE_ATOM_KEY_CHECKING_ENABLED: "false",
  },
};

module.exports = nextConfig;
