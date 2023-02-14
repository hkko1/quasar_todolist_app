import { defineStore } from 'pinia';
import { ref } from 'vue';
import { ITodo, ITodoLists } from 'components/models';

//Data inside state() is reactive element.
export const useTodoListsListStore = defineStore('todoListsList', () => {
  const nextListId = ref(0);
  const todoListsList = ref<ITodoLists[]>([]);

  function listCount() {
    return todoListsList.value.length;
  }

  function addTodoListsList(todoLists: ITodoLists) {
    nextListId.value++;
    todoListsList.value.push(todoLists);
  }

  function removeTodoListsList(id: number) {
    const index = todoListsList.value.findIndex((list) => list.id === id);

    // if(index >= 0 && index < nextid){ //error

    // }
    todoListsList.value.splice(index, 1);
  }

  return {
    nextListId,
    todoListsList,
    listCount,
    addTodoListsList,
    removeTodoListsList,
  };
});
