<template>
  <div class="article-comments">
    <!-- 评论列表 -->
    <van-list
      v-model="loading"
      :finished="finished"
      :finished-text="results.length===0?'无评论':'以上是所有评论'"
      @load="onLoad"
    >
      <van-cell
        v-for="(item, idx) in results"
        :key="idx"
      >
        <van-image
          slot="icon"
          round
          width="30"
          height="30"
          style="margin-right: 10px;"
          :src="item.aut_photo"
        />
        <span style="color: #466b9d;" slot="title">{{item.aut_name}}</span>
        <div slot="label">
          <p style="color: #363636;" v-html="item.content"></p>
          <p>
            <span style="margin-right: 10px;">{{item.pubdate | relativeFormat}}</span>
            <van-button size="mini" type="default" @click="hCommentReply(item)">回复{{item.reply_count}}</van-button>
          </p>
        </div>
        <van-icon slot="right-icon" name="like-o" />
      </van-cell>
    </van-list>
    <!-- 评论列表 -->

    <!-- 发布评论 -->
    <van-cell-group class="publish-wrap">
      <van-field
        clearable
        placeholder="请输入评论内容"
        v-model="comment"
      >
        <van-button slot="button" size="mini" type="info" @click="hAddComment">发布</van-button>
      </van-field>
    </van-cell-group>
    <!-- /发布评论 -->
    <!-- 回复平论 -->
    <van-popup v-model="show" position="bottom" :style="{ height: '85%' }">
      <comment-reply v-if="show" :currentComment="currentComment" :artcleId="artcleId" @close="show=false"></comment-reply>
    </van-popup>
    <!-- /回复平论 -->

  </div>
</template>

<script>
import CommentReply from './commentreply'
import { addComments } from '@/api/comment'
export default {
  name: 'ArticleComment',
  props: {
    results: {
      type: Array,
      required: true
    },
    artcleId: {
      type: String,
      required: true
    }
  },
  components: {
    CommentReply
  },
  data () {
    return {
      currentComment: {},
      show: false,
      comment: '',
      loading: false, // 上拉加载更多的 loading
      finished: false // 是否加载结束
    }
  },

  methods: {
    async hCommentReply (item) {
      this.show = true
      this.currentComment = item
    },
    async hAddComment () {
      if (this.comment === '') return
      try {
        const result = await addComments(this.$route.params.id, this.comment)
        const article = result.data.data.new_obj
        this.results.unshift(article)
        this.comment = ''
        this.$toast.success('发表评论成功')
      } catch (err) {
        console.log(err)
      }
    },
    onLoad () {
      // this.results.unshift(this.article)
      // 加载状态结束
      this.loading = false

      // 数据全部加载完成
      if (this.results.length === 0) {
        this.finished = true
      }
    }
  }
}
</script>

<style scoped lang='less'>
// 发表评论的区域是固定在下端的
.publish-wrap {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
}
// 给发表评论区空出地方
.van-list {
  margin-bottom: 45px;
}
</style>
