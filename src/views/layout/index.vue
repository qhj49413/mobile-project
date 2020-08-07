<template>
<div class='container'>
  <!-- 顶部导航区域 -->
  <van-nav-bar fixed>
    <div slot="left" class="logo"></div>
    title
    <van-button class="search-btn" slot="right" icon="search" round type="info" size="small">搜索</van-button>
  </van-nav-bar>
<!-- 中间二级路由区域 -->
<router-view></router-view>
<!-- 底部区域 -->
<van-tabbar route fixed>
  <van-tabbar-item icon="home-o" to="/">首页</van-tabbar-item>
  <van-tabbar-item icon="search" to="/question">问答</van-tabbar-item>
  <van-tabbar-item icon="video-o" to="/video">视频</van-tabbar-item>
  <van-tabbar-item icon="setting-o" to="/user">{{isLogin?'我的':'未登录'}}</van-tabbar-item>
</van-tabbar>
</div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'layout',
  data () {
    return {
      active: '/'
    }
  },
  computed: {
    ...mapGetters(['isLogin'])
  }
}
</script>
<style scoped lang='less'>
.van-nav-bar {
  .van-icon {
    color: #ffffff;
}
}
.logo {
  width: 100px;
  height: 30px;
  line-height: 30px;
  background: url("../../assets/logo.png") no-repeat center / cover;
}

</style>
