import axios from 'axios'
import TokenService from './token'

export default class ApiService {
  static get baseURL () {
    return 'http://localhost:3333'
  }

  static get instance () {
    return axios.create({
      baseURL: ApiService.baseURL,
      headers: { Authorization: `Bearer ${TokenService.getToken()}` }
    })
  }
}