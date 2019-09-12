# 广州政务通

## 安装依赖

```
npm install
```

### 运行 npm

```
npm run dev
```

开发过程中运行整个项目会导致内存溢出，建议按模块运行，如

```
yarn dev:browser --module=模块名
// 如果没有yarn则需执行如下指令
vue-cli-service serve --API=dev --browser  --module=模块名
```

### 打包

```
npm run build
```

## 目录结构介绍

    |-- dist                             // 打包目录
    |-- src                              // 源码目录
    |   |-- api                          // Api接口目录
    |   |-- assets                       // 静态资源，你的css、图片、字体等。
    |   |-- components                   // 全局组件
    |               |-- appHeader                         //头部组件
    |               |-- appLink                           //跳转组件
    |               |-- empty                             //业务空数据站位组件
    |               |-- modal                             //基础modal弹窗组件
    |				|-- pageLoading						  //页面占位loading
    |				|-- paceholderImage					  //图片组件，用于显示占位图
    |				|-- scroll					 		  // 使用better-sroll封装，用于下拉刷新，上拉加载的滚动组件
    |   |-- config                       // 应用的配置文件
    |       |-- app.js                   // 应用的配置，axios请求配置，px2rem基准值
    |       |-- page
    |           |-- index.js             // 集中导出每一个页面的配置，标题之类的
    |           |-- **.js                // 每一个页面的配置，标题之类的
    |   |-- utils                        // 工具函数
    |       |-- request.js               // 请求工具类，axios二次封装
    |       |-- setHtmlFontSize.js       // 设置根元素字体大小，配合rem做屏幕适配
    |       |-- fastClick.js             // 移动端点击延迟300ms解决方案
    |		|-- filter.js                // 过滤器
    |		|-- jsBrige.js               // 与app通信Brige
    |		|-- vconsole.js              //控制台组件
    |   |-- pages                        //页面视图
    |       |-- civil                       //民政业务
    |       |-- fund                        //公积金业务
    |       |-- security                    //社保业务
    |       |-- hospital                    //医院业务
    |       |-- index                       //首页
    |       |-- shchool                     //学校业务
    |       |-- security                    //社保业务
    |       |-- social                      //社会综合业务
    |       |-- traffic                     //交通业务
    |       |-- user                        //用户体系业务
    |       |-- vehicle                     // 机动车业务
    |       |-- common.js                   // 每个页面公共的js，可以引公共的css，js
    |-- .gitignore                       // 忽略的文件
    |-- page.config.js                   // 使用node读取pages文件夹下的文件夹配置到vue cli3
    |-- vue.config.js                    // vue cli 配置
    |-- README.md                        // 说明

## 说明

- 本项目为多页应用，无法使用 Vuex、Vue-router，页面跳转需要加上.html 后缀，如<http://127.8.8.8:8888/template.html>
- 如果页面头部导航样式只有标题和返回导航则使用 app 导航不需要前端编写，反之前端编写导航
- 页面公共资源文件或插件，在 common.js 引用即可。
- 使用 normalize.css 重置样式。
- 使用 axios 请求库，可以自定义拦截逻辑。
- 添加了 fastclick 解决移动端 300ms 点击延迟。
- 添加 postcss-px2rem 自动将 px 转换为 rem 适配移动端。
- 添加页面请在 pages 文件夹下新建目录，在里面放置 index.js 和 Index.vue（建议复制 template 文件夹修改名字进行开发）。

## 命名规范

- 文件夹命名小写开头 驼峰
- vue 组件命名小写开头 驼峰
- js 组件名称小写开头 驼峰

## 文件结构规范

- 组件模块: 公共组件(commponent/组件) 业务组件(commponent/业务模块/组件)
- 业务 pages 结构：模块>业务，最多三成目录结构,如果超过三成业务深度，上级模块+业务名称驼峰命名

## 表单验证

- 使用 utils 下的 validator.js 进行表单验证，实例如下：

```js
import Validator from '@/utils/validator.js'
// 关于规则定义详见 https://github.com/yiminghe/async-validator
const descriptor = {
  name: [
    { required: true, message: '姓名不得为空' },
    {
      validator: (rule, value) => value === 'test',
      message: '姓名必须为test'
    },
    {
      asyncValidator: (rule, value) => {
        return new Promise((resolve, reject) => {
          if (value === 'test') {
            reject('姓名错误')
          } else {
            resolve()
          }
        })
      }
    }
  ]
}
const validator = new Validator(descriptor)
validator.validate({ name: 'test' }, (value, error) => {
  if (error) return
  // 执行提交
  console.log(value)
})
```
