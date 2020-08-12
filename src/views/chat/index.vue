<template>
  <div class="container">
    <!-- 固定导航 -->
    <van-nav-bar fixed left-arrow @click-left="$router.back()" title="小智同学"></van-nav-bar>

    <!-- 聊天主体区域 -->
    <div class="chat-list" ref="chatarea">
        <div class="chat-item" v-for="(item, idx) in list" :key="idx" :class="{left:item.name==='xz',right:item.name==='me'}">
            <template v-if="item.name==='xz'">
              <van-image fit="cover" round src="https://img.yzcdn.cn/vant/cat.jpeg" />
              <div class="chat-pao">{{item.msg}}</div>
            </template>
            <template v-else>
              <div class="chat-pao">{{item.msg}}</div>
              <van-image  fit="cover" round :src="$store.state.userInfo.photo" />
            </template>
        </div>
    </div>
    <!-- 对话区域 -->
    <div class="reply-container van-hairline--top">
      <van-field v-model.trim="word" placeholder="说点什么...">
        <span  @click="send()" slot="button" style="font-size:12px;color:#999">提交</span>
      </van-field>
    </div>
  </div>
</template>

<script>
import io from 'socket.io-client'
export default {
  name: 'UserChat',
  data () {
    return {
      list: [ // 对话记录
        { name: 'xz', msg: '你好，我是无所不知的小智同学！', timestamp: Date.now() },
        { name: 'me', msg: '小智同学, 请问你知道你不知道什么吗？', timestamp: Date.now() },
        { name: 'xz', msg: '我有点晕了', timestamp: Date.now() }
      ],
      word: ''
    }
  },
  methods: {
    send () {
      if (!this.word) return
      const info = {
        msg: this.word,
        timestamp: Date.now()
      }
      //   向服务器发送消息
      this.socket.emit('message', info)
      this.list.push({
        name: 'me',
        msg: this.word,
        timestamp: Date.now()
      })
      this.word = ''
      this.moveBottom()
    },
    moveBottom () {
      this.$nextTick(function () {
        this.$refs.chatarea.scrollTop = this.$refs.chatarea.scrollHeight
      })
    }
  },
  created () {
    // 1. 建立与websocket接口的连接
    // 2. 点击发送，向服务器发消息
    //    emit('消息名',内容)
    // 3. 接收服务器的消息
    //    on('消息名',function(){
    //
    //    })
    const token = this.$store.state.tokenInfo.token
    const url = 'http://47.114.163.79:3003'
    this.socket = io(url, {
      query: { token }
    })
    // 建立连接
    this.socket.on('connect', () => {
      console.log('与服务器建立连接')
    })
    // message为后端规定的名字
    this.socket.on('message', obj => {
    //   obj服务端返回的数据
      this.list.push({
        name: 'xz',
        msg: obj.msg,
        timestamp: Date.now()
      })
      this.moveBottom()
    })
  },
  destroyed () {
    //   断开连接
    this.socket.close()
  }
}
</script>

<style lang="less" scoped>
.container {
  height: 100%;
  width: 100%;
  position: absolute;
  left: 0;
  top: 0;
  box-sizing: border-box;
  background:#fafafa;
  padding: 46px 0 50px 0;
  .chat-list {
    height: 100%;
    overflow-y: scroll;
    .chat-item{
      padding: 10px;
      .van-image{
        vertical-align: top;
        width: 40px;
        height: 40px;
      }
      .chat-pao{
        vertical-align: top;
        display: inline-block;
        min-width: 40px;
        max-width: 70%;
        min-height: 40px;
        line-height: 38px;
        border: 0.5px solid #c2d9ea;
        border-radius: 4px;
        position: relative;
        padding: 0 10px;
        background-color: #e0effb;
        word-break: break-all;
        font-size: 14px;
        color: #333;
        &::before{
          content: "";
          width: 10px;
          height: 10px;
          position: absolute;
          top: 12px;
          border-top:0.5px solid #c2d9ea;
          border-right:0.5px solid #c2d9ea;
          background: #e0effb;
        }
      }
    }
  }
}
.chat-item.right{
  text-align: right;
  .chat-pao{
    margin-left: 0;
    margin-right: 15px;
    &::before{
      right: -6px;
      transform: rotate(45deg);
    }
  }
}
.chat-item.left{
  text-align: left;
  .chat-pao{
    margin-left: 15px;
    margin-right: 0;
    &::before{
      left: -5px;
      transform: rotate(-135deg);
    }
  }
}
.reply-container {
  position: fixed;
  left: 0;
  bottom: 0;
  height: 44px;
  width: 100%;
  background: #f5f5f5;
  z-index: 9999;
}
</style>
