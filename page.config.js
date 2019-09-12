const glob = require('glob')
const pageConfig = require('./src/config/page/')
const commonConfig = {
  template: 'public/index.html'
}
const TYPE = require('yargs-parser')(process.argv.slice(2))
let pages = {}
try {
  // 获得入口js文件，** 匹配0个或者多个文件夹
  if (TYPE.module) {
    let paths = [`./src/pages/index/**/index.js`]
    if (TYPE.module !== 'index')
      paths.push(`./src/pages/${TYPE.module}/**/index.js`)
    pages = getEntry(paths)
  } else {
    pages = getEntry([`./src/pages/**/index.js`])
  }
} catch (err) {
  pages = {}
  console.log('读取目录出错！')
  throw err
}

function getEntry(globPath) {
  let entries = {}
  if (typeof globPath !== 'object') {
    globPath = [globPath]
  }
  globPath.forEach(itemPath => {
    glob.sync(itemPath).forEach(function(entry) {
      const namePath = entry.match(/pages\/(\S*)\/index.js/)[1]
      const nameArr = namePath.split('/')
      const name = nameArr.join('')
      const page = getTitle(nameArr)
      entries[name] = {
        entry: entry,
        filename: `${namePath}.html`,
        title: page ? page.title : '',
        chunks: ['chunk-vendors', 'chunk-common', name],
        ...commonConfig
      }
    })
  })
  return entries
}
function getTitle(nameArr) {
  let page = Object.assign({}, pageConfig)
  nameArr.forEach(name => {
    page = page[name]
  })
  return page
}
module.exports = pages
