<template>
  <div class="text-h6" v-if="!todosList">Make your Todo List</div>
  <q-list v-else>
    <div class="text-h6">{{ todosList.title }}</div>

    <q-item v-for="todo in todosList.todos" :key="todo.id">
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
import { defineComponent, computed, ref, toRef, reactive } from 'vue';
import { useTodoListsListStore } from 'src/stores/todolistslist-store';
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
    // const store = useTodoListsStore();
    // const todos = store.todos;
    const store = useTodoListsListStore();
    const currentListId = computed(() => store.currentListId);
    const todosList = computed(() => store.currentTodoLists);

    function removeTodoList(id: number) {
      console.log('remove id:', id);
      store.removeTodoFromTodoList(store.currentListId, id);
    }
    console.log('todos: ', todosList);
    return { store, todosList, currentListId, removeTodoList };
  },
});
</script>
