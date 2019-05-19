import ApiSerivce from '@/services/api'

export default class {
  static getVideos () {
    return ApiSerivce.instance.get('/videos')
  }
}