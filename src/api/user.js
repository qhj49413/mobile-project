// import ajax from '@/utils/request'
// /**
//  * 登录请求函数
//  * @param {*} paramsObj 请求参数对象
//  */
// export const login = (mobile, code) => {
//   return ajax({
//     method: 'POST',
//     url: 'v1_0/authorizations',
//     data: {
//       mobile: mobile,
//       code: code
//     }
//   })
// }
// 封装与用户相差的操作
import ajax from '@/utils/request'

const login = (paramsObj) => {
  return ajax({
    method: 'post', // 接口请求的方式
    url: '/app/v1_0/authorizations', // 接口的地址
    data: paramsObj
  })
}
// 获取用户个人资料
const getProfile = () => {
  return ajax({
    method: 'get',
    url: '/app/v1_0/user/profile'
  })
}
// 编辑用户个人资料
export const changeUserInfo = (obj) => {
  return ajax({
    method: 'patch',
    url: '/app/v1_0/user/profile',
    data: obj
  })
}
// 编辑用户个人资料头像
export const changeUserAvatar = fd => {
  return ajax({
    method: 'patch',
    url: '/app/v1_0/user/photo',
    data: fd
  })
}
// 获取用户自己信息
export const getUserInfo = () => {
  return ajax({
    method: 'get',
    url: '/app/v1_0/user'
  })
}
/**
 * // 关注用户
 * @param {*} target 关注用户id
 */
export const followUser = (target) => {
  return ajax({
    method: 'post',
    url: '/app/v1_0/user/followings',
    data: {
      target
    }
  })
}
/**
 * // 取消关注用户
 * @param {*} target 目标用户（被取消关注的用户id）
 */
export const unFollowUser = (target) => {
  return ajax({
    method: 'delete',
    url: '/app/v1_0/user/followings/' + target
  })
}

export { login, getProfile }
