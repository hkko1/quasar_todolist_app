<template>
  <q-page class="row page-bg">
    <!-- <q-card class="col-xs-9"> -->

    <div class="text-h6" v-if="!currentTodoLists">Make your Todo List!</div>
    <div class="col-xs-12" v-else>
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
import { ITodo } from 'components/models';
import { defineComponent, ref, computed } from 'vue';
import TodoList from 'components/TodoList.vue';
//import { useTodoListsStore } from 'src/stores/todos-store';
import { useTodoListsListStore } from 'src/stores/todolistslist-store';
import { useRoute } from 'vue-router';

export default defineComponent({
  name: 'IndexPage',
  components: {
    TodoList,
  },
  setup() {
    const search = ref('');
    const showDialog = ref(false);
    const todo = ref('');
    const store = useTodoListsListStore();
    const route = ref(useRoute());

    const todoListsId = computed(() =>
      parseInt(route.value.params.id as string)
    );

    const currentTodoLists = computed(() =>
      store.todoListsList.find((list) => list.id === todoListsId.value)
    );

    function initDialog() {
      console.log('indexPage: initialize Dialog----');
      todo.value = '';
    }

    function addTodoList() {
      console.log(todo.value);

      //const todoListsId = parseInt(route.value.params.id as string);

      //const currentTodoLists = store.currentTodoLists;

      const id = currentTodoLists.value
        ? currentTodoLists.value.nextTodoId
        : -1;
      const item: ITodo = {
        //id: store.currentTodoLists ? store.currentTodoLists.nextTodoId : -1,
        id,
        content: todo.value,
        isFinished: false,
      };

      //store.addTodoIntoTodoList(store.currentListId, item);
      console.log(
        'addTodoList-todoListsId=',
        todoListsId
        // '_storeCurrentTodoId: ',
        // store.currentListId
      );
      store.addTodoIntoTodoList(todoListsId.value, item);
      showDialog.value = false;
    }

    function cancelTodoList() {
      showDialog.value = false;
    }

    return {
      store,
      showDialog,
      search,
      currentTodoLists,
      initDialog,
      addTodoList,
      cancelTodoList,
      prompt,
      todo,
    };
  },
});
</script>
