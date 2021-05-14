const TokenKey = 'token'
const UserInfo = 'userInfo'

export function getToken() {
  return window.sessionStorage.getItem(TokenKey)
}

export function setToken(token) {
  return window.sessionStorage.setItem(TokenKey, token)
}

export function removeToken() {
  window.sessionStorage.setItem(TokenKey, '')
}

export function getUserInfo() {
  const data = window.sessionStorage.getItem(UserInfo) || '{}'
  return JSON.parse(data)
}

export function setUserInfo(data) {
  if (typeof data !== 'string') data = JSON.stringify(data)
  return window.sessionStorage.setItem(UserInfo, data)
}
