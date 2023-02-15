import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { ITodo, ITodoLists } from 'components/models';

//Data inside state() is reactive element.
export const useTodoListsListStore = defineStore('todoListsList', () => {
  const nextListId = ref(0);
  const todoListsList = ref<ITodoLists[]>([]);
  const currentListId = ref(0);

  const listCount = computed(() => {
    return todoListsList.value?.length;
  });

  const currentTodoLists = computed(() => {
    console.log('store_current listid:', currentListId.value);
    console.log('store_todoListsList:', todoListsList.value);
    return todoListsList.value.find((list) => list.id === currentListId.value);
  });

  // const currentTodoListsNextTodoId = computed(() => {
  //   return currentTodoLists?.value?.nextTodoId;
  // });

  // function currentTodoLists(listId: number) {
  //   const listIndex = todoListsList.value.findIndex(
  //     (list) => list.id === listId
  //   );
  //   console.log('todoLists value: ', todoListsList?.value[listIndex]);
  //   return todoListsList?.value[listIndex];
  // }

  function createTodoListsList(todoLists: ITodoLists) {
    nextListId.value++;
    console.log('createTodoListsList', todoLists);
    todoListsList.value.push(todoLists);
  }

  function deleteTodoListsList(id: number) {
    const index = todoListsList.value.findIndex((list) => list.id === id);

    // if(index >= 0 && index < nextid){ //error

    // }
    todoListsList.value.splice(index, 1);
    currentListId.value = todoListsList.value[0]?.id;
  }

  function addTodoIntoTodoList(listId: number, todo: ITodo) {
    const listIndex = todoListsList.value.findIndex(
      (list) => list.id === listId
    );

    todoListsList.value[listIndex].todos.push(todo);
    todoListsList.value[listIndex].nextTodoId++;
  }

  function removeTodoFromTodoList(listId: number, todoId: number) {
    const listIndex = todoListsList.value.findIndex(
      (list) => list.id === listId
    );

    const todoIndex = todoListsList.value[listIndex].todos.findIndex(
      (item) => item.id === todoId
    );

    todoListsList.value[listIndex].todos.splice(todoIndex, 1);
  }

  return {
    nextListId,
    todoListsList,
    currentListId,
    listCount,
    currentTodoLists,
    createTodoListsList,
    deleteTodoListsList,
    addTodoIntoTodoList,
    removeTodoFromTodoList,
  };
});
