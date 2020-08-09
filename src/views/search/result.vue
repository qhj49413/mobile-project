<template>
<div class='result'>
    <!-- 顶部导航区域 -->
    <van-nav-bar
      :title="keyword+'的搜索结果'"
      left-arrow
      @click-left="$router.go(-1)"
    />
    <!-- 搜索结果页展示 -->
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad">
      <van-cell v-for="item in list" :key="item.art_id" :title="item.title"  @click="$router.push(`/article/${item.art_id.toString()}`)"/>
    </van-list>
</div>
</template>

<script>
import { getResult } from '@/api/search'
// const keyword = this.$route.query.keyword
export default {
  name: 'search-result',
  data () {
    return {
      keyword: this.$route.query.keyword,
      page: 1,
      list: [],
      loading: false,
      finished: false
    }
  },
  methods: {

    async onLoad () {
      const { data: { data } } = await getResult(this.keyword, this.page)
      this.page++
      const arr = data.results
      this.list.push(...arr)
      //   this.page++
      // 加载状态结束
      this.loading = false

      // 数据全部加载完成
      if (arr.length === 0) {
        this.finished = true
      }
    }
  }
}
</script>
<style scoped lang='less'>
.result {
  height: 100%;
  overflow: auto;
  .article-list {
    margin-top: 39px;
  }
}
</style>
