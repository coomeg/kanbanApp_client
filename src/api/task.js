import client from './client'
import * as api from '../store/actions'

export default {
  add: (token, { name, listId }) => {
    return new Promise((resolve, reject) => {
      console.log(listId)
      client.post(`${api.api_url}/createTask`, { name, taskListId: listId })
        .then(res => resolve(res.data))
        .catch(err => {
          reject(new Error(err.response.data.message || err.message))
        })
    })
  },

  update: (task) => {
    return new Promise((resolve, reject) => {
      console.log('Task::::', task)
      client.put(`${api.api_url}/tasks`, task)
        .then(() => resolve())
        .catch(err => {
          reject(new Error(err.response.data.message || err.message))
        })
    })
  },

  remove: (token, data) => {
    return new Promise((resolve, reject) => {
      client.post(`${api.api_url}/deleteTasks`, data)
        .then(() => resolve())
        .catch(err => {
          reject(new Error(err.response.data.message || err.message))
        })
    })
  },

  move: (token, { id, from, to, sortNoFrom, sortNoTo }) => {
    console.log('ID:',id,'from:',from,'to',to)
    return new Promise((resolve, reject) => {
      client.put(`${api.api_url}/taskMove`, { taskId: id, taskListIdFrom: from, taskListIdTo: to, sortNoFrom, sortNoTo})
        .then(() => resolve())
        .catch(err => {
          reject(new Error(err.response.data.message || err.message))
        })
    })
  }
}
