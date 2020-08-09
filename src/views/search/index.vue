<template>
<div class='search'>
    <!-- 顶部导航区 -->
    <van-nav-bar
      title="搜索中心"
      left-arrow
      @click-left="$router.go(-1)"
    />
    <!-- 搜索栏区域 -->
    <van-search
      v-model="keyword"
      show-action
      placeholder="请输入搜索关键词"
      @input="loadsh_jie_liu"
    >
      <div slot="action" @click="searchBtn(keyword)">搜索</div>
    </van-search>
    <!-- 展示搜索结果区域 -->
    <van-cell-group>
      <van-cell
        icon="search"
        v-for="(item,idx) in tSearchRes"
        :key="idx"
        @click="toHistory(idx)"
      >
      <div v-html="item"></div></van-cell>
    </van-cell-group>
    <!-- 历史搜索记录 -->
    <van-cell-group v-show="!keyword">
      <van-cell title="历史记录"></van-cell>
      <van-cell :title="item"
        v-for="(item, idx) in historySech"
        :key="idx"
      >
        <span slot="right-icon">
          <van-icon name="cross" @click="deleHistory(idx)"/>
        </span>
      </van-cell>
    </van-cell-group>
</div>
</template>

<script>
import _ from 'loadsh'
import { setItem, getItem } from '@/utils/storage'
import { getSearchList } from '@/api/search'
const SEARCH_HISTORY = 'searchHistory'
export default {
  name: 'search',
  data () {
    return {
      keyword: '',
      searchRes: [],
      historySech: getItem(SEARCH_HISTORY) || []
    }
  },
  computed: {
    tSearchRes () {
    // <span style="color:red;">1</span>
    // 全局g 不区分大小写i
      const regExp = new RegExp(this.keyword, 'gi')
      // 遍历原数组映射到新的数组
      return this.searchRes.map(item => {
      // 将目标关键词替换为带有高亮样式的字符串
      //   第一个参数为正则或字符串第二个参数为函数或字符串
        return item.replace(regExp, function (str) {
          return `<span style="color:red;">${str}</span>`
        })
      })
    }
  },
  methods: {
    deleHistory (idx) {
      this.historySech.splice(idx, 1)
      setItem(SEARCH_HISTORY, this.historySech)
    },
    //   添加历史记录
    addHistoryS (key) {
      const idx = this.historySech.findIndex(item => {
        return item === key
      })
      if (idx !== -1) {
        this.historySech.splice(idx, 1)
      }
      this.historySech.unshift(key)
      setItem(SEARCH_HISTORY, this.historySech)
    },
    // 搜索选项中添加到历史记录
    toHistory (idx) {
      this.addHistoryS(this.searchRes[idx])
    },
    // 搜索按钮添加历史记录
    searchBtn (val) {
      this.addHistoryS(val)
    },
    // 监听搜索框input事件
    async listening () {
      if (!this.keyword) {
        this.searchRes = []
        return
      }
      const { data: { data } } = await getSearchList(this.keyword)
      this.searchRes = data.options
    },
    // loadsh函数
    loadsh_jie_liu: _.throttle(function () {
      this.listening()
    }, 1000),
    // 防抖手写代码
    search_fang_dou () {
      if (this.timeId) {
        clearTimeout(this.timeId)
      }
      this.timeId = setTimeout(() => {
        this.listening()
      }, 5000)
    },
    // 节流手写代码
    search_jie_liu () {
      if (this.timeId) {
        return
      }
      this.timeId = setTimeout(() => {
        this.timeId = null
        this.listening()
      }, 1000)
    }
  }
}
</script>
<style scoped lang='less'>
</style>
