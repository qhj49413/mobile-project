import Vue from 'vue'
import Vuex from 'vuex'
import { setItem, getItem } from '@/utils/storage'
Vue.use(Vuex)
const sessionName = 'tokenInfo'
export default new Vuex.Store({
  state: {
    tokenInfo: getItem(sessionName) || {}
  },
  mutations: {
    setToken (state, tokenObj) {
      state.tokenInfo = tokenObj
      setItem(sessionName, tokenObj)
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
