/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');
const webpack = require('webpack');
// const WebpackCleanupPlugin = require('webpack-cleanup-plugin');
// const WebappWebpackPlugin = require('webapp-webpack-plugin');
// const CompressionPlugin = require('compression-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');

const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (env, options = {}) => ({
  entry: {
    main: './src/index.js',
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name]-[hash]-bundle.js',
    chunkFilename: '[name]-[hash]-bundle.js',
    publicPath: '/',
  },
  mode: options.mode || 'development',
  devtool: options.devtool || 'inline-source-map',
  optimization: {
    runtimeChunk: 'single',
    usedExports: true,
    splitChunks: {
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          enforce: true,
          chunks: 'all',
        },
      },
    },
    minimizer: [new TerserPlugin()],
  },

  devServer: {
    historyApiFallback: true,
    contentBase: path.join(__dirname, './dist'),
    compress: true,
    port: 3002,
    hot: env.MODE === 'development',
    disableHostCheck: true,
    proxy: (options.devServer && options.devServer.proxy) || [
      {
        context: ['/api/**'],
        target: 'https://dgg-checklist.herokuapp.com/',
        secure: false,
      },
    ],
  },
  plugins: [
    // new WebpackCleanupPlugin(),
    // new CompressionPlugin(),
    new webpack.DefinePlugin({
      'process.env.MODE': JSON.stringify(env.MODE),
      _API_: env.MODE === 'devellopment' ? '\'http://localhost:3000\'' : '\'https://dgg-checklist.herokuapp.com\'',
    }),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
      inject: 'body',
    }),
    // new WebappWebpackPlugin({
    //   logo: './src/assets/logo-max.png',
    //   favicons: {
    //     lang: 'nl-NL',
    //     start_url: '/index.html',
    //     background_color: '#9de0ad',
    //     theme_color: '#008025',
    //   },
    }),
    new WorkboxPlugin.GenerateSW(),
  ],
  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'ts-loader',
          },
        ],
      },
      {
        test: /\.js$/,
        exclude: [
          /node_modules/,
          /\.spec\.js$/,
          /mocks\.js$/,
        ],
        use: [
          'babel-loader',
          // 'stylelint-custom-processor-loader',
          // {
          //   loader: './webpack-tools/loaders/custom-features-loader',
          //   options: {
          //     features: featuresConfig,
          //   },
          // },
          {
            loader: 'eslint-loader',
            options: {
              emitWarning: true,
            },
          },
        ],
      },
      {
        test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
        use: {
          loader: 'url-loader',
          options: {
            // Limit at 50k. Above that it emits separate files
            limit: 50000,
            // url-loader sets mimetype if it's passed.
            // Without this it derives it from the file extension
            mimetype: 'application/font-woff',
            // Output below fonts directory
            name: './fonts/[name].[ext]',
          },
        },
      },
      {
        test: /\.(svg|png|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              fallback: 'file-loader',
              name: '[name].[ext]',
              outputPath: 'assets/',
              publicPath: '/assets/',
            },
          },
        ],
      },
      {
        test: /\.(jpg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[path][name].[ext]',
            },
          },
        ],
      },

      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    modules: ['src', 'node_modules'],
    alias: {
      ...(options.resolve ? options.resolve.alias : {}),
    },
  },
});
