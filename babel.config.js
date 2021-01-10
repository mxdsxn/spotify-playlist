
module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current'
        }
      }
    ],
    '@babel/preset-typescript'
  ],
  plugins: [
    ['module-resolver', {
      alias: {
        '@useCases': './src/use-cases',
        '@token': './src/common/token',
        '@schemas': './src/common/schemas',
      }
    }]
  ],
  ignore: [
    '**/*.spec.ts',
    '**/*.test.ts',
  ]
}
