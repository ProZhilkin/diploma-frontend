import VkService from '@/services/vk'

export default class {
  static getVideos (params) {
    return VkService.instance.get('/video.get', { params })
  }
}