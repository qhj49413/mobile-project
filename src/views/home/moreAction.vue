<template>
<div class='action'>
  <van-cell-group v-if="!isConceal">
    <van-cell  value="不感兴趣" @click="$emit('dislike')"/>
    <van-cell  value="反馈垃圾内容" is-link @click="isConceal=true"/>
    <van-cell  value="拉黑作者"/>
  </van-cell-group>
  <van-cell-group v-else>
    <van-cell icon="arrow-left" value="返回" @click="isConceal=false"/>
    <van-cell @click="$emit('report', item.value)" v-for="item in reportList" :key="item.value">{{item.label}}</van-cell>
  </van-cell-group>
</div>
</template>

<script>
import reportList from '@/constant/report'
export default {
  name: 'actioon',
  data () {
    return {
      isConceal: false,
      reportList
    }
  }
}
</script>
<style scoped lang='less'>
</style>
