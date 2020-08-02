const setItem = (name, token) => {
  window.sessionStorage.setItem(name, JSON.stringify(token))
}
const getItem = () => {
  return JSON.parse(window.sessionStorage.getItem('tokenInfo'))
}
const revItem = () => {
  window.sessionStorage.removeItem('tokenInfo')
}
export { setItem, getItem, revItem }
