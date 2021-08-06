const { templatePackageJson, templateWebpackConfig } = require('./config');

const { dependencies, devDependencies } = require('../../dependencies.config');

module.exports = {
  getPackageJson({ ui, main, projectName, isTypescript, isSass, isLess }) {
    const result = JSON.parse(JSON.stringify(templatePackageJson));
    result.name = projectName;
    if (main === 'react') {
      if (isTypescript) {
        result.devDependencies.typescript = devDependencies.typescript;
        result.devDependencies['ts-loader'] = devDependencies['ts-loader'];
        result.devDependencies['@hot-loader/react-dom'] =
          devDependencies['@hot-loader/react-dom'];
        result.devDependencies['@types/react'] =
          devDependencies['@types/react'];
        result.devDependencies['@types/react-dom'] =
          devDependencies['@types/react-dom'];
      }
      if (isSass) {
        result.devDependencies['css-loader'] = devDependencies['css-loader'];
        result.devDependencies['sass-loader'] = devDependencies['sass-loader'];
        result.devDependencies['node-sass'] = devDependencies['node-sass'];
        result.devDependencies['style-loader'] =
          devDependencies['style-loader'];
      }
      if (isLess) {
        result.devDependencies['css-loader'] = devDependencies['css-loader'];
        result.devDependencies['less-loader'] = devDependencies['less-loader'];
        result.devDependencies.less = devDependencies.less;
        result.devDependencies['style-loader'] =
          devDependencies['style-loader'];
      }
      result.dependencies.react = dependencies.react;
      result.dependencies['react-dom'] = dependencies['react-dom'];
      result.devDependencies['babel-loader'] = devDependencies['babel-loader'];
      result.devDependencies['@babel/core'] = devDependencies['@babel/core'];
      result.devDependencies['@babel/preset-env'] =
        devDependencies['@babel/preset-env'];
      result.devDependencies['@hot-loader/react-dom'] =
        devDependencies['@hot-loader/react-dom'];
      result.devDependencies['@babel/preset-react'] =
        devDependencies['@babel/preset-react'];
      result.devDependencies['webpack-dev-server'] =
        devDependencies['webpack-dev-server'];
    } else if (main === 'vue') {
      if (isTypescript) {
        result.devDependencies.typescript = devDependencies.typescript;
        result.devDependencies['ts-loader'] = devDependencies['ts-loader'];
      }
      result.dependencies.vue = dependencies.vue;
      result.devDependencies['vue-loader'] = devDependencies['vue-loader'];
      result.devDependencies['vue-template-compiler'] =
        devDependencies['vue-template-compiler'];
      result.devDependencies['babel-loader'] = devDependencies['babel-loader'];
      result.devDependencies['@babel/core'] = devDependencies['@babel/core'];
      result.devDependencies['@babel/preset-env'] =
        devDependencies['@babel/preset-env'];
    } else {
      console.log('没有选择任何框架，webpack不需要做任何处理！');
    }
    if (ui === 'antd') {
      result.dependencies.antd = dependencies.antd;
    } else if (ui === 'element') {
      result.dependencies['element-ui'] = dependencies['element-ui'];
    }
    return result;
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getViteConfigJs({ ui, main, isTypescript, isSass, isLess }) {
    const result = JSON.parse(JSON.stringify(templateWebpackConfig));
    let WebpackConfigTemplate = '';
    let importExportTemplate = '';
    let ConfigModuleRule = '';
    let ConfigModuleExtensions = '';
    if (main === 'vue') {
      ConfigModuleRule = `rules: [
        {
          test: /\\.vue$/,
          loader: 'vue-loader'
        },
      ]`;

      ConfigModuleExtensions = `extensions: [
        '.js',
        '.vue'
      ]`;

      result.plugins = {
        ...result.plugins,
        VueLoaderPlugin: 'vue-loader/lib/plugin',
      };
      const pluginArr = result.plugins;
      // eslint-disable-next-line guard-for-in
      for (const key in pluginArr) {
        importExportTemplate += `const ${key} = require('${pluginArr[key]}');\n`;
      }
      WebpackConfigTemplate = `${importExportTemplate}
const config = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    ${ConfigModuleRule}
  },
  resolve: {
    ${ConfigModuleExtensions}
  },
  plugins: [
    new VueLoaderPlugin()
  ]
};

module.exports = config;
`;
    } else if (main === 'react') {
      ConfigModuleRule = `rules: [
        {
          test: /\\.(js|jsx)$/,
          use: 'babel-loader',
          exclude: /node_modules/
        }
      ]`;

      ConfigModuleExtensions = `extensions: [
        '.js',
        '.jsx'
      ]`;

      const pluginArr = result.plugins;
      // eslint-disable-next-line guard-for-in
      for (const key in pluginArr) {
        importExportTemplate += `const ${key} = require('${pluginArr[key]}');\n`;
      }
      WebpackConfigTemplate = `${importExportTemplate}
const config = {
  entry: [
    'react-hot-loader/patch',
    './src/index.js'
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    ${ConfigModuleRule}
  },
  resolve: {
    ${ConfigModuleExtensions},
    alias: {
      'react-dom': '@hot-loader/react-dom'
    }
  },
  devServer: {
    contentBase: './dist'
  },
  plugins: [
    new VueLoaderPlugin()
  ]
};

module.exports = config;
`;
    } else {
      const pluginArr = result.plugins;
      // eslint-disable-next-line guard-for-in
      for (const key in pluginArr) {
        importExportTemplate += `const ${key} = require('${pluginArr[key]}');\n`;
      }
      WebpackConfigTemplate = `${importExportTemplate}
const config = {
  entry: ['react-hot-loader/patch', './src/index.js'],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  devServer: {
    contentBase: './dist',
  },
};

module.exports = config;`;
    }
    if (ui === 'antd') {
      result.packageOptions.push('antd');
    } else if (ui === 'element') {
      result.packageOptions.push('element-ui');
    }
    return WebpackConfigTemplate;
  },
};
