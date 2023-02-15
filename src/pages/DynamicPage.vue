<template>
  <q-page class="row page-bg">
    <!-- <q-card class="col-xs-9"> -->

    <div class="col-xs-12">
      <todo-list />
      <q-page-sticky position="bottom-right" :offset="[18, 18]">
        <q-btn
          fab
          style="margin-bottom: 100 px"
          class="q-ml-lg"
          color="secondary"
          icon="mdi-plus"
          @click="showDialog = true"
        />
        <q-dialog v-model="showDialog" persistent @before-show="initDialog">
          <div>
            <q-form @submit="addTodoList" @reset="cancelTodoList">
              <q-card style="min-width: 350px">
                <q-card-section>
                  <div class="text-h6">Add new ToDo</div>
                </q-card-section>
                <q-card-section class="q-pt-none">
                  <q-input dense v-model="todo" autofocus />
                </q-card-section>
                <q-card-actions align="right" class="text-primary">
                  <q-btn flat label="Cancel" type="reset" />
                  <q-btn flat label="Add Todo" type="submit" />
                </q-card-actions>
              </q-card>
            </q-form>
          </div>
        </q-dialog>
      </q-page-sticky>
    </div>
  </q-page>
</template>

<script lang="ts">
import { Todo, Meta } from 'components/models';
import { defineComponent, ref } from 'vue';
import TodoList from 'components/TodoList.vue';
import { useTodoListsStore } from 'src/stores/todos-store';

export default defineComponent({
  name: 'IndexPage',
  components: {
    TodoList,
  },
  setup() {
    const search = ref('');
    const showDialog = ref(false);
    const todo = ref('');
    const store = useTodoListsStore();

    function initDialog() {
      console.log('indexPage: initialize Dialog----');
      todo.value = '';
    }

    function addTodoList() {
      console.log(todo.value);

      const item: Todo = {
        id: store.nextId,
        content: todo.value,
        isFinished: false,
      };

      store.addTodoList(item);
      showDialog.value = false;
    }

    function cancelTodoList() {
      showDialog.value = false;
    }

    return {
      showDialog,
      search,
      initDialog,
      addTodoList,
      cancelTodoList,
      prompt,
      todo,
    };
  },
});
</script>
