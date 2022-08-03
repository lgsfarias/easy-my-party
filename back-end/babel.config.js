module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current',
        },
      },
    ],
    '@babel/preset-typescript',
  ],
  plugins: [
    [
      'module-resolver',
      {
        alias: {
          '@controllers': './src/controllers',
          '@services': './src/services',
          '@repositories': './src/repositories',
          '@utils': './src/utils',
          '@models': './src/models',
        },
      },
    ],
  ],
  ignore: ['**/*.test.ts'],
};
