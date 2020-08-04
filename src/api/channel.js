import ajax from '@/utils/request'
export const getChannel = () => {
  return ajax({
    method: 'get',
    url: '/app/v1_0/user/channels'
  })
}
