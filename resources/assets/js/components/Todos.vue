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
                        @change="setNewTodoName"
                        :value="todoName"
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
                                :checked="todo.completed"
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
          todos () {
            return this.$store.getters.getTodos;
          },

          todoName () {
              return this.$store.getters.getTodo.name;
          },

          todosCompleted () {
            return this.$store.getters.getTodos.filter(todo => todo.completed == 1).length;
          },

          todosUnCompleted () {
            return this.$store.getters.getTodos.filter(todo => todo.completed == 0).length;
          },
        },

        mounted() {
          this.$store.dispatch('fetchTodos');
        },

        methods: {

          create () {
            this.$store.dispatch('createTodo');
          },

          done (todo) {
            this.$store.dispatch('doneTodo', todo);
          },

          remove (todo) {
            this.$store.dispatch('removeTodo', todo);
          },

          setNewTodoName (event) {
            this.$store.dispatch('setNewTodoName', event.target.value);
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
