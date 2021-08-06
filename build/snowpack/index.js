const { writeJsonSync } = require('fs-extra');
const { join } = require('path');
const { getPackageJson, getSnowpackConfigJson } = require('./utils');
const { SNOWPACK_CONFIG_JSON, PACKAGE_JSON } = require('./config');
const { jsonFormatted } = require('../template/lint');

module.exports = ({
  mainFramework: main,
  uiFramework: ui,
  projectName,
  $resolveRoot,
  $featureChecks: { typescript: isTypescript, sass: isSass, less: isLess },
}) => {
  // generate package.json
  writeJsonSync(
    join($resolveRoot, PACKAGE_JSON),
    getPackageJson({ ui, main, projectName, isTypescript, isSass, isLess }),
    jsonFormatted,
  );

  // generate snowpack.config.json
  writeJsonSync(
    join($resolveRoot, SNOWPACK_CONFIG_JSON),
    getSnowpackConfigJson({ ui, main, isTypescript, isSass, isLess }),
    jsonFormatted,
  );
};
