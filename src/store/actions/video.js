import VideoApi from '@/api/video'

export default {
  getVideos ({ commit }) {
    return new Promise(async (resolve, reject) => {
      try {
        const { data } = await VideoApi.getVideos()
        commit('SET_VIDEOS', data)
        resolve(data)
      } catch {
        reject(new Error('Серверная ошибка.'))
      }
    })
  },
  addVideo ({ dispatch }, { name, ownerId }) {
    return new Promise(async (resolve, reject) => {
      try {
        const { data } = await VideoApi.addVideo(name, ownerId)
        dispatch('getVideos')
        resolve(data)
      } catch {
        reject(new Error('Серверная ошибка.'))
      }
    })
  }
}