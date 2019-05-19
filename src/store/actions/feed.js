import FeedApi from '@/api/feed'

export default {
  getFeeds ({ commit }) {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await FeedApi.getFeeds()
        commit('SET_FEEDS', response.data)
        resolve(response.data)
      } catch {
        reject(new Error('Серверная ошибка.'))
      }
    })
  },
  addFeed ({ dispatch }, { title, url }) {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await FeedApi.addFeed(title, url)
        dispatch('getFeeds')
        resolve(response.data)
      } catch {
        reject(new Error('Серверная ошибка.'))
      }
    })
  },
  getFeedByUrl ({ commit }, { id, url }) {
    return new Promise(async (resolve, reject) => {
      try {
        const { data } = await FeedApi.getFeedByUrl(url)
        commit('UPDATE_FEED', { id, data })
        resolve(data)
      } catch {
        reject(new Error('Серверная ошибка.'))
      }
    })
  }
}