import router from './index'
import store from '@/store'
import VueRouter from 'vue-router'
const routerPush = VueRouter.prototype.push

VueRouter.prototype.push = function push (location) {
  return routerPush.call(this, location).catch(error => error)
}
router.beforeEach(function (to, from, next) {
  if (to.path === '/user' && !store.state.tokenInfo.token) {
    next({ path: '/login?backto=' + to.fullPath })
  } else {
    next()
  }
})
export default router
