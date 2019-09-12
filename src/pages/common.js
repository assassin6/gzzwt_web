import '@/assets/css/style.scss'
// import '../utils/fastClick.js'
import '../utils/setHtmlFontSize.js'

if (__DEV__ && !__BROWSER__) {
  require('../utils/vconsole.min.js')
  new VConsole() // 控制器
}
