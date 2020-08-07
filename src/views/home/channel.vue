<template>
<div class='channel-edit'>
  <div class='channel'>
      <van-cell title="我的频道"/>
      <div class="edit-btn">
        <van-button type="info" size="mini" @click="toggleEdit">{{edit?'取消':'编辑'}}</van-button>
      </div>
      <van-grid>
        <van-grid-item
          v-for="value in subChannels"
          :key="value.id"
          :class="{'cur':value.id===channelId}"
          @click="changeId(value)"
        >
       <span>{{value.name}}</span>
       <van-icon name="cross" size="20" v-show="edit && value.id!==0" />
       </van-grid-item>
      </van-grid>
  </div>
  <div class='channel'>
    <van-cell title="可选频道"/>
     <van-grid >
          <van-grid-item
            v-for="(value) in unSubChannel"
            :key="value.id"
            :text="value.name"
            @click="hSubscription(value)"
          />
        </van-grid>
  </div>
</div>
</template>

<script>
import { getAllChannel, delChannels, subscription } from '@/api/channel'

export default {
  name: 'channel',
  props: {
    // 已订阅频道
    subChannels: {
      type: Array,
      required: true
    },
    channelId: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      // 所有频道
      allChannel: [],
      edit: false
    }
  },
  computed: {
    // 未订阅频道
    unSubChannel () {
      return this.allChannel.filter(item => {
        const idx = this.subChannels.findIndex(val => {
          return val.id === item.id
        })
        if (idx !== -1) {
          return false
        } else {
          return true
        }
      })
    }
  },
  created () {
    this.hgetAllChannel()
  },
  methods: {
    async hSubscription (value) {
      let currentList = [...this.subChannels, value]
      currentList = currentList.map((item, idx) => {
        return { id: item.id, seq: idx }
      })
      // console.log(currentList)
      currentList.splice(0, 1)
      await subscription(currentList)
      this.subChannels.push(value)
    },
    async changeId (value) {
      if (this.edit === false) {
        this.$emit('changeId', value.id)
      } else {
        if (value.id === 0) return
        try {
          await delChannels(value.id)
          const idx = this.subChannels.findIndex(item => {
            return item.id === value.id
          })
          if (idx !== -1) {
            this.subChannels.splice(idx, 1)
          }
        } catch (e) {
        }
      }
    },
    toggleEdit () {
      this.edit = !this.edit
    },
    async hgetAllChannel () {
      const { data: { data } } = await getAllChannel()
      this.allChannel = data.channels
    }
  }
}
</script>
<style scoped lang='less'>
.channel-edit {
  width: 100%;
}
.channel{
  position: relative;
  padding:15px;
  font-size:14px;
  }
.edit-btn {
  position: absolute;
  top: 25px;
  right: 20px;
}
.cur {
    font-weight: 700;
    color: red;
}
.van-icon {
  position: absolute;
  right: 0;
  top: 0;
}
</style>
