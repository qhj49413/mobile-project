<template>
<div class='index'>
  <van-tabs v-model="channelId">
   <van-tab v-for="item in channel" :title="item.name" :key="item.id" :name="item.id">
    <article-list :channel="item" @showMoreAction="hShowMoreAction"></article-list>
    </van-tab>
  </van-tabs>
  <van-popup v-model="show">
    <more-action
    @dislike = hDislike
    @report = hReport
    ref='initial'
    ></more-action>
  </van-popup>
</div>
</template>

<script>
// import eventBus from '@/utils/eventBus'
import MoreAction from './moreAction'
import ArticleList from './aticlelist'
import { getChannel } from '@/api/channel'
import { disLikes, ajaxReport } from '@/api/article'
export default {
  name: 'home',
  components: {
    ArticleList,
    MoreAction
  },
  data () {
    return {
      channel: [],
      show: false,
      articleId: null,
      channelId: 0
    }
  },
  created () {
    this.loadChannel()
    // eventBus.$on('X', data => {
    //   this.show = data
    // })
    // eventBus.$on('id', data => {
    //   this.articleId = data
    // })
  },
  methods: {
    delete () {
      const obj = {
        articleId: this.articleId,
        channelId: this.channelId
      }
      this.$eventbus.$emit('delArticle', obj)
    },
    async hReport (data) {
      try {
        await ajaxReport(this.articleId, data)
        this.show = false
        this.delete()
        this.$toast.success('操作成功')
      } catch (err) {
        this.$toast.fail('操作失败')
      }
    },
    async hDislike () {
      try {
        await disLikes(this.articleId)
        this.show = false
        this.delete()
        this.$toast.success('操作成功')
      } catch (err) {
        this.$toast.fail('操作失败')
      }
    },
    hShowMoreAction (data) {
      this.show = true
      this.articleId = data
      this.$refs.initial.isConceal = false
    },
    async loadChannel () {
      const { data: { data } } = await getChannel()
      this.channel = data.channels
    }
  }
}
</script>
<style scoped lang='less'>
.van-popup {
  width: 80%;
}
</style>
