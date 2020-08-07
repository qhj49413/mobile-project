import ajax from '@/utils/request'
// 获取用户频道列表
export const getChannel = () => {
  return ajax({
    method: 'get',
    url: '/app/v1_0/user/channels'
  })
}
// 获取全部频道列表
export const getAllChannel = () => {
  return ajax({
    method: 'get',
    url: '/app/v1_0/channels'
  })
}
// 批量删除用户频道列表
export const delChannels = (id) => {
  return ajax({
    method: 'delete',
    url: '/app/v1_0/user/channels',
    data: {
      channels: [id]
    }
  })
}
// 批量修改用户频道列表（重置式）
export const subscription = (obj) => {
  return ajax({
    method: 'put',
    url: '/app/v1_0/user/channels',
    data: {
      channels: obj
    }
  })
}
