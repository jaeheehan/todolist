import Vue from 'vue'
import Vuex, { StoreOptions } from 'vuex'
import { Item, State } from '@/store/store.interface'
import AxiosService from '@/service/axios.service'
import { AxiosResponse } from 'axios'

Vue.use(Vuex)

const store: StoreOptions<State> = {
    state: {
        todoList: [],
        idx: 0
    },
    mutations: {
        addItem (state, item: Item) {
            item.id = state.idx
            state.todoList.push(item)
            state.idx = state.idx + 1
        },
        changeStatus (state, { id, status }: {id: number; status: 'active'| 'clear'}) {
            const index = state.todoList.findIndex((e) => e.id === id)
            state.todoList[index].status = status
        },
        removeItem (state, id: number) {
            const index = state.todoList.findIndex((e) => e.id === id)
            if (index !== -1) {
                state.todoList.splice(index, 1)
            }
        },
        setTodoList (state, todoList: Item[]) {
            state.todoList = todoList
        }
    },
    actions: {
        async initData ({ commit }) {
            const response: AxiosResponse<{todoList: Item[]}> =
        await AxiosService.instance.get('/data.json')
            commit('setTodoList', response.data.todoList)
        }
    },
    getters: {
        allTodoList: (state) => state.todoList,
        activeTodoList: (state) => {
            return state.todoList.filter((item: Item) => item.status === 'active')
        },
        clearTodoList: (state) => {
            return state.todoList.filter((item: Item) => item.status === 'clear')
        }
    }
}

export default new Vuex.Store(store)
