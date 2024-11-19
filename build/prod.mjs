import { defineConfig } from '@rspack/cli';
import { merge } from 'webpack-merge';
import base from './base.mjs';
import { resolve } from './helper.mjs';

const dev = defineConfig({
  mode: 'production',
  devtool: false,
  entry: resolve('./src/index.js'),,
  optimization: {
    moduleIds: 'deterministic',
    chunkIds: 'deterministic',
    minimize: true,
    runtimeChunk: 'single',
  },
});

export default merge(base, dev);
