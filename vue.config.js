const path = require('path')
const px2rem = require('postcss-px2rem')
const pagesConfig = require('./page.config.js')
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin')
const webpack = require('webpack')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin

const postcss = px2rem({ remUnit: 37.5 })

function resolve(dir) {
  return path.join(__dirname, dir)
}

let TYPE = require('yargs-parser')(process.argv.slice(2))

const API = TYPE['API']

let plugins = [
  new LodashModuleReplacementPlugin({ collections: true }),
  new webpack.DefinePlugin({
    'process.env.API': API,
    __DEV__: API === 'dev',
    __BROWSER__: TYPE.browser
  })
]
if (TYPE.analyzer) plugins.push(new BundleAnalyzerPlugin())

module.exports = {
  publicPath: '/',
  outputDir: 'dist',
  assetsDir: 'assets',
  runtimeCompiler: false,
  productionSourceMap: false,
  parallel: true,
  transpileDependencies: ['vue-echarts', 'resize-detector'],
  configureWebpack: {
    resolve: {
      alias: {
        utils: resolve('src/utils'),
        config: resolve('src/config/app.js'),
        api: resolve('src/api')
      }
    },
    plugins
  },
  devServer: {
    open: true,
    proxy: {
      '/njzdzk-api': {
        target: 'https://test.njzdzk.com', //后端接口地址
        changeOrigin: true, // 是否允许跨域
        pathRewrite: {
          '^/njzdzk-api': '/' //路径重写  前端/flask-api 对应 后端/
        },
        secure: false
      }
    }
  },
  pages: pagesConfig,
  css: {
    loaderOptions: {
      less: {
        modifyVars: {
          // 重置vant主题色
        }
      },
      postcss: {
        plugins: [postcss]
      }
    }
  }
}
