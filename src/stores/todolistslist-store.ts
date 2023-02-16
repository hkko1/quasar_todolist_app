import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { ITodo, ITodoLists } from 'components/models';
import { db } from '../firebase/config';
import {
  collection,
  doc,
  addDoc,
  deleteDoc,
  getDocs,
  query,
  where,
} from 'firebase/firestore';

//Data inside state() is reactive element.
export const useTodoListsListStore = defineStore('todoListsList', () => {
  const nextListId = ref(0);
  const todoListsList = ref<ITodoLists[]>([]);
  //const currentListId = ref(0);
  const isLoaded = ref(false);

  const listCount = computed(() => {
    return todoListsList.value?.length;
  });

  // const currentTodoLists = computed(() => {
  //   console.log('store_current listid:', currentListId.value);
  //   console.log('store_todoListsList:', todoListsList.value);
  //   return todoListsList.value.find((list) => list.id === currentListId.value);
  // });

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

  async function loadTodoListsFromDb() {
    console.log('load data from db');

    const querySnapshot = await getDocs(collection(db, 'todoListsList'));
    querySnapshot.forEach((doc) => {
      console.log(`${doc.id} => ${doc.data()}`);
    });
  }

  async function createTodoListsList(todoLists: ITodoLists) {
    nextListId.value++;
    console.log('createTodoListsList', todoLists);
    todoListsList.value.push(todoLists);

    // const todoLists: ITodoLists = {
    //   id: store.nextListId,
    //   title: todoListsTitle.value,
    //   todos: todo,
    //   nextTodoId: 0,
    // };

    try {
      const docRef = await addDoc(collection(db, 'todoListsList'), todoLists);
      console.log('[Create List] Document written with ID: ', docRef.id);
    } catch (e) {
      console.error('Error adding document', e);
    }
  }

  async function deleteTodoListsList(id: number) {
    console.log('store_deleteTodoListsList: id=', id);
    const index = todoListsList.value.findIndex((list) => list.id === id);

    // if(index >= 0 && index < nextid){ //error

    // }
    todoListsList.value.splice(index, 1);
    // if (listCount.value == 0) {
    //   currentListId.value = todoListsList.value[0]?.id;
    // }
    console.log('deleteTodoListsList_before db query');
    //const q = deleteDoc(doc(collection(db, 'todoListsList'), where('id','==', id)));
    const todoListsListRef = collection(db, 'todoListsList');
    const q = query(todoListsListRef, where('id', '==', id));
    console.log('deleteTodoListsList_q:', q);
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const docRef = doc(db, 'todolistsList', querySnapshot.docs[0].id);
      console.log('id:', querySnapshot.docs[0].id);
      console.log('deleteTodoListsList_docRef:', docRef);
      await deleteDoc(docRef);
    } else {
      console.log('deleteTodoListsList_ no db data');
    }
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
    //currentListId,
    listCount,
    //currentTodoLists,
    // getTodoListsList,
    loadTodoListsFromDb,
    createTodoListsList,
    deleteTodoListsList,
    addTodoIntoTodoList,
    removeTodoFromTodoList,
  };
});
