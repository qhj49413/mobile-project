<template>
<div class='index'>
  <van-tabs v-model="channelId">
   <van-tab v-for="item in channel" :title="item.name" :key="item.id" :name="item.id">
    <article-list :channel="item" @showMoreAction="hShowMoreAction"></article-list>
    </van-tab>
  </van-tabs>
  <van-popup v-model="show" :style="{width:'80%'}">
    <more-action
    @dislike = hDislike
    @report = hReport
    ref='initial'
    ></more-action>
  </van-popup>
  <div class="bar-btn" @click="channelShow=true" v-if="isLogin">
    <van-icon name="wap-nav" size="20"/>
  </div>
  <van-action-sheet v-model="channelShow">
    <channel-show :subChannels="channel" :channelId="channelId" @changeId="hChangeId"></channel-show>
  </van-action-sheet>
</div>
</template>

<script>
// import eventBus from '@/utils/eventBus'
import { mapGetters } from 'vuex'
import ChannelShow from './channel'
import MoreAction from './moreAction'
import ArticleList from './aticlelist'
import { getChannel } from '@/api/channel'
import { disLikes, ajaxReport } from '@/api/article'
export default {
  name: 'home',
  components: {
    ArticleList,
    MoreAction,
    ChannelShow
  },
  data () {
    return {
      channelShow: false,
      // 用户频道列表
      channel: [],
      // 全步频道列表
      show: false,
      articleId: null,
      channelId: 0,
      editOpen: false
    }
  },
  computed: {
    ...mapGetters(['isLogin'])
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
  mounted () {
    // console.log(this.unSubChannel)
  },
  methods: {
    hChangeId (data) {
      this.channelId = data
      this.channelShow = false
    },
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
      if (this.$refs.initial) {
        this.$refs.initial.isConceal = false
      }
    },
    async loadChannel () {
      const { data: { data } } = await getChannel()
      this.channel = data.channels
    }
  }
}
</script>
<style scoped lang='less'>
</style>
