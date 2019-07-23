export default {
  getTaskById: state => id => {
    const tasks = []
    state.board.lists.forEach(list => {
      tasks.push(...list.items)
    })
    return tasks.find(task => task.taskId === id)
  }
}
