<template>
  <q-list>
    <q-list-title class="text-h6"> Title </q-list-title>
    <q-item v-for="todo in todos" :key="todo.id">
      <q-item-section side>
        <q-checkbox v-model="todo.isFinished" />
      </q-item-section>
      <q-item-section> {{ todo.content }} </q-item-section>
      <q-item-section side>
        <q-btn
          flat
          round
          size="sm"
          icon="mdi-delete"
          @click="removeTodoList(todo.id)"
        />
      </q-item-section>
    </q-item>
  </q-list>
</template>

<script lang="ts">
import { defineComponent, ref, toRef, reactive } from 'vue';
import { Todo } from './models';
import { useTodoListsStore } from 'src/stores/todos-store';
// function useDisplayTodo(todos: Ref<Todo[]>) {

// }

export default defineComponent({
  name: 'TodoList',
  // props: {
  //   todos: {
  //     type: Array as PropType<Todo[]>,
  //     default: () => [],
  //   },
  // },
  setup() {
    const store = useTodoListsStore();
    const todos = store.todos;

    function removeTodoList(id: number) {
      console.log('remove id:', id);
      store.removeTodoList(id);
    }

    return { todos, removeTodoList };
  },
});
</script>
