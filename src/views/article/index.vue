<template>
  <div class="article-container">
    <!-- 导航栏 -->
    <van-nav-bar
      fixed
      left-arrow
      @click-left="$router.back()"
      title="文章详情"
    ></van-nav-bar>
    <!-- /导航栏 -->

    <!-- 加载中 loading -->
    <van-loading class="article-loading" v-if="loading"/>
    <!-- /加载中 loading -->

    <!-- 文章详情 -->
    <div class="detail">
      <h3 class="title">{{article.title}}</h3>
      <div class="author">
        <van-image round width="1rem" height="1rem" fit="fill" :src="article.aut_photo"/>
        <div class="text">
          <p class="name">{{article.aut_name}}</p>
          <p class="time">{{article.pubdate | relativeFormat}}</p>
        </div>
        <van-button
          round
          size="small"
          type="info"
          @click="switchFollow"
        >{{article.is_followed?'取消关注':'+ 关注'}}</van-button>
      </div>
      <div class="content">
        <div v-html="article.content"></div>
      </div>
      <van-divider>END</van-divider>
      <div class="zan">
        <van-button round size="small" hairline type="primary" plain icon="good-job-o">点赞</van-button>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <van-button round size="small" hairline type="danger" plain icon="delete">不喜欢</van-button>
      </div>
    </div>
    <!-- /文章详情 -->
    <!-- 发表评论 -->
    <article-comment :results="results"></article-comment>
    <!-- /发表评论 -->

  </div>
</template>

<script>
import { getComments } from '@/api/comment'
import { followUser, unFollowUser } from '@/api/user'
import { getArtDetail } from '@/api/article'
export default {
  name: 'ArticleIndex',
  data () {
    return {
      offset: null,
      artcleId: this.$route.params.id,
      loading: false, // 控制加载中的 loading 状态
      article: { },
      results: []
    }
  },
  created () {
    this.loadArticle()
    this.hGetComments()
  },
  methods: {
    // 获取评论信息
    async hGetComments () {
      const result = await getComments(this.artcleId, this.offset)
      this.results = result.data.data.results
      this.offset = result.data.last_id
    },
    // 关注转换
    async switchFollow () {
      const authorId = this.article.aut_id
      const data = this.article.is_followed
      if (this.article.is_followed) {
        await unFollowUser(authorId)
      } else {
        await followUser(authorId)
      }
      this.article.is_followed = !data
    },
    async loadArticle () {
      const { data: { data } } = await getArtDetail(this.artcleId)
      this.article = data
    }
  }
}
</script>

<style scoped lang='less'>
.article-container{
  position: absolute;
  left: 0;
  top: 0;
  overflow-y: scroll;
  width: 100%;
  height: 100%;
}
.article-loading {
  padding-top: 100px;
  text-align: center;
}
.error{
  padding-top: 100px;
  text-align: center;
}
.detail {
  padding: 50px 10px;
  .title {
    font-size: 16px;
  }
  .zan{
    text-align: center;
  }
  .author {
    padding: 10px 0;
    display: flex;
    .text {
      flex: 1;
      padding-left: 10px;
      line-height: 1.3;
      .name {
        font-size: 14px;
        margin: 0;
      }
      .time {
        margin: 0;
        font-size: 12px;
        color: #999;
      }
    }
  }
  .content {
    font-size:14px;
    overflow: hidden;
    white-space: pre-wrap;
    word-break: break-all;
    /deep/ img{
      max-width:100%;
      background: #f9f9f9;
    }
  }
}
</style>
