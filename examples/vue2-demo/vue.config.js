/* eslint-disable */
const path = require('path');
let MockRouter = require('./mock/index');

module.exports = {
  pages: {
    index: {
      entry: 'src/main.ts',
      template: 'public/index.html',
      filename: 'index.html',
    },
  },
  // chainWebpack: config => {},
//   transpileDependencies: ['@fe-code/vue'],
  devServer: {
    before(app) {
      MockRouter(app);
    },
  },
//   configureWebpack: {
//     resolve: {
//       symlinks: false,
//       alias: {
//         vue$: 'vue/dist/vue.esm-bundler.js',
//         vue: path.resolve(__dirname, `./node_modules/vue`),
//       },
//     },
//   },
//   pluginOptions: {
//     'style-resources-loader': {
//       preProcessor: 'scss',
//       patterns: [],
//     },
//   },
};
