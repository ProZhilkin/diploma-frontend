import ApiService from '@/services/api'

export default class {
  static getChannels () {
    return ApiService.instance.get('/channels')
  }

  static addChannel (channelId) {
    return ApiService.instance.post('/channel', { channel_id: channelId })
  }
}