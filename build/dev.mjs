import { defineConfig } from '@rspack/cli';
import { merge } from 'webpack-merge';
import base from './base.mjs';
import { getDemosEntries } from './helper.mjs';

const { entries, htmlPlugins } = getDemosEntries();

const dev = defineConfig({
  mode: 'development',
  devtool: 'source-map',
  entry: {
    ...entries,
  },
  plugins: [...htmlPlugins],
  optimization: {
    moduleIds: 'named',
    chunkIds: 'named',
    minimize: false,
  },
});

export default merge(base, dev);
