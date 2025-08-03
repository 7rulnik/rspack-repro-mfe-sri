import path from "path";
import { fileURLToPath } from "url";

import { experiments } from "@rspack/core";
const { SubresourceIntegrityPlugin } = experiments;

const isRunningWebpack = !!process.env.WEBPACK;
const isRunningRspack = !!process.env.RSPACK;
if (!isRunningRspack && !isRunningWebpack) {
  throw new Error("Unknown bundler");
}

/**
 * @type {import('webpack').Configuration | import('@rspack/cli').Configuration}
 */
const config = {
  mode: "production",
  devtool: false,
  entry: {
    main: "./src/main-entry",
    mfeEntry: "./src/mfe-entry",
  },
  plugins: [
    new SubresourceIntegrityPlugin(),
  ],
  output: {
    clean: true,
    pathinfo: true,
    filename: "[name].js",
    crossOriginLoading: "anonymous",
  },
  optimization: {
    minimize: false,
    chunkIds: "named",
    moduleIds: "named",
    runtimeChunk: "multiple",
    splitChunks: {
      cacheGroups: {
        framework: {
          test(m) {
            const resource = m.nameForCondition?.();
            if (!resource) return false;

            const frameworkDeps = [
              "react-is", // problematic dep
            ];

            const isFramework = frameworkDeps
              .map((pkg) => `node_modules/${pkg}/`)
              .some((dep) => resource.includes(dep));

            return isFramework;
          },
          name: "framework",
          chunks: "all",
          enforce: true,
        },
      },
    },
  },
};

export default config;
