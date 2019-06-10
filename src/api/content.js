import ApiService from '@/services/api'

export default class {
  static saveVk (data) {
    return ApiService.instance.put('/content/vk', data)
  }

  static saveYoutube (data) {
    return ApiService.instance.put('/content/youtube', data)
  }

  static getFileUrl (service, type, value) {
    return `${ApiService.baseURL}/content/${service}/${type}/${value}`
  }
}