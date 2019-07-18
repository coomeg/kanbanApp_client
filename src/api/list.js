import client from './client'
import * as api from '../store/actions'

export default {
  fetch: token => {
    return new Promise((resolve, reject) => {
      client.get('/lists', { headers: { 'x-kbn-token': token } })
        .then(res => resolve({ lists: res.data.lists }))
        .catch(err => {
          reject(new Error(err.response.data.message || err.message))
        })
    })
  },

  getTaskListAll: () => {
    return new Promise((resolve, reject) => {
      client.post(`${api.api_url}/getTaskListAll`)
        .then(res => {
          console.log(res.data)
          resolve({ data: res.data })
        })
        .catch(err => {
          reject(new Error(err.response.data.message || err.message))
        })
    })
  },

  updateTaskLists: (data) => {
    return new Promise((resolve, reject) => {
      client.put(`${api.api_url}/taskLists`, data)
        .then(res => resolve(res))
        .catch(err => {
          reject(new Error(err.response.data.message || err.message))
        })
    })
  }
}
