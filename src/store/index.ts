import { createStore } from 'vuex'
import { TODO_LIST_FILTER, DELETE_TODO_ITEM } from './mutation-types'
type todoListType = {
  title: string,
  state: string,
  id: number
}[]

type filterType = {
  keyword: string,
  state: string
}
export default createStore({
  state: {
    filterTodoList: <todoListType>[],
    todoList: <todoListType>[{
      title: '好好学习，天天向上',
      state: '1',
      id: 1
    }, {
      title: '道阻且长，行则将至',
      state: '0',
      id: 2
    }],
    filterData: <filterType>{
      keyword: '',
      state: 'all'
    },
  },
  getters: {
  },
  mutations: {
    // 根据条件筛选TodoList
    [TODO_LIST_FILTER](state) {
      const newTodoList = state.todoList.filter(item => {
        if (state.filterData.state === 'all') {
          return item.title.indexOf(state.filterData.keyword) !== -1
        }
        return item.title.indexOf(state.filterData.keyword) !== -1 && item.state === state.filterData.state
      })
      state.filterTodoList = newTodoList
    },

    // 删除Todo
    [DELETE_TODO_ITEM](state, id) {
      const index = state.todoList.findIndex(item => {
        return item.id === id
      })
      state.todoList.splice(index, 1)
      this.commit(TODO_LIST_FILTER, )
    }
  },
  actions: {
  },
  modules: {
  }
})
