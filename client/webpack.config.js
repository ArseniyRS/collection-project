const htmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const TerserWebpackPlugin = require("terser-webpack-plugin");
const autoprefixer = require("autoprefixer");
const webpack = require("webpack");
const path = require("path");

const isDev = process.env.NODE_ENV === "development";
const isProd = !isDev;

const optimization = () => {
  const config = {
    runtimeChunk: "single",
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendors",
          chunks: "all",
        },
      },
    },
  };

  if (isProd) {
    config.minimizer = [new CssMinimizerPlugin(), new TerserWebpackPlugin()];
  }

  return config;
};

const filename = (ext) => (isDev ? `[name].${ext}` : `[name].[hash].${ext}`);

const plugins = () => {
  const base = [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: "css/[name].css",
    }),
    new CssMinimizerPlugin(),
    new htmlWebpackPlugin({
      template: path.resolve(__dirname, "public", "index.html"),
      favicon: "./public/favicon.ico",
    }),
  ];

  // if (isProd) {
  //     base.push(new BundleAnalyzerPlugin())
  // }

  return base;
};

module.exports = {
  entry: path.resolve(__dirname, `./src/index.tsx`),
  output: {
    filename: filename("js"),
    path: path.resolve(__dirname, "dist/"),
    publicPath: "/",
  },
  resolve: {
    modules: [path.join(__dirname, "node_modules")],
    extensions: [
      ".ts",
      ".tsx",
      ".jsx",
      ".js",
      ".jsx",
      ".wasm",
      ".mjs",
      ".json",
    ],
    alias: {
      "@": path.resolve(__dirname, "src"),
      "@c": path.resolve(__dirname, "src/components"),
      "@s": path.resolve(__dirname, "src/styles"),
      "@a": path.resolve(__dirname, "src/assets"),
    },
  },
  optimization: optimization(),
  module: {
    rules: [
      //   {
      //     test: /\.m?js/,
      //     resolve: {
      //       fullySpecified: false,
      //     },
      //   },
      {
        test: /\.(js|jsx|tsx|ts)$/,
        exclude: /node_modules/,
        resolve: {
          fullySpecified: false,
        },
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              "@babel/preset-env",
              "@babel/preset-react",
              "@babel/preset-typescript",
            ],
            plugins: [
              "@babel/plugin-transform-destructuring",
              "@babel/plugin-proposal-object-rest-spread",
              "@babel/plugin-transform-template-literals",
              "@babel/plugin-transform-runtime",
            ],
          },
        },
      },
      {
        test: /\.bundle\.ts$/,
        use: {
          loader: "bundle-loader",
          options: {
            name: "[name]",
          },
        },
      },
      {
        test: /\.s?css$/,
        use: [
          { loader: MiniCssExtractPlugin.loader },
          { loader: "css-loader" },
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [autoprefixer],
              },
            },
          },
          { loader: "sass-loader" },
        ],
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
            options: { minimize: true },
          },
        ],
      },
      {
        test: /\.(eot|ttf|woff|woff2)(\?\S*)?$/,
        loader: "file-loader",
        options: {
          context: "src/assets/fonts",
          name: "[path][name].[ext]",
          outputPath: "fonts",
        },
      },
      {
        test: /\.(png|jpe?g|gif|webm|mp4|svg)$/,
        loader: "file-loader",
        options: {
          context: "src/assets/img",
          name: "[path][name].[ext]",
          outputPath: "img",
        },
      },
    ],
  },
  plugins: plugins(),
  performance: {
    hints: false,
  },
  devtool: isDev ? "source-map" : undefined,
  devServer: {
    historyApiFallback: true,
    hot: isDev,
    //host: "127.0.0.1",
    host: "10.244.10.12",
    port: "5000",
  },
};
