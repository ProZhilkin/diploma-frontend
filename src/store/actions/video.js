import VideoApi from '@/api/video'

export default {
  getVideos ({ commit }) {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await VideoApi.getVideos()
        commit('SET_VIDEOS', response.data)
        resolve(response.data)
      } catch {
        reject(new Error('Серверная ошибка.'))
      }
    })
  }
}