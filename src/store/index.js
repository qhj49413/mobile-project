import Vue from 'vue'
import Vuex from 'vuex'
import { setItem, getItem } from '@/utils/storage'
Vue.use(Vuex)
const sessionName = 'tokenInfo'
const userInfo = 'userInfo'
export default new Vuex.Store({
  state: {
    tokenInfo: getItem(sessionName) || {},
    userInfo: getItem(userInfo) || {}
  },
  mutations: {
    setToken (state, tokenObj) {
      state.tokenInfo = tokenObj
      setItem(sessionName, tokenObj)
    },
    setUser (state, userObj) {
      state.userInfo = userObj
      setItem(userInfo, userObj)
    },
    setUserAvatar (state, photo) {
      state.userInfo.photo = photo
      setItem(userInfo, state.userInfo)
    }
  },
  getters: {
    isLogin (state) {
      return state.tokenInfo.token
    }
  },
  actions: {
  },
  modules: {
  }
})
