import router from './index'
import store from '@/store'
router.beforeEach(function (to, from, next) {
  if (to.path === '/user' && !store.state.tokenInfo.token) {
    next('/login?backto=' + to.fullPath)
  } else {
    next()
  }
})
export default router
