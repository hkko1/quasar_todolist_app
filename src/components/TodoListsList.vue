<!-- Lists of Todo list on leftside menu -->
<template>
  <div v-if="loading == true">loading</div>
  <q-list v-else>
    <q-item
      clickable
      v-for="todoLists in store.todoListsList"
      :key="todoLists.id"
      @click="selectTodoLists(todoLists.id)"
    >
      <q-item-section side v-if="todoLists.id === selectedId">
        <q-icon color="red-15" name="mdi-emoticon-excited" />
      </q-item-section>
      <q-item-section side v-else>
        <q-icon color="red-15" name="mdi-circle-outline" />
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
import { defineComponent, onMounted, ref } from 'vue';
//import { ITodoLists } from './models';
import { useTodoListsListStore } from 'src/stores/todolistslist-store';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'TodoListsList',

  setup() {
    const loading = ref(false);
    const store = useTodoListsListStore();
    const todoListsList = store.todoListsList;
    //const route = useRoute();
    const router = useRouter();
    const selectedId = ref(-1);

    // onMounted(() => {
    //   initialize();
    // });

    // async function initialize() {
    //   try {
    //     await store.loadTodoListsFromDb();
    //   } catch (error) {
    //     alert(error);
    //   } finally {
    //     loading.value = false;
    //   }
    // }

    testData();

    function testData() {
      console.log('[TodoListsList] todoListsListSize=', store.listCount);
      todoListsList.forEach((list) => {
        console.log(list);
      });
    }

    function deleteTitleTodoList(id: number) {
      console.log('removeTItleTodoList_____');
      store.deleteTodoListsList(id);

      if (selectedId.value === id) {
        selectedId.value = store.todoListsList[0]?.id;
      }

      if (store.listCount == 0) {
        router.push({ path: '/' });
      }
      //else {
      //   router.push({ path: `/list/${selectedId.value}` });
      // }
    }

    function selectTodoLists(id: number) {
      console.log('selectTodoLists: current id= ', id);
      //store.currentListId = id;
      selectedId.value = id;
      //console.log('selectTodoLists: store id= ', store.currentListId);
      router.push({ path: `/list/${id}` });
    }

    return {
      loading,
      store,
      selectedId,
      deleteTitleTodoList,
      selectTodoLists,
    };
  },
});
</script>
