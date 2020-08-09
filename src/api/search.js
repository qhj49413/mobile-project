import ajax from '@/utils/request'
// 获取搜索结果
export const getSearchList = (q) => {
  return ajax({
    method: 'GET',
    url: '/app/v1_0/suggestion',
    params: {
      q
    }
  })
}
