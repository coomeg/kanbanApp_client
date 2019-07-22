import * as types from './mutation-types'
import { Auth, List, Task, Users } from '../api'
 const devapi = 'http://localhost:8080/api'
 const prodapi =  'http://production.com/api'

export const api_url = process.env.NODE_ENV === 'production'? prodapi : devapi

export default {
  login: ({ commit }, authInfo) => {
    return Auth.login(authInfo)
      .then(({ token, userId, name }) => {
        localStorage.setItem('token', token)
        commit(types.AUTH_LOGIN, { token, userId, name })
      })
      .catch(err => { throw err })
  },

  getUser: ({ commit }) => {
    return Users.getUser()
      .then((data) => {
        return {
          token: data.token,
          userId: data.userId,
          name: data.name,
          email: data.email }
      })
      .catch(err => { throw err })
  },

  getUserLike: ({ commit }, name) => {
    return Users.getUserLike(name)
      .then((data) => {
        return data.map(param => {
          return {value: param.name, key: param.userId}
        })
      })
      .catch(err => { throw err })
  },

  createUser: ({ commit }, userInfo) => {
    return Users.create(userInfo)
      .then(({ token, userId }) => {
        localStorage.setItem('token', token)
        commit(types.AUTH_LOGIN, { token, userId, name })
      })
      .catch(err => { throw err })
  },

  editUser: ({ commit }, userInfo) => {
    return Users.update(userInfo)
      .then((data) => {
        localStorage.setItem('token', data.token)
        commit(types.AUTH_LOGIN, { token:data.token, userId: data.userId, name: data.name })
      })
      .catch(err => { throw err })
  },

  fetchLists: ({ commit, state }) => {
    return List.fetch(state.auth.token)
      .then((res) => {
        console.log(res)
        commit(types.FETCH_ALL_TASKLIST, res.data)
      })
      .catch(err => { throw err })
  },

  fetchTaskLists: ({ commit }) => {
    return List.getTaskListAll()
      .then((res) => {
        return res.data
      })
      .catch(err => { throw err })
  },

  searchTasks: ({ commit }, form) => {
    return List.searchTasks(form)
      .then((data) => {
        return data
      })
      .catch(err => { throw err })
  },

  updateTaskLists: ({ commit }, data) => {
    return List.updateTaskLists(data)
      .then((res) => {
        return res
      })
      .catch(err => { throw err })
  },

  addTask: ({ commit, state }, { listId, name }) => {
    return Task.add(state.auth.token, { listId, name })
      .then((task) => {
        commit(types.ADD_TASK, task)
      })
      .catch(err => { throw err })
  },

  updateTask: ({ commit, state }, task) => {
    return Task.update(task)
      .then(() => {
        commit(types.UPDATE_TASK, task)
      })
      .catch(err => { throw err })
  },

  removeTask: ({ commit, state }, data) => {
    return Task.remove(state.auth.token, data)
      .then(() => {
        commit(types.REMOVE_TASK, data)
      })
      .catch(err => { throw err })
  },

  moveTaskFrom: ({ commit, state }, { id, listId, sortNoFrom }) => {
    console.log('sortNoFrom::', sortNoFrom)
    commit(types.MOVE_TASK_FROM, { target: id, from: listId, sortNoFrom: sortNoFrom })
    return Promise.resolve()
  },

  moveToTask: ({ commit, state }, { id, listId, sortNoTo }) => {
    console.log('sortNoTo::', sortNoTo)
    commit(types.MOVE_TO_TASK, { target: id, to: listId, sortNoTo: sortNoTo })
    return Promise.resolve()
  },

  performTaskMoving: ({ commit, state }) => {
    const { target, from, to, sortNoFrom, sortNoTo } = state.dragging
    console.log('state.dragging', state.dragging)
    return Task.move(state.auth.token, { id: target, from, to, sortNoFrom, sortNoTo })
      .then(() => {
        commit(types.MOVE_TASK_DONE, { target, from, to, sortNoFrom, sortNoTo })
      })
      .catch(err => { throw err })
  },

  logout: ({ commit, state }) => {
    return Auth.logout(state.auth.token)
      .then(() => {
        localStorage.removeItem('token')
        commit(types.AUTH_LOGOUT, { token: null, userId: null })
      })
      .catch(err => { throw err })
  }
}
