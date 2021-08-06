const { devDependencies } = require('../../dependencies.config');

module.exports = {
  templatePackageJson: {
    name: '',
    version: '1.0.0',
    description: '',
    main: 'index.js',
    keywords: [],
    author: '',
    license: 'ISC',
    scripts: {
      clean: 'rm dist/bundle.js',
      start: 'snowpack dev',
      build: 'snowpack build',
    },
    dependencies: {},
    devDependencies: {
      snowpack: devDependencies.snowpack,
    },
  },
  templateSnowpackConfig: {
    mount: {
      src: '/',
    },
    plugins: [],
    packageOptions: [],
  },
  PACKAGE_JSON: 'package.json',
  SNOWPACK_CONFIG_JSON: 'snowpack.config.json',
};
