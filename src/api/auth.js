import client from './client'
import * as api from '../store/actions'

export default {
  login: authInfo => {
    console.log('loginする')
    return new Promise((resolve, reject) => {
      console.log('login処理')
      client.post(`${api.api_url}/login`, authInfo)
        .then(res => {
          console.log(res)
          resolve({ token: res.data.token, userId: res.data.userId, name: res.data.name })
        })
        .catch(err => {
          reject(new Error(err.response.data.message || err.message))
        })
    })
  },

  logout: token => {
    return new Promise((resolve, reject) => {
      client.post(`${api.api_url}/logout`, { headers: { 'x-kbn-token': token } })
        .then(() => resolve())
        .catch(err => {
          reject(new Error(err.response.data.message || err.message))
        })
    })
  }
}
