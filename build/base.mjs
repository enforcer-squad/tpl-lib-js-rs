import { defineConfig } from '@rspack/cli';
import { ModuleFederationPlugin } from '@module-federation/enhanced/rspack';
import { isProd, polyfill, resolve } from './helper.mjs';

const base = defineConfig({
  target: 'web',
  output: {
    publicPath: '/federation_provider/',
  },
  resolve: {
    alias: {
      '@': resolve('./src'),
    },
    extensions: ['.js', '.jsx', '.json', '.glsl'],
  },
  module: {
    rules: [
      {
        test: /\.js[x]?$/,
        include: [resolve('./src'), resolve('./demos')],
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
              rspackExperiments: {
                import: [
                  {
                    libraryName: 'antd',
                    style: '{{member}}/style/index.css',
                  },
                ],
              },
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'federation_provider',
      exposes: {
        './expose': resolve('./src/expose.js'),
        './button': resolve('./src/button/index.jsx'),
      },
      shared: ['react', 'react-dom'],
      dts: false,
      // getPublicPath: `return "//" + window.location.host + "/federation_provider"`,
    }),
  ],
});

export default base;
