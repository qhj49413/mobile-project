<template>
<div class="article-comments">
    <!-- 导航栏 -->
    <van-nav-bar title="1条回复">
      <van-icon slot="left" name="cross" @click="$emit('close')"/>
    </van-nav-bar>
    <!-- /导航栏 -->

    <!-- 当前评论 -->
    <van-cell title="当前评论">
      <van-image
        slot="icon"
        round
        width="30"
        height="30"
        style="margin-right: 10px;"
        :src="currentComment.aut_photo"
      />
      <span style="color: #466b9d;" slot="title">hello</span>
      <div slot="label">
        <p style="color: #363636;">{{currentComment.content}}</p>
        <p>
          <span style="margin-right: 10px;">{{currentComment.pubdate | relativeFormat}}</span>
          <van-button
            size="mini"
            type="default"
          >回复 {{currentComment.reply_count}}</van-button>
        </p>
      </div>
      <van-icon slot="right-icon" />
    </van-cell>
    <!-- /当前评论 -->
    <van-divider>全部回复</van-divider>

    <!-- 对当前评论 回复列表 -->
    <van-list
      v-model="loading"
      :finished="finished"
      :finished-text="list.length===0?'无回复':'以上是所有回复'"
      @load="onLoad"
     >
      <van-cell
        v-for="(item, index) in list"
        :key="index"
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
          <p style="color: #363636;">{{item.content}}</p>
          <p>
            <span style="margin-right: 10px;">{{item.pubdate | relativeFormat}}</span>
          </p>
        </div>
      </van-cell>
    </van-list>
    <!-- 回复列表 -->

    <!-- 发布回复 -->
    <van-cell-group class="publish-wrap">
      <van-field
        clearable
        placeholder="请输入回复内容"
        v-model="comment"
      >
        <van-button
          slot="button"
          size="mini"
          type="info"
          @click="hAddComments"
        >发布</van-button>
      </van-field>
    </van-cell-group>
    <!-- /发布回复 -->
</div>

</template>
<script>
import { getCommentsReply, addCommentsReply } from '@/api/comment'

export default {
  name: 'CommentReply',
  props: {
    currentComment: {
      type: Object,
      required: true
    },
    artcleId: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      comment: '',
      offset: null,
      list: [], // 评论列表
      loading: false, // 上拉加载更多的 loading
      finished: false // 是否加载结束
    }
  },
  methods: {
    async hAddComments () {
      if (!this.comment) return
      const result = await addCommentsReply(this.currentComment.com_id.toString(), this.comment, this.artcleId)
      this.list.unshift(result.data.data.new_obj)
      this.comment = ''
      this.currentComment.reply_count++
      this.$toast.success('回复成功')
    },
    async onLoad () {
      // 异步更新数据
      const result = await getCommentsReply(this.currentComment.com_id.toString(), this.offset)
      const arr = result.data.data.results
      this.offset = result.data.data.last_id
      this.list.push(...arr)
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
<style lang="less" scoped>
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
