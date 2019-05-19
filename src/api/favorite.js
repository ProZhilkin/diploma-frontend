import ApiService from '@/services/api'

export default class {
  static addChannel (channelId) {
    return ApiService.instance.post('/favorite/channel', { channel_id: channelId })
  }

  static removeChannel (channelId) {
    return ApiService.instance.delete('/favorite/channel', {
      data: { channel_id: channelId }
    })
  }

  static getChannels () {
    return ApiService.instance.get('/favorite/channels')
  }

  static addFeed (feedId) {
    return ApiService.instance.post('/favorite/feed', { feed_id: feedId })
  }

  static removeFeed (feedId) {
    return ApiService.instance.delete('/favorite/feed', { 
      data: { feed_id: feedId }
    })
  }

  static getFeeds () {
    return ApiService.instance.get('/favorite/feeds')
  }

  static addVideo (videoId) {
    return ApiService.instance.post('/favorite/video', { video_id: videoId })
  }

  static removeVideo (videoId) {
    return ApiService.instance.delete('/favorite/video', {
      data: { video_id: videoId }
    })
  }

  static getVideos () {
    return ApiService.instance.get('/favorite/videos')
  }
}