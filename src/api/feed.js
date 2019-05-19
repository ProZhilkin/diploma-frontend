import ApiService from '@/services/api'

export default class {
  static getFeeds () {
    return ApiService.instance.get('/feeds')
  }

  static addFeed (title, url) {
    return ApiService.instance.post('/feed', { title, url })
  }

  static getFeedByUrl (url) {
    return ApiService.instance.get('/feed', { params: { url } })
  }
}