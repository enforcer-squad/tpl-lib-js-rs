const isProd = process.env.NODE_ENV === 'production'

const resolve = dir => {
  return path.join(__dirname, dir)
}

const polyfill = {
  mode: 'usage',
  coreJs: '3.39.0',
  targets: ['chrome >= 49', 'edge >= 88'],
}

export { isProd, resolve, polyfill }
