const setItem = (name, token) => {
  window.sessionStorage.setItem(name, JSON.stringify(token))
}
const getItem = (name) => {
  return JSON.parse(window.sessionStorage.getItem(name))
}
const revItem = (name) => {
  window.sessionStorage.removeItem(name)
}
export { setItem, getItem, revItem }
