import client from './client'

export default {
  create: userInfo => {
    console.log('ユーザ登録')
    return new Promise((resolve, reject) => {
      client.post('http://localhost:8080/api/users', userInfo)
        .then(res => {
          console.log(res)
          resolve({ token: res.data.token, userId: res.data.userId })
        })
        .catch(err => {
          reject(new Error(err.response.data.message || err.message))
        })
    })
  },

  update: userInfo => {
    console.log('ユーザ更新')
    return new Promise((resolve, reject) => {
      client.put('http://localhost:8080/api/users', userInfo)
        .then(res => {
          console.log(res)
          resolve({ token: res.data.token, userId: res.data.userId })
        })
        .catch(err => {
          reject(new Error(err.response.data.message || err.message))
        })
    })
  }
}
