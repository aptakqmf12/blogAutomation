console.log("env", process.env);
const webpack = require("webpack");
console.log(webpack.version);
module.exports = {
  devServer: {
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    proxy: [
      {
        context: ["/auth", "/api"],
        target: "https://api.admin.stage.eigene.io",
        changeOrigin: true,
        cookieDomainRewrite: {
          "eigene.io": "localhost",
        },
      },
    ],
  },
  babel: {
    plugins: ["babel-plugin-styled-components"],
  },
  webpack: {
    plugins: [
      new webpack.DefinePlugin({
        process: {env: {}}
      })
    ],
  },
};
