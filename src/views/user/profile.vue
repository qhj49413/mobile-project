<template>
  <div class="container">
    <!-- 导航条 -->
    <van-nav-bar
      left-arrow
      @click-left="$router.back()"
      title="编辑资料">
    </van-nav-bar>

    <!-- 编辑区 -->
    <van-cell-group>
      <input type="file" @change="upLoadAvatar" hidden ref="input"/>
      <van-cell is-link title="头像"  center>
        <van-image
          slot="default"
          width="1.5rem"
          height="1.5rem"
          fit="cover"
          round
          :src="user.photo"
          @click="hUpAvatar"
        />
      </van-cell>
        <!-- value： 设置右侧显示的文字 -->
      <van-cell is-link title="姓名" :value="user.name" @click="showName=true"/>
      <van-dialog @confirm="changeName" v-model="showName" title="修改名字" show-cancel-button>
        <van-field v-model="newName"></van-field>
      </van-dialog>
      <van-cell is-link title="性别" :value="user.gender === 1?'女':'男'" @click="showGender=true"/>
      <van-action-sheet
        v-model="showGender"
        :actions="actions"
        cancel-text="取消"
        close-on-click-action
        @select="changeGender"
      />
      <van-cell is-link title="生日" :value="user.birthday" @click="showBirthday=true"/>
      <van-popup v-model="showBirthday"  position="bottom" :style="{ height: '30%' }">
        <van-datetime-picker
          v-model="newDate"
          type="date"
          title="选择年月日"
          :min-date="minDate"
          :max-date="maxDate"
          @cancel="showBirthday=false"
          @confirm="changeBirthday"
        />
      </van-popup>
    </van-cell-group>
  </div>
</template>

<script>
import dayjs from 'dayjs'
import { getProfile, changeUserInfo, changeUserAvatar } from '@/api/user'
export default {
  name: 'userProfile',
  data () {
    return {
      actions: [{ name: '男' }, { name: '女' }],
      // 控制弹层
      showName: false,
      showGender: false,
      showBirthday: false,

      // 当前用户的信息
      user: {},

      // 修改后的新名字
      newName: '',
      // 修改后新生日
      newDate: new Date(),
      minDate: new Date(2000, 0, 10), // dateTime-picker中最小时间
      maxDate: new Date(), // 当前时间,
      birthday: null
    }
  },
  created () {
    this.loadInfo()
  },
  methods: {
    async changeBirthday (value) {
      const birthday = dayjs(value).format('YYYY-MM-DD')
      await changeUserInfo({ birthday })
      this.user.birthday = birthday
      this.showBirthday = false
    },
    // 绑定点击事件到图片上
    hUpAvatar () {
      this.$refs.input.click()
    },
    // 上传头像发请求
    async upLoadAvatar () {
      const file = this.$refs.input.files[0]
      const fd = new FormData()
      fd.append('photo', file)
      // console.log(fd)
      const { data: { data } } = await changeUserAvatar(fd)
      // result.data.data.photo
      this.$store.commit('setUserAvatar', data.photo)
      // console.log(result)
      this.user.photo = data.photo
    },
    async changeGender (action, index) {
      const idx = index.toString()
      await changeUserInfo({ gender: idx })
      this.user.gender = idx
      console.log(this.user)
    },
    async changeName () {
      const result = await changeUserInfo({ name: this.newName })
      this.user.name = result.data.data.name
    },
    // 渲染页面基本信息
    async loadInfo () {
      const result = await getProfile()
      this.user = result.data.data
      this.newName = this.user.name
      // console.log(this.user)
    }
  }
}
</script>
