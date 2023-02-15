<template>
  <q-list>
    <q-item
      clickable
      v-for="todoLists in todoListsList"
      :key="todoLists.id"
      @click="selectTodoLists(todoLists.id)"
    >
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
          @click="deleteTitleTodoList(todoLists.id)"
        />
      </q-item-section>
    </q-item>
  </q-list>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
//import { ITodoLists } from './models';
import { useTodoListsListStore } from 'src/stores/todolistslist-store';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'TodoListsList',

  setup() {
    const store = useTodoListsListStore();
    const todoListsList = store.todoListsList;
    //const route = useRoute();
    const router = useRouter();

    function deleteTitleTodoList(id: number) {
      console.log('removeTItleTodoList');
      store.deleteTodoListsList(id);
      if (store.listCount == 0) {
        router.push({ path: '/' });
      }
    }

    function selectTodoLists(id: number) {
      console.log('selectTodoLists: current id= ', id);
      store.currentListId = id;
      console.log('selectTodoLists: store id= ', store.currentListId);
      router.push({ path: `/list/${id}` });
    }

    return { store, todoListsList, deleteTitleTodoList, selectTodoLists };
  },
});
</script>
