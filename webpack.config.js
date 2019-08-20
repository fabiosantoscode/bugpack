const path = require("path");
const webpack = require("webpack");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
  mode: "production",
  entry: "./src/handler.ts",
  devtool: "source-map",
  resolve: {
    extensions: [".js", ".json", ".ts", ".ts"],
    plugins: [new TsconfigPathsPlugin()]
  },
  output: {
    libraryTarget: "commonjs",
    path: path.join(__dirname, ".webpack"),
    filename: "[name].js"
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        parallel: true,
        cache: true,
        terserOptions: {
          ecma: 8,
          keep_classnames: true,
          keep_fnames: true,
          compress: {
            //change this to false and it will compile
            reduce_vars: true
          }
        }
      })
    ]
  },
  node: {
    __dirname: false
  },
  target: "node",
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: "babel-loader",
        options: {
          presets: [
            [
              "@babel/preset-env",
              {
                targets: {
                  node: true
                }
              }
            ],
            "@babel/preset-typescript"
          ],
          plugins: [
            "babel-plugin-transform-typescript-metadata",
            ["dynamic-import-node", { noInterop: true }],
            ["@babel/plugin-proposal-decorators", { legacy: true }],
            ["@babel/plugin-proposal-class-properties", { loose: true }]
          ]
        },
        include: [__dirname + "/src"],
        exclude: /node_modules/
      },
      {
        test: /\.(pem)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[path][name].[ext]"
            }
          }
        ],
        exclude: /node_modules/
      }
    ]
  },
  plugins: [new webpack.DefinePlugin({ "global.GENTLY": false })]
};
