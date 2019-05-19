import ContentApi from '@/api/content'

export default {
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