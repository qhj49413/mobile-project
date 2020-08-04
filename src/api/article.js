import ajax from '@/utils/request'
export const getArticle = (channelid, timestamp) => {
  return ajax({
    method: 'get',
    url: '/app/v1_1/articles',
    params: {
      channel_id: channelid,
      timestamp,
      with_top: 1
    }
  })
}
