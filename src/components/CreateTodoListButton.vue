<template>
  <q-btn icon="mdi-plus" flat round @click="showDialog = true" />
  <q-dialog v-model="showDialog" persistent @before-show="initDialog">
    <div>
      <q-form @submit="createTodoListsList" @reset="cancelTodoListsList">
        <q-card style="min-width: 350px">
          <q-card-section>
            <div class="text-h6">Create New ToDo list</div>
          </q-card-section>
          <q-card-section class="q-pt-none">
            <q-input dense v-model="todoListsTitle" autofocus />
          </q-card-section>
          <q-card-actions align="right" class="text-primary">
            <q-btn flat label="Cancel" type="reset" />
            <q-btn flat label="Create New list" type="submit" />
          </q-card-actions>
        </q-card>
      </q-form>
    </div>
  </q-dialog>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { ITodoLists, ITodo } from './models';
import { useTodoListsListStore } from 'src/stores/todolistslist-store';

export default defineComponent({
  name: 'CreateTodoList',
  setup() {
    const showDialog = ref(false);
    const todoListsTitle = ref('');
    const store = useTodoListsListStore();

    function initDialog() {
      console.log('initDialog_list');
      todoListsTitle.value = '';
    }

    function createTodoListsList() {
      console.log('addTodoListsList title:', todoListsTitle.value);
      const todoListsList: ITodoLists = {
        id: store.nextListId,
        title: todoListsTitle.value,
        todos: <ITodo[]>[],
        nextTodoId: 0,
      };

      store.createTodoListsList(todoListsList);
      console.log('todolistslist-length:', store.listCount);
      showDialog.value = false;
    }

    function cancelTodoListsList() {
      console.log('cancelTodoListsList');
      showDialog.value = false;
    }

    return {
      store,
      showDialog,
      todoListsTitle,
      initDialog,
      createTodoListsList,
      cancelTodoListsList,
    };
  },
});
</script>
