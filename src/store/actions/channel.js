import ChannelApi from '@/api/channel'

export default {
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
  }
}