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

// 导入全局自定义组件插件 并用use注册到全局
import plugins from '@/plugins'
Vue.use(plugins)

Vue.use(Vant)
Vue.use(Lazyload)
Vue.prototype.$eventbus = new Vue()
Vue.config.productionTip = false
Vue.filter('relativeFormat', function (val) {
  return relativeFormat(val)
})
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
