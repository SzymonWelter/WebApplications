var path = require("path");
var HTMLWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  resolve: {
    extensions: [".js", ".jsx"],
    alias: {
      src: path.resolve(__dirname, "src/")
    }
  },
  entry: "./src/index.js",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
    publicPath: "/"
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"]
          }
        }
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: [
          'file-loader',
          {
            loader: 'image-webpack-loader',
            options: {
              bypassOnDebug: true, // webpack@1.x
              disable: true, // webpack@2.x and newer
            },
          },
        ],
      },
      {
        test: /\.s?(c|a)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "sass-loader",
          "postcss-loader"
        ]
      }
    ]
  },
  devServer: {
    historyApiFallback: true
  },
  plugins: [
    new HTMLWebpackPlugin({
      filename: "index.html",
      template: "./src/assets/template.html"
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css"
    })
  ],
  externals: {
    config: JSON.stringify({
      apiUrl: 'http://localhost:4000'
    })
  }
};
