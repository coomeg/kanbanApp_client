import client from './client'
import * as api from '../store/actions'

export default {

  getUser: () => {
    console.log('ユーザ取得')
    return new Promise((resolve, reject) => {
      client.post(`${api.api_url}/getUser`)
        .then(res => {
          console.log("data:", res)
          resolve(res.data)
        })
        .catch(err => {
          reject(new Error(err.response.data.message || err.message))
        })
    })
  },

  getUserLike: (name) => {
    console.log('ユーザ名検索', name)
    return new Promise((resolve, reject) => {
      client.post(`${api.api_url}/getUserLike`, {name: name})
        .then(res => {
          console.log("data:", res)
          resolve(res.data)
        })
        .catch(err => {
          reject(new Error(err.response.data.message || err.message))
        })
    })
  },

  create: userInfo => {
    console.log('ユーザ登録')
    return new Promise((resolve, reject) => {
      // client.post('http://localhost:8080/api/users', userInfo)
      client.post(`${api.api_url}/users`, userInfo)
        .then(res => {
          console.log(res)
          resolve(res.data)
        })
        .catch(err => {
          reject(new Error(err.response.data.message || err.message))
        })
    })
  },

  update: userInfo => {
    console.log('ユーザ更新')
    return new Promise((resolve, reject) => {
      console.log('api_url:', api.api_url)
      client.put(`${api.api_url}/users`, userInfo)
        .then(res => {
          console.log(res)
          resolve({ token: res.data.token, userId: res.data.userId, name: res.data.name })
        })
        .catch(err => {
          reject(new Error(err.response.data.message || err.message))
        })
    })
  }
}
