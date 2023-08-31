const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    port: 7000,
  },
  // publicPath: '/static/', // 这个指向的地址就是打包后,html文件引用js文件的路径地址.
})
