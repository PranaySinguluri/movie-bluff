const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require("webpack");

module.exports = {
  mode: "development", // use "development" during local dev
  entry: "./src/index.js", // main entry point for React
  output: {
    filename: "[name].[contenthash].js", // hashed for caching
    path: path.resolve(__dirname, "dist"),
    publicPath: "/", // needed for React Router
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/, // JS & JSX
        exclude: /node_modules/,
        use: {
          loader: "babel-loader", // transpile ES6+ & JSX
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
          },
        },
      },
      {
        test: /\.css$/, // CSS files
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.(png|jpeg|gif|svg)$/i, // Images
        type: "asset/resource",
      },
      {
        test: /\.(woff2?|eot|ttf|otf)$/i, // Fonts
        type: "asset/resource",
      },
    ],
  },

  plugins: [
    new CleanWebpackPlugin(), // clean dist before build
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      filename: "index.html",
      inject: "body",
    }),
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash].css",
    }),
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV || "production"),
    }),
    new webpack.HotModuleReplacementPlugin(), // HMR for dev
  ],

  optimization: {
    splitChunks: {
      chunks: "all", // ✅ Code splitting
    },
    runtimeChunk: "single", // separate runtime for caching
    usedExports: true, // ✅ Tree shaking
  },

  resolve: {
    extensions: [".js", ".jsx"], // allow imports without extensions
  },

  devServer: {
    static: {
      directory: path.join(__dirname, "public"),
    },
    historyApiFallback: true, // support React Router
    hot: true, // enable HMR
    port: 3000,
    open: true, // auto open browser
  },
};
