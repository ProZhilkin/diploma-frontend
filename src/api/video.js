import ApiService from '@/services/api'

export default class {
  static getVideos () {
    return ApiService.instance.get('/videos')
  }

  static addVideo (name, ownerId) {
    return ApiService.instance.post('/video', { name, owner_id: ownerId })
  }
}