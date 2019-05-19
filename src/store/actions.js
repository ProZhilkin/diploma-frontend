import ChannelApi from '@/api/channel'
import ContentApi from '@/api/content'
import FavoriteApi from '@/api/favorite'
import FeedApi from '@/api/feed'
import UserApi from '@/api/user'
import TokenService from '@/services/token'

export default {
  login ({ commit }, user) {
    return new Promise(async (resolve, reject) => {
      try {
        const { data } = await UserApi.login(user)
        if (data.status) {
          TokenService.setToken(data.token)
          commit('SET_TOKEN', data.token)
          resolve(data)
        } else {
          reject(new Error('Вы ввели неверный почтовый ящик или пароль.'))
        }
      } catch {
        reject(new Error('Произошла серверная ошибка.'))
      }
    })
  },
  register ({ commit }, user) {
    return new Promise(async (resolve, reject) => {
      try {
        const { data } = await UserApi.register(user)
        if (data.status) {
          commit('SET_REGISTRATION_STATUS', true)
          resolve(data.user)
        } else {
          reject(new Error('Аккаунт с таким почтовым ящиком уже зарегистрирован в чате.'))
        }
      } catch {
        reject(new Error('Произошла серверная ошибка.'))
      }
    })
  },
  logout ({ commit }) {
    return new Promise(async (resolve, reject) => {
      try {
        await UserApi.logout()
        TokenService.removeToken()
        commit('SET_TOKEN', null)
        resolve()
      } catch {
        reject(new Error('Произошла серверная ошибка.'))
      }
    })
  },
  getUser ({ commit }) {
    return new Promise(async (resolve, reject) => {
      try {
        const { data } = await UserApi.getUser()
        commit('SET_USER', data)
        resolve(data)
      } catch {
        reject(new Error('Ошибка авторизации.'))
      }
    })
  },
  getChannels ({ commit }) {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await ChannelApi.getChannels()
        commit('SET_CHANNELS', response.data)
        resolve(response.data)
      } catch {
        reject(new Error('Серверная ошибка.'))
      }
    })
  },
  addChannel ({ dispatch }, channelId) {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await ChannelApi.addChannel(channelId)
        dispatch('getChannels')
        resolve(response.data)
      } catch {
        reject(new Error('Серверная ошибка.'))
      }
    })
  },
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
  },
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
  saveContent ({ commit }, params) {
    return new Promise(async (resolve, reject) => {
      try {
        const { data } = await ContentApi.save(params)
        if (data.status) {
          resolve(data.file)
        } else {
          reject(new Error('Произошла ошибка при скачивании.'))
        }
      } catch {
        reject(new Error('Серверная ошибка.'))
      }
    })
  }
}