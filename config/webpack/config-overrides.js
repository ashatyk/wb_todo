const path = require('path');
const {
  override,
  addWebpackAlias,
  adjustStyleLoaders,
  addWebpackPlugin,
} = require('customize-cra');
// eslint-disable-next-line
const loaderUtils = require('loader-utils');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
// eslint-disable-next-line
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ActionsLoaderConfig = require('@mihanizm56/webpack-magic-redux-modules/lib/loader-config');
const getCopiedCRAWebpackConfig = require('@wildberries/webpack-config-stream/cra/light-config');

const isProduction = process.env.NODE_ENV === 'production';

const CSSPlugin = config => {
  const modifiedPlugins = config.plugins.map(plugin => {
    if (
      Boolean(plugin.constructor) &&
      plugin.constructor.name === MiniCssExtractPlugin.name
    ) {
      return new MiniCssExtractPlugin({
        ...plugin.options,
        ignoreOrder: true,
      });
    }

    return plugin;
  });

  return { ...config, plugins: modifiedPlugins };
};

function getCSSModuleLocalIdent(context, localIdentName, localName, options) {
  const hash = loaderUtils.getHashDigest(
    context.resourcePath + localName,
    'md5',
    'base64',
    10,
  );

  return loaderUtils.interpolateName(context, `${localName}-${hash}`, options);
}

const StyleLoaderConfigProd = ({ use: [, , css], test }) => {
  if (
    test.toString() === /\.css$/.toString() ||
    test.toString() === /\.(scss|sass)$/.toString()
  ) {
    return;
  }

  if (isProduction) {
    // eslint-disable-next-line no-param-reassign
    css.options.postcssOptions.modules = {
      // localIdentName: '[local]-[hash:base64:3]',
      getLocalIdent: getCSSModuleLocalIdent,
    };
  } else {
    // eslint-disable-next-line no-param-reassign
    css.options.modules = {
      // localIdentName: '[local]-[hash:base64:3]',
      getLocalIdent: getCSSModuleLocalIdent,
    };
  }
};

const addMagicActionsLoader = () => config => {
  const newRules = [...config.module.rules, ActionsLoaderConfig()];

  return {
    ...config,
    module: { ...config.module, rules: newRules },
  };
};

const overrideCRAConfig = () => {
  const config = getCopiedCRAWebpackConfig(process.env.NODE_ENV);

  return config;
};

const disableEslintPlugin = config => {
  const modifiedPlugins = config.plugins.filter(plugin => {
    if (
      Boolean(plugin.constructor) &&
      plugin.constructor.name === 'ESLintWebpackPlugin'
    ) {
      return false;
    }

    return true;
  });

  return { ...config, plugins: modifiedPlugins };
};

module.exports = isProduction
  ? override(
      CSSPlugin,
      disableEslintPlugin,
      addWebpackPlugin(
        new CompressionPlugin({
          filename: '[path][base].gz',
          algorithm: 'gzip',
          test: /\.js$|\.css$|\.json$|\.html$|\.ico$/,
        }),
      ),
      adjustStyleLoaders(StyleLoaderConfigProd),
      addWebpackAlias({
        '@': path.resolve(process.cwd(), 'src/'),
      }),
      addMagicActionsLoader(),
      addWebpackPlugin(new ProgressBarPlugin()),
    )
  : override(
      overrideCRAConfig,
      disableEslintPlugin,
      CSSPlugin,
      adjustStyleLoaders(StyleLoaderConfigProd),
      addWebpackAlias({
        '@': path.resolve(process.cwd(), 'src/'),
      }),
      addMagicActionsLoader(),
    );
