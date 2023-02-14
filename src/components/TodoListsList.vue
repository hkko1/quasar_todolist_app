<template>
  <q-list>
    <q-item clickable v-for="todoLists in todoListsList" :key="todoLists.id">
      <q-item-section side>
        <q-icon color="red-15" name="mdi-emoticon-cool-outline" />
      </q-item-section>
      <q-item-section class="text-grey-9">
        {{ todoLists.title }} ({{ todoLists.todos.length }})
      </q-item-section>
      <q-item-section side>
        <q-btn
          flat
          round
          size="sm"
          icon="mdi-delete"
          @click="removeTitleTodoList(todoLists.id)"
        />
      </q-item-section>
    </q-item>
  </q-list>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { ITodoLists } from './models';
import { useTodoListsListStore } from 'src/stores/todolistslist-store';

export default defineComponent({
  name: 'TodoListsList',

  setup() {
    const store = useTodoListsListStore();
    const todoListsList = store.todoListsList;

    function removeTitleTodoList(id: number) {
      console.log('removeTItleTodoList');
      store.removeTodoListsList(id);
    }

    return { store, todoListsList, removeTitleTodoList };
  },
});
</script>
