import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 引入移动端vant组件库
import Vant, { Lazyload } from 'vant'
import 'vant/lib/index.css'
// 引入rem适配插件
import 'amfe-flexible'
// 引入公共样式
import '@/styles/index.less'
import { relativeFormat } from '@/utils/date-time'
Vue.use(Vant)
Vue.use(Lazyload)
Vue.config.productionTip = false
Vue.filter('relativeFormat', function (val) {
  return relativeFormat(val)
})
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
