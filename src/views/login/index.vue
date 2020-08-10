<template>
  <div class="login">
    <!-- 标题 -->
    <van-nav-bar
      title="登陆"
    />

    <!-- 表单区域 -->
    <van-form @submit="userLogin">
      <!-- 输入手机号，调起手机号键盘 -->
      <van-field type="tel"
      label="手机号"
      name="手机号"
      required
      v-model.trim="reqParams.mobile"
      :rules="[{ required: true, message: '请填写手机号' }]"
      placeholder="请输入手机号" />

      <!-- 输入密码 -->
      <van-field type="password"
      label="密码"
      name="密码"
      required
      v-model.trim="reqParams.code"
      :rules="[{ required: true, message: '请填写密码' }]"
      placeholder="请输入密码"/>
      <!-- 按钮 -->
      <div class="btn-wrap">
        <van-button type="info" class="button">登陆</van-button>
      </div>
    </van-form>

  </div>
</template>
<script>
// vuex映像设置mutation方法
import { mapMutations } from 'vuex'
import { login, getProfile } from '@/api/user'
// import { setItem } from '@/utils/storage'
export default {
  name: 'Login',
  data () {
    return {
      reqParams: {
        mobile: '13254185418',
        code: '246810'
      }
      // 验证错误提示
      // mobile_errmsg: '',
      // code_errmsg: ''
    }
  },
  methods: {
    ...mapMutations(['setToken']),
    async hGetProfile () {
      await getProfile()
    },
    async userLogin () {
      // console.log(this.mobile, this.code)
      // 1. 检验
      // 验证用户输入数据的有效性。
      //  (1) 自己写判断
      //  (2) 可以采用vant中的form组件，自带的检验（作业）
      //   参考：https://vant-contrib.gitee.io/vant/#/zh-CN/form#xiao-yan-gui-ze

      // 提示登陆中
      this.$toast.loading({
        message: '登陆中',
        // 加载时禁止点击
        forbidClick: true,
        // 是否显示遮罩层
        overlay: true,
        // 一直不关闭
        duration: 0
      })
      // 2. 发请求.根据接口文档说明
      try {
        const { data: { data } } = await login(this.reqParams)
        // console.log(data)
        // 登陆成功之后，后端返回的数据
        // 1. 保存token 到vuex (所有的组件都可以访问这个数据)
        //    在组件中如何去调用mutation?(1) mapMutations,(2)$store.commit
        // console.log(result.data.data)
        this.setToken(data)
        // 2. 后续再发请求时，把token加入到请求头中。
        // 覆盖上一个toast提示
        // 会在3s之后关闭
        // todo 登陆成功，跳转
        this.$toast.success('登陆成功')
        this.$router.push(this.$route.query.backto)
      } catch (err) {
        console.log(err)
        this.$toast.fail('登陆失败')
      }
    }
  }
}
</script>
<style scoped lang='less'>
 .login {
   .button {
     background-color: #1989fa;
     color: #ffffff;
     width: 100%;
     text-align: center;
   }
 }
</style>
