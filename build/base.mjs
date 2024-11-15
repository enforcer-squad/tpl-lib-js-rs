import { defineConfig } from '@rspack/cli'
import { rspack } from '@rspack/core'
import { isProd, polyfill } from './helper.js'

const targets = ['chrome >= 49', 'edge >= 88']

export default defineConfig({
  target: 'web',
  devtool: isProd ? false : 'source-map',
  resolve: {
    alias: {
      '@': resolve('./src'),
    },
    extensions: ['.js', '.jsx', '.json', 'glsl'],
  },
  entry: {
    main: './src/index.js',
  },
  module: {
    parser: {
      asset: {
        filename: '[name].[hash:8].[ext]',
        dataUrlCondition: {
          // 小于等于 4kb，且以 `.png` 结尾的模块将被 Base64 编码
          maxSize: 4 * 1024,
        },
      },
    },
    rules: [
      {
        test: /\.js[x]?$/,
        include: [resolve('./src'), resolve('./demo')],
        use: [
          {
            loader: 'builtin:swc-loader',
            options: {
              sourceMap: !isProd,
              jsc: {
                parser: {
                  syntax: 'ecmascript',
                  jsx: true,
                },
                transform: {
                  react: {
                    pragma: 'React.createElement',
                    pragmaFrag: 'React.Fragment',
                    runtime: 'automatic',
                    development: !isProd,
                    refresh: !isProd,
                  },
                },
              },
              env: polyfill,
            },
          },
        ],
      },
    ],
  },
  plugins: [new rspack.HtmlRspackPlugin({ template: './index.html' })],
  optimization: {
    minimizer: [
      new rspack.SwcJsMinimizerRspackPlugin(),
      new rspack.LightningCssMinimizerRspackPlugin({
        minimizerOptions: { targets },
      }),
    ],
  },
  experiments: {
    css: true,
  },
})
