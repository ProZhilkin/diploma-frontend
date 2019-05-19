import FavoriteApi from '@/api/favorite'

export default {
  getFavoriteChannels ({ commit }) {
    return new Promise(async (resolve, reject) => {
      try {
        const { data } = await FavoriteApi.getChannels()
        commit('SET_FAVORITE_CHANNELS', data)
        resolve(data)
      } catch {
        reject(new Error('Серверная ошибка.'))
      }
    })
  },
  addFavoriteChannel ({ dispatch }, channelId) {
    return new Promise(async (resolve, reject) => {
      try {
        const { data } = await FavoriteApi.addChannel(channelId)
        dispatch('getFavoriteChannels')
        resolve(data)
      } catch {
        reject(new Error('Серверная ошибка.'))
      }
    })
  },
  removeFavoriteChannel ({ commit, dispatch }, channelId) {
    return new Promise(async (resolve, reject) => {
      try {
        const { data } = await FavoriteApi.removeChannel(channelId)
        commit('REMOVE_SELECTED_FAVORITE', channelId)
        dispatch('getFavoriteChannels')
        resolve(data)
      } catch {
        reject(new Error('Серверная ошибка.'))
      }
    })
  },
  getFavoriteFeeds ({ commit }) {
    return new Promise(async (resolve, reject) => {
      try {
        const { data } = await FavoriteApi.getFeeds()
        commit('SET_FAVORITE_FEEDS', data)
        resolve(data)
      } catch {
        reject(new Error('Серверная ошибка.'))
      }
    })
  },
  addFavoriteFeed ({ dispatch }, feedId) {
    return new Promise(async (resolve, reject) => {
      try {
        const { data } = await FavoriteApi.addFeed(feedId)
        dispatch('getFavoriteFeeds')
        resolve(data)
      } catch {
        reject(new Error('Серверная ошибка.'))
      }
    })
  },
  removeFavoriteFeed ({ commit, dispatch }, feedId) {
    return new Promise(async (resolve, reject) => {
      try {
        const { data } = await FavoriteApi.removeFeed(feedId)
        commit('REMOVE_SELECTED_FAVORITE', feedId)
        dispatch('getFavoriteFeeds')
        resolve(data)
      } catch {
        reject(new Error('Серверная ошибка.'))
      }
    })
  },
  getFavoriteVideos ({ commit }) {
    return new Promise(async (resolve, reject) => {
      try {
        const { data } = await FavoriteApi.getVideos()
        commit('SET_FAVORITE_VIDEOS', data)
        resolve(data)
      } catch {
        reject(new Error('Серверная ошибка.'))
      }
    })
  },
  addFavoriteVideo ({ dispatch }, videoId) {
    return new Promise(async (resolve, reject) => {
      try {
        const { data } = await FavoriteApi.addVideo(videoId)
        dispatch('getFavoriteVideos')
        resolve(data)
      } catch {
        reject(new Error('Серверная ошибка.'))
      }
    })
  },
  removeFavoriteVideo ({ commit, dispatch }, videoId) {
    return new Promise(async (resolve, reject) => {
      try {
        const { data } = await FavoriteApi.removeVideo(videoId)
        commit('REMOVE_SELECTED_FAVORITE', videoId)
        dispatch('getFavoriteVideos')
        resolve(data)
      } catch {
        reject(new Error('Серверная ошибка.'))
      }
    })
  }
}