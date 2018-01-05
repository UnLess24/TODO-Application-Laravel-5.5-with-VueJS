<template>
        <div class="row">
            <div class="col-md-8 col-md-offset-2">
                <div class="panel panel-default">
                  <div class="panel-heading text-center">Todos</div>

                  <div class="panel-body">
                    <div class="input-group">
                      <input
                        type="text"
                        class="form-control"
                        placeholder="Наименование задачи"
                        @keyup.enter="create"
                        v-model="todo.name"
                      />
                      <span class="input-group-btn">
                        <button class="btn btn-success" type="button" @click="create">Добавить задачу</button>
                      </span>
                    </div>

                    <div class="todos">
                      <div class="alert alert-danger" v-if="!todos.length">Список задач пуст</div>

                      <ul class="list-unstyled">
                        <li v-for="todo in todos" :key="todo.id">
                          <div class="checkbox">
                            <label :class="{ done: todo.completed }">
                              <input
                                type="checkbox"
                                v-model="todo.completed"
                                @change="done(todo)"
                              />
                                {{ todo.name }}
                            </label>

                            <span @click="remove(todo)" class="glyphicon glyphicon-remove pull-right" aria-hidden="true"></span>
                          </div>

                        </li>
                      </ul>
                    </div>

                  </div>

                  <div class="panel-footer">
                    <span class="label label-info">Задач в списке: {{ todos.length }}</span>
                    <span class="label label-primary">На выполнение: {{ todosUnCompleted }}</span>
                    <span class="label label-success">Выполнены: {{ todosCompleted }}</span>
                  </div>
                </div>
            </div>
        </div>
</template>

<script>
    export default {
        computed: {
          todosCompleted () {
            return this.todos.filter(todo => todo.completed == 1).length;
          },

          todosUnCompleted () {
            return this.todos.filter(todo => todo.completed == 0).length;
          },
        },

        data () {
          return {
            todos: [],
            todo: {
              name: ''
            },
          }
        },

        mounted() {
          this.fetchTodos();
        },

        methods: {
          create () {
            if (this.todo.name) {
              axios.post('/api/todos', this.todo)
                .then((res) => {
                  this.todos.unshift(res.data);
                  this.todo.name = '';
                })
                .catch();
            }
          },

          remove (todo) {
            axios.delete(`/api/todos/${todo.id}`)
              .then((res) => {
                const todoIndex = this.todos.indexOf(todo);
                this.todos.splice(todoIndex, 1);
              })
              .catch(err => console.log(err));
          },

          done (todo) {
            axios.put(`/api/todos/${todo.id}`, {
              completed: todo.completed,
            })
              .then()
              .catch(err => console.log(err));
          },

          fetchTodos () {
            axios.get('/api/todos')
              .then(res => this.todos = res.data)
              .catch(err => console.log(err));
          },
        }
    }
</script>

<style>
  body, .todos {
    padding-top: 20px;
  }

  .done {
    text-decoration: line-through;
  }

  .glyphicon:hover {
    cursor: pointer;
    color: #548ce5;
  }

  .list-unstyled {
    padding-left: 10px;
    padding-right: 10px;
  }
</style>
