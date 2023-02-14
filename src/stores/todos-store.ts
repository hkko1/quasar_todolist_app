import { defineStore } from 'pinia';
import { ref } from 'vue';
import { Todo, Meta } from 'components/models';

//Data inside state() is reactive element.
export const useTodoListsStore = defineStore('todoLists', () => {
  const nextId = ref(0);
  const todos = ref<Todo[]>([]);

  function listCount() {
    return todos.value.length;
  }

  function finishedTodos() {
    return todos.value.filter((item) => item.isFinished);
  }

  function unfinishedTodos() {
    return todos.value.filter((item) => !item.isFinished);
  }

  function toggleIsFinished(id: number) {
    const index = todos.value.findIndex((item) => item.id === id);
    todos.value[index].isFinished = !todos.value[index].isFinished;
  }

  function addTodoList(todo: Todo) {
    nextId.value++;
    todos.value.push(todo);
  }

  function removeTodoList(id: number) {
    const index = todos.value.findIndex((item) => item.id === id);

    // if(index >= 0 && index < nextid){ //error

    // }
    todos.value.splice(index, 1);
  }

  return {
    nextId,
    todos,
    listCount,
    finishedTodos,
    unfinishedTodos,
    toggleIsFinished,
    addTodoList,
    removeTodoList,
  };
});
