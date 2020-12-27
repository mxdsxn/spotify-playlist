
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
        '@interfaces': './src/common/schemas/interfaces.ts',
      }
    }]
  ],
  ignore: [
    '**/*.spec.ts'
  ]
}
