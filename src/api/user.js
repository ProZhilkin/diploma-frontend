import ApiSerivce from '@/services/api'

export default class {
  static login (user) {
    return ApiSerivce.instance.post('/user/login', user)
  }

  static register (user) {
    return ApiSerivce.instance.post('/user/register', user)
  }

  static logout () {
    return ApiSerivce.instance.delete('/user/logout')
  }

  static getUser () {
    return ApiSerivce.instance.get('/user')
  }
}