
module.exports = {
  presets: [
    [
      '@babel/preset-env', { targets: { node: 'current' } },
    ], '@babel/preset-typescript',
  ],
  plugins: [
    ['module-resolver', {
      alias: {
        '@common': './src/common',
        '@config': './src/config',
        '@interfaces': './src/interfaces',
        '@schemas': './src/schemas',
        '@types': './src/@types',
        '@useCases': './src/use-cases',
      },
    }],
  ],
  ignore: [
    '**/*.spec.ts', '**/*.test.ts',
  ],
}
