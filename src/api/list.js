import client from './client'
import * as api from '../store/actions'

export default {
  fetch: token => {
    return new Promise((resolve, reject) => {
      client.post(`${api.api_url}/bord`)
        .then(res => resolve({ data: res.data }))
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

  searchTasks: (form) => {
    return new Promise((resolve, reject) => {
      client.post(`${api.api_url}/searchTasks`, form)
        .then(res => {
          console.log('searchTasks::', res)
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
