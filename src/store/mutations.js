import Vue from 'vue'

export default {
  INC_JUMPS (state) {
    state.jumps++
  },
  REMOVE_SELECTED_FAVORITE (state, id) {
    const isChannel = state.selectedFavoriteType === 'channel' && state.selectedFavorite.channel_id === id
    const isFeed = state.selectedFavoriteType === 'feed' && state.selectedFavorite.feed_id === id
    const isVideo = state.selectedFavoriteType === 'video' && state.selectedFavorite.video_id === id
    if (isChannel || isFeed || isVideo) {
      state.selectedFavorite = {}
      state.selectedFavoriteType = ''
    }
  },
  RESET_MODAL (state) {
    state.modal.name = ''
  },
  SELECT_FAVORITE (state, { favorite, type }) {
    state.selectedFavorite = favorite
    state.selectedFavoriteType = type
  },
  SET_CHANNELS (state, channels) {
    state.channels = channels.map(channel => {
      return { ...channel, info: {}, items: [] }
    })
  },
  SET_FAVORITE_CHANNELS (state, channels) {
    Vue.set(state.favorite, 'channels', channels)
  },
  SET_FAVORITE_FEEDS (state, feeds) {
    Vue.set(state.favorite, 'feeds', feeds)
  },
  SET_FAVORITE_VIDEOS (state, videos) {
    Vue.set(state.favorite, 'videos', videos)
  },
  SET_FEEDS (state, feeds) {
    state.feeds = feeds.map(feed => {
      return { ...feed, data: {} }
    })
  },
  SET_MODAL (state, modal) {
    state.modal = modal
  },
  SET_TOKEN (state, token) {
    state.token = token
  },
  SET_VIDEOS (state, videos) {
    state.videos = videos
  },
  SET_USER (state, user) {
    state.user = user
  },
  UPDATE_CHANNEL (state, { id, info, items }) {
    state.channels.forEach(channel => {
      if (channel.id === id) {
        channel.info = info
        channel.items = items.filter(item => item.type === 'video')
      }
    })
  },
  UPDATE_FEED (state, { id, data }) {
    state.feeds.forEach(feed => {
      if (feed.id === id) feed.data = data
    })
  },
  UPDATE_VIDEO (state, { id, items }) {
    state.videos.forEach(video => {
      if (video.id === id) Vue.set(video, 'items', items)
    })
  }
}