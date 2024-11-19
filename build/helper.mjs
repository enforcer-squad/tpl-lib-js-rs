import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { rspack } from '@rspack/core';
import { globSync } from 'glob';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const { HtmlRspackPlugin } = rspack;

const isProd = process.env.NODE_ENV === 'production';

const targets = ['chrome >= 49', 'edge >= 88'];
const resolve = (dir) => {
  return join(__dirname, '..', dir);
};

const polyfill = {
  mode: 'usage',
  coreJs: '3.39.0',
  targets,
};

const getDemosEntries = () => {
  const indexs = globSync('demos/*/index.js');
  const htmlPlugins = [];
  const entries = indexs.reduce((ret, file) => {
    const [, entry] = file.split('/');
    ret[`demos/${entry}`] = resolve(file);
    htmlPlugins.push(
      new HtmlRspackPlugin({
        template: resolve(`demos/${entry}/index.html`),
        filename: `demos/${entry}/index.html`,
        inject: 'body',
        chunks: [`demos/${entry}`],
      })
    );
    return ret;
  }, {});

  return { entries, htmlPlugins };
};

export { isProd, resolve, polyfill, targets, getDemosEntries };
