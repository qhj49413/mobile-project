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
const getProfile = () => {
  return ajax({
    method: 'get',
    url: '/app/v1_0/user/profile'
  })
}
export { login, getProfile }

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
 * // 关注用户
 * @param {*} target 目标用户（被取消关注的用户id）
 */
export const unFollowUser = (target) => {
  return ajax({
    method: 'delete',
    url: '/app/v1_0/user/followings/' + target
  })
}
