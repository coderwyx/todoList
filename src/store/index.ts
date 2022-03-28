import { createStore } from 'vuex'
import persistedState from 'vuex-persistedstate'
import {
  TODO_LIST_FILTER,
  DELETE_TODO_ITEM,
  CLEAR_TODO_INFO,
  ADD_TODO_ITEM,
  GET_TODO_INFO,
  EDIT_TODO_ITEM
} from './mutation-types'

type todoListType = {
  title: string,
  state: string,
  id: number | string
}

type filterType = {
  keyword: string,
  state: string
}


interface state {
  filterTodoList: todoListType[]
  todoList: todoListType[]
  filterData: filterType
  todoInfo: todoListType
}

export default createStore<state>({
  state: {
    // 筛选后的Todo列表
    filterTodoList: [],
    // Todo列表
    todoList: [{
      title: '好好学习，天天向上',
      state: '1',
      id: 1
    }, {
      title: '道阻且长，行则将至',
      state: '0',
      id: 2
    }],
    // 筛选条件
    filterData: {
      keyword: '',
      state: 'all'
    },
    // Todo详情
    todoInfo: {
      title: '',
      state: '',
      id: 0
    }
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
    },
    // 清空Todo详情表单
    [CLEAR_TODO_INFO](state) {
      state.todoInfo = {
        title: '',
        state: '',
        id: 0
      }
    },
    // 添加Todo
    [ADD_TODO_ITEM](state) {
      
      state.todoInfo.id = Date.now()
      state.todoList.push(state.todoInfo)
    },
    // 编辑Todo
    [EDIT_TODO_ITEM](state, id) {
      let index = state.todoList.findIndex(item => {
        return item.id === id
      })
      state.todoList.splice(index, 1, state.todoInfo)

    },
    // 获取Todo详情
    [GET_TODO_INFO](state, id: number | string) {

      state.todoInfo = Object.assign({}, state.todoList.find(item => {
        return item.id === id
      }))
    }
  },
  actions: {
  },
  modules: {
  },
  // 实现vuex数据持久化
  plugins: [persistedState()] //添加插件
})
