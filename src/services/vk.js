import axios from 'axios'
import jsonpAdapter from 'axios-jsonp'

export default class VkService {
  static get baseURL () {
    return 'https://api.vk.com/method'
  }

  static get instance () {
    return axios.create({
      adapter: jsonpAdapter,
      baseURL: VkService.baseURL
    })
  }
}