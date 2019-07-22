import * as types from './mutation-types'

export default {
  [types.AUTH_LOGIN] (state, payload) {
    state.auth = payload
  },

  [types.FETCH_ALL_TASKLIST] (state, payload) {
    let result = []
    payload.taskList.forEach(list => {
      const filterTask = payload.tasks.filter(task => {
        if (task.taskListId == list.taskListId ) {
          return task
        }
      })
      result.push({
        id: list.taskListId,
        name: list.name,
        items: filterTask,
      })
    })
    state.board.lists = result
  },

  [types.ADD_TASK] (state, payload) {
    const task = payload
    console.log(task)
    for (let i = 0; i < state.board.lists.length; i++) {
      const list = state.board.lists[i]
      console.log(list)
      if (list.id === task.taskListId) {
        list.items.push(task)
        break
      }
    }
  },

  [types.UPDATE_TASK] (state, payload) {
    const task = payload
    const taskId = payload.taskId
    const taskListId = payload.taskListId

    for (let i = 0; i < state.board.lists.length; i++) {
      const list = state.board.lists[i]
      if (list.id != taskListId) {
        continue
      }
      console.log('ここまで来た1')
      for (let j = 0; j < list.items.length; j++) {
        const item = list.items[j]
        console.log('ここまで来た2', item)
        if (item.taskId === taskId) {
          console.log('ここまで来た3')
          item.name = task.name
          item.description = task.description
          item.userId = task.userId
          break
        }
      }
    }
  },

  [types.REMOVE_TASK] (state, payload) {
    console.log('payload:::',payload)
    const { id, listId } = payload
    for (let i = 0; i < state.board.lists.length; i++) {
      const list = state.board.lists[i]
      if (list.id !== listId) { continue }
      list.items = list.items.filter(item => item.id !== id)
    }
  },

  [types.AUTH_LOGOUT] (state, payload) {
    state.auth = payload
  },

  [types.MOVE_TASK_FROM] (state, payload) {
    const { target, from, sortNoFrom } = payload
    state.dragging.target = target
    state.dragging.from = from
    state.dragging.sortNoFrom = sortNoFrom
  },

  [types.MOVE_TO_TASK] (state, payload) {
    const { target, to, sortNoTo } = payload
    state.dragging.target = target
    state.dragging.to = to
    state.dragging.sortNoTo = sortNoTo
  },

  [types.MOVE_TASK_DONE] (state, payload) {
    const { target, from, to, sortNoFrom, sortNoTo } = payload
    const getTaskList = (lists, id) => lists.find(list => list.id === id)

    // ドラッグ&ドロップ処理のための状態をリセット
    state.dragging.target = null
    state.dragging.from = null
    state.dragging.to = null

    // 移動元のタスクリストから対象タスクを取り出す
    console.log('state.board.lists:::', state.board.lists, 'from::', from)
    const fromTaskList = getTaskList(state.board.lists, from)
    const index = fromTaskList.items.findIndex(item => item.taskId === target)
    const task = fromTaskList.items[index]
    fromTaskList.items.splice(index, 1)

    // 移動先のタスクリストIDに変更
    task.taskListId = to

    // 移動先にタスクリストに対象タスクを格納
    const toTaskList = getTaskList(state.board.lists, to)
    toTaskList.items.push(task)
  }
}
