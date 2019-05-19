import ApiService from '@/services/api'

export default class {
  static login (user) {
    return ApiService.instance.post('/user/login', user)
  }

  static register (user) {
    return ApiService.instance.post('/user/register', user)
  }

  static logout () {
    return ApiService.instance.delete('/user/logout')
  }

  static getUser () {
    return ApiService.instance.get('/user')
  }
}