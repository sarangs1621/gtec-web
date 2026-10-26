import type { NextConfig } from "next";

const config: NextConfig = {
  turbopack: { root: __dirname },
  // Dev only: allow opening the dev server from any IPv4 address on the network (bare "*" is rejected by Next).
  allowedDevOrigins: ["*.*.*.*"],
};

export default config;
