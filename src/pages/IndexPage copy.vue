<template>
  <q-page class="row page-bg">
    <q-card class="col-xs-9">
      <q-toolbar>
        <q-input
          dense
          placeholder="Search"
          borderless
          class="full-width"
          :model-value="search"
        >
          <template #append>
            <q-icon name="mdi-magnify" />
          </template>
        </q-input>
      </q-toolbar>
      <!-- <todo-list bordered :todos="todos" /> -->
      <todo-list bordered />
      <!-- <example-component
        title="Example component -hkko"
        active
        :todos="todos"
        :meta="meta"
      ></example-component> -->
    </q-card>
    <div class="col-xs-3">
      <q-toolbar class="bg-primary">
        <q-btn
          fab
          style="margin-bottom: -42px"
          class="q-ml-lg"
          color="secondary"
          icon="mdi-plus"
          @click="prompt = true"
        />
        <q-dialog v-model="prompt" persistent>
          <q-card style="min-width: 350px">
            <q-card-section>
              <div class="text-h6">Add new ToDo list</div>
            </q-card-section>
            <q-card-section class="q-pt-none">
              <q-input
                dense
                v-model="todo"
                autofocus
                @keyup.enter="prompt = false"
              />
            </q-card-section>
            <q-card-actions align="right" class="text-primary">
              <q-btn flat label="Cancel" v-close-popup />
              <q-btn flat label="Add" v-close-popup @click="addTodoList" />
            </q-card-actions>
          </q-card>
        </q-dialog>
      </q-toolbar>
    </div>
  </q-page>
</template>

<script lang="ts">
// import { Todo, Meta } from 'components/models';
// import ExampleComponent from 'components/ExampleComponent.vue';
import { defineComponent, ref, reactive } from 'vue';
// import CreateTodoButton from 'components/CreateTodoButton.vue';
// import InputDialog from 'components/InputDialog.vue';
import TodoList from 'components/TodoList.vue';
import { useTodoListsStore } from 'src/stores/todos-store';

export default defineComponent({
  name: 'IndexPage',
  components: {
    // ExampleComponent,
    // CreateTodoButton,
    // InputDialog,
    TodoList,
  },
  setup() {
    // const todos = ref<Todo[]>([
    //   {
    //     id: 1,
    //     content: 'Go Shopping',
    //   },
    //   {
    //     id: 2,
    //     content: 'Homework',
    //   },
    // ]);
    // const meta = ref<Meta>({
    //   totalCount: 1200,
    // });

    const search = ref('');
    const showDialog = ref(false);
    const prompt = ref(false);
    const todo = ref('');

    function addTodoList() {
      const store = useTodoListsStore();

      //console.log(store);
      console.log(todo);
      store.addTodoList({
        id: store.nextId,
        content: todo.value,
        isFinished: false,
      });
    }

    return { showDialog, search, addTodoList, prompt, todo };
  },
});
</script>
