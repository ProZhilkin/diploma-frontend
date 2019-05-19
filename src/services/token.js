const tokenId = 'token'

export default class {
  static getToken () {
    return localStorage.getItem(tokenId)
  }

  static setToken (token) {
    localStorage.setItem(tokenId, token)
  }

  static removeToken () {
    localStorage.removeItem(tokenId)
  }
}