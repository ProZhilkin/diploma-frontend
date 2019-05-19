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
  }
}