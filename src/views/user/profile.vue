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
      <van-cell is-link title="头像"  center>
        <van-image
          slot="default"
          width="1.5rem"
          height="1.5rem"
          fit="cover"
          round
          :src="user.photo"
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
    </van-cell-group>
  </div>
</template>

<script>
import { getProfile, changeUserInfo } from '@/api/user'
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
      minDate: new Date(1965, 0, 10), // dateTime-picker中最小时间
      maxDate: new Date() // 当前时间
    }
  },
  created () {
    this.loadInfo()
  },
  methods: {
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
      console.log(this.user)
    }
  }
}
</script>
