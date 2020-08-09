import axios from '@/utils/request'
/**
 * 获取用户评论信息
 * @param {*} type 评论类型，a-对文章(article)的评论，c-对评论(comment)的回复
 * @param {*} source 源id，文章id或评论id
 * @param {*} offset 获取评论数据的偏移量，值为评论id，表示从此id的数据向后取，不传表示从第一页开始读取数据
 */
export const getComments = (source, offset) => {
  return axios({
    method: 'get',
    url: '/app/v1_0/comments',
    params: {
      type: 'a',
      source,
      offset
    }
  })
}

/**
 * // 添加评论
 * @param {*} target 评论的目标id（评论文章即为文章id，对评论进行回复则为评论id）
 * @param {*} content 评论内容
 * @param {*} art_id 文章id，对评论内容发表回复时，需要传递此参数，表明所属文章id。对文章进行评论，不要传此参数。
 */
export const addComments = (target, content) => {
  return axios({
    method: 'post',
    url: '/app/v1_0/comments',
    data: {
      target,
      content
    }
  })
}
/**
/**
 * 获取用户回复信息
 * @param {*} type 评论类型，a-对文章(article)的评论，c-对评论(comment)的回复
 * @param {*} source 源id，文章id或评论id
 * @param {*} offset 获取评论数据的偏移量，值为评论id，表示从此id的数据向后取，不传表示从第一页开始读取数据
 */
export const getCommentsReply = (source, offset) => {
  return axios({
    method: 'get',
    url: '/app/v1_0/comments',
    params: {
      type: 'c',
      source,
      offset
    }
  })
}
