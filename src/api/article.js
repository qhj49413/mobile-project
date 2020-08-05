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
export const disLikes = (id) => {
  return ajax({
    method: 'post',
    url: '/app/v1_0/article/dislikes',
    data: {
      target: id
    }
  })
}
export const ajaxReport = (id, type) => {
  return ajax({
    method: 'post',
    url: '/app/v1_0/article/reports',
    data: {
      target: id,
      type
    }
  })
}
