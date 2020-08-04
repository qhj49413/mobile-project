<template>
  <div class='scroll-wrapper'>
    <van-pull-refresh v-model="isLoadingNew" @refresh="onRefresh">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
      <van-cell v-for="(item, index) in list" :key="index" :title="item.title">
        <div slot="label">
          <van-grid :border="false" :column-num="item.cover.images.length">
            <van-grid-item v-for="image in item.cover.images" :key="image">
              <van-image :src="image" lazy-load/>
            </van-grid-item>
          </van-grid>
          <div class="text">
            <span>{{item.aut_name}}</span>
            <span>{{item.comm_count}}评论</span>
            <span>{{item.pubdate | relativeFormat}}</span>
          </div>
        </div>
      </van-cell>
    </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArticle } from '@/api/article'
export default {
  name: 'articlelist',
  props: ['channel'],
  data () {
    return {
      isLoadingNew: false,
      list: [],
      loading: false,
      finished: false
    }
  },
  methods: {
    async onRefresh () {
      const { data: { data } } = await getArticle(this.channel.id, Date.now())
      const arr = data.results
      this.list.unshift(...arr)
      this.$toast.success('刷新成功' + arr.length + '条')
      this.isLoadingNew = false
    },
    async onLoad () {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      const { data: { data } } = await getArticle(this.channel.id, Date.now())
      const arr = data.results
      this.list.push(...arr)
      // console.log(data)
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
.text span {
  margin-right: 10px;
}
</style>
