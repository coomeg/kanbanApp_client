import client from './client'

export default {
  login: authInfo => {
    console.log('loginする')
    return new Promise((resolve, reject) => {
      console.log('login処理')
      client.post('http://localhost:8080/api/login', authInfo)
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
      client.delete('/auth/logout', { headers: { 'x-kbn-token': token } })
        .then(() => resolve())
        .catch(err => {
          reject(new Error(err.response.data.message || err.message))
        })
    })
  }
}
