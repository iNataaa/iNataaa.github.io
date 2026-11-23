import { fileURLToPath } from 'node:url';

/** @type {import('next').NextConfig} */
const config = {
  output: 'export',
  trailingSlash: false,
  experimental: { cpus: 1 },
  turbopack: { root: fileURLToPath(new URL('.', import.meta.url)) },
};

export default config;
