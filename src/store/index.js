import Vue from 'vue'
import Vuex from 'vuex'
import { setItem, getItem } from '@/utils/storage'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    tokenInfo: getItem() || {}
  },
  mutations: {
    setToken (state, tokenObj) {
      state.tokenInfo = tokenObj
      setItem('tokenInfo', tokenObj)
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
