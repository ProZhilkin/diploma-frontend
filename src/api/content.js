import ApiService from '@/services/api'

export default class {
  static save (data) {
    return ApiService.instance.put('/content', data)
  }

  static getFileUrl (hash, type) {
    return `${ApiService.baseURL}/content/${type}/${hash}`
  }
}