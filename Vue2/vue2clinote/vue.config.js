const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,// Babel转译，将所有代码（包括依赖）转译为兼容的JavaScript代码
  // lintOnSave: false,// 关闭eslint校验
  publicPath: './',// 打包后的静态资源路径
})
