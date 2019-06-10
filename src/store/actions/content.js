import ContentApi from '@/api/content'

export default {
  saveVk ({ commit }, params) {
    return new Promise(async (resolve, reject) => {
      try {
        const { data } = await ContentApi.saveVk(params)
        if (data.status) {
          resolve(data.file)
        } else {
          reject(new Error('Произошла ошибка при скачивании.'))
        }
      } catch (error) {
        reject(new Error('Серверная ошибка.'))
      }
    })
  },
  saveYoutube ({ commit }, params) {
    return new Promise(async (resolve, reject) => {
      try {
        const { data } = await ContentApi.saveYoutube(params)
        if (data.status) {
          resolve(data.file)
        } else {
          reject(new Error('Произошла ошибка при скачивании.'))
        }
      } catch (error) {
        reject(new Error('Серверная ошибка.'))
      }
    })
  }
}