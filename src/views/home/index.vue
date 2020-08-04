<template>
<div class='index'>
  <van-tabs>
  <van-tab v-for="item in channel" :title="item.name" :key="item.id">
    <article-list :channel="item"></article-list>
  </van-tab>
</van-tabs>
</div>
</template>

<script>
import ArticleList from './aticlelist'
import { getChannel } from '@/api/channel'
export default {
  name: 'home',
  components: {
    ArticleList
  },
  data () {
    return {
      channel: []
    }
  },
  created () {
    this.loadChannel()
  },
  methods: {
    async loadChannel () {
      const { data: { data } } = await getChannel()
      this.channel = data.channels
    }
  }
}
</script>
<style scoped lang='less'>
</style>
