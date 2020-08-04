import dayjs from 'dayjs'
require('dayjs/locale/zh-cn')
dayjs.locale('zh-cn') // 全局使用
const relativeTime = require('dayjs/plugin/relativeTime')
dayjs.extend(relativeTime)
export const relativeFormat = val => dayjs().to(dayjs(val))
