import Vue from 'vue'
import App from './Index.vue'
import '@/pages/common'
import appLink from '@/components/appLink.vue' // 页面跳转组件
import { Loading, Toast, Search, DropdownMenu, DropdownItem, Tag } from 'vant'

const getQuery = () => {
  if (!location.href.split('?')[1]) return {}
  let queryArray = location.href.split('?')[1].split('&')
  let query = {}
  queryArray.forEach(str => {
    let key = str.split('=')[0]
    let value = str.split('=')[1]
    query[key] = value
  })
  return query
}

Vue.prototype.$query = getQuery() // 序列化query参数

Vue.component('app-link', appLink)
Vue.use(Loading)
Vue.use(Toast)
Vue.use(Search)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
Vue.use(Tag)

new Vue({
  render: h => h(App)
}).$mount('#app')
