<!-- Detail todo lists on rightside page -->
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
import { useRoute } from 'vue-router';

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
    const route = ref(useRoute());
    /* const currentListId = computed(() => store.currentListId); */
    /* const todosList = computed(() => store.currentTodoLists); */

    const currentListId = computed(() =>
      parseInt(route.value.params.id as string)
    );

    const todosList = computed(() =>
      store.todoListsList.find((list) => list.id === currentListId.value)
    );

    function removeTodoList(id: number) {
      console.log('remove id:', id);
      store.removeTodoFromTodoList(currentListId.value, id);
    }
    console.log('todos: ', todosList);
    return { store, todosList, currentListId, removeTodoList };
  },
});
</script>
