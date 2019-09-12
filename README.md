# 广州政务通

## 安装依赖
```
npm install
```

### 运行npm
```
npm run dev
```

### 打包
```
npm run build
```


## 目录结构介绍 ##

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
	|       |-- page.js                  // 每一个页面的配置，标题之类的
	|   |-- utils                        // 工具函数
	|       |-- request.js               // 请求工具类，axios二次封装
	|       |-- setHtmlFontSize.js       // 设置根元素字体大小，配合rem做屏幕适配
	|       |-- fastClick.js             // 移动端点击延迟300ms解决方案
	|		|-- filter.js                // 过滤器
	|		|-- jsBrige.js               // 与app通信Brige
	|		|-- vconsole.js              // 控制台组件
	|       |-- Amap.js                  // 异步加载高德地图
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
* 本项目为多页应用，无法使用Vuex、Vue-router，页面跳转需要加上.html后缀，如<http://127.8.8.8:8888/template.html>
* 如果页面头部导航样式只有标题和返回导航则使用app导航不需要前端编写，反之前端编写导航
* 页面公共资源文件或插件，在common.js引用即可。
* 使用normalize.css重置样式。
* 使用axios请求库，可以自定义拦截逻辑。
* 添加了fastclick解决移动端300ms点击延迟。
* 添加postcss-px2rem自动将px转换为rem适配移动端。
* 添加页面请在pages文件夹下新建目录，在里面放置index.js和Index.vue（建议复制template文件夹修改名字进行开发）。

## 命名规范
* 文件夹命名小写开头  驼峰
* vue 组件命名小写开头 驼峰
* js组件名称小写开头  驼峰


## 文件结构规范
* 组件模块: 公共组件(commponent/组件) 业务组件(commponent/业务模块/组件)
* 业务pages结构：模块>业务，最多三成目录结构,如果超过三成业务深度，上级模块+业务名称驼峰命名