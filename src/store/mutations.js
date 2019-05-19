import Vue from 'vue'

export default {
  INC_JUMPS (state) {
    state.jumps++
  },
  REMOVE_SELECTED_FAVORITE (state, id) {
    const isChannel = state.selectedFavoriteType === 'channel' && state.selectedFavorite.channel_id === id
    const isFeed = state.selectedFavoriteType === 'feed' && state.selectedFavorite.feed_id === id
    if (isChannel || isFeed) {
      state.selectedFavorite = {}
      state.selectedFavoriteType = ''
    }
  },
  RESET_MODAL (state) {
    state.modal = {}
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
  }
}