import Vue from 'vue';
import Vuex from 'vuex';
import * as types from './mutation-types';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    todos: [],
    todo: {
      name: '',
    }
  },

  getters: {
    getTodos ({ todos }) {
      return todos;
    },
    getTodo ({ todo }) {
      return todo;
    },
  },

  mutations: {
    [types.CREATE_TODO](state, todo) {
      state.todos.unshift(todo);
    },

    [types.DONE_TODO](state, { oldTodo, newTodo }) {
      const index = state.todos.indexOf(oldTodo);
      state.todos.splice(index, 1, newTodo);
    },

    [types.FETCH_TODOS](state, todos) {
      state.todos = todos;
    },

    [types.SET_NEW_TODO_NAME](state, todoName) {
      state.todo.name = todoName;
    },

    [types.REMOVE_TODO](state, todo) {
      const todoIndex = state.todos.indexOf(todo);
      state.todos.splice(todoIndex, 1);
    },
  },

  actions: {
    createTodo ({ commit, state }) {
      if (state.todo.name) {
        axios.post('/api/todos', state.todo)
          .then((res) => {
            commit('CREATE_TODO', res.data);
            commit('SET_NEW_TODO_NAME', '');
          })
          .catch(err => console.log(err));
      }
    },

    doneTodo ({ commit }, todo) {
      axios.put(`/api/todos/${todo.id}`, {
        completed: !todo.completed,
      })
        .then(res => commit('DONE_TODO', { oldTodo: todo, newTodo: res.data }))
        .catch(err => console.log(err));
    },

    fetchTodos ({ commit }) {
      axios.get('/api/todos')
        .then(res => commit('FETCH_TODOS', res.data))
        .catch(err => console.log(err));
    },

    removeTodo ({ commit }, todo) {
      axios.delete(`/api/todos/${todo.id}`)
        .then((res) => {
          commit('REMOVE_TODO', todo);
        })
        .catch(err => console.log(err));
    },

    setNewTodoName ({ commit }, todoName) {
      commit('SET_NEW_TODO_NAME', todoName);
    },
  },

  strict: process.env.NODE_ENV !== 'production',
});

export default store;
