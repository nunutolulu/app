const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  productionSourceMap: false,
  transpileDependencies: true,
  lintOnSave: false,
  devServer: {
    /* host: "0.0.0.0",
    port: 3000, */
    /* client: {
      WebSocketURL: "ws://0.0.0.0:8080/ws",
    }, */
    proxy: {
      "/api": {
        target: "http://gmall-h5-api.atguigu.cn",
        pathRewrite: { "^api": "" },
      },
    },
  },
});
