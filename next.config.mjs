import { withContentlayer } from "next-contentlayer";
import withPlaiceholder from "@plaiceholder/next";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
};

export default withPlaiceholder(withContentlayer(nextConfig));
