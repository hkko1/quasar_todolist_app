import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { ITodo, ITodoLists } from 'components/models';
import { db } from '../firebase/config';
import {
  collection,
  doc,
  addDoc,
  deleteDoc,
  updateDoc,
  getDoc,
  getDocs,
  query,
  where,
  arrayUnion,
  arrayRemove,
  onSnapshot,
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
    // callback: (listData: ITodoLists[]) => void
    console.log('load data from db');
    // await new Promise((r) => setTimeout(r, 50));

    onSnapshot(collection(db, 'todoListsList'), (snapshot) => {
      const lists = snapshot.docs.map((list) => {
        //console.log('map:', list.data() as ITodoLists);
        if (nextListId.value <= list.data().id) {
          nextListId.value = list.data().id + 1;
        }
        return list.data() as ITodoLists;
      });
      // callback(lists);
      console.log('onShapshot--inside');
      todoListsList.value = lists;
    });

    console.log('---todoListsList: ', todoListsList.value);
    todoListsList.value.forEach((list) => {
      console.log('todoList:', list);
    });
  }

  loadTodoListsFromDb();

  // loadTodoListsFromDb((listData: ITodoLists[]) => {
  //   todoListsList.value = listData;
  //   // todoListsList.value.forEach((list) => {
  //   //   console.log('callback_todoList:', list);
  //   // });
  // });

  async function createTodoListsList(todoLists: ITodoLists) {
    nextListId.value++;
    console.log('createTodoListsList', todoLists);
    todoListsList.value.push(todoLists);

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
      const docRef = doc(db, 'todoListsList', querySnapshot.docs[0].id);
      console.log('id:', querySnapshot.docs[0].id);
      console.log('deleteTodoListsList_docRef:', docRef);

      await deleteDoc(docRef)
        .then(() => {
          console.log('Document has been deleted successfully.');
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      console.log('deleteTodoListsList_ no db data');
    }
  }

  async function addTodoIntoTodoList(listId: number, todo: ITodo) {
    const listIndex = todoListsList.value.findIndex(
      (list) => list.id === listId
    );

    todoListsList.value[listIndex].todos.push(todo);
    todoListsList.value[listIndex].nextTodoId++;

    const todoListsListRef = collection(db, 'todoListsList');
    const q = query(todoListsListRef, where('id', '==', listId));
    console.log('deleteTodoListsList_q:', q);
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const docRef = doc(db, 'todoListsList', querySnapshot.docs[0].id);
      console.log('id:', querySnapshot.docs[0].id);
      console.log('addTodoIntoTodoList_docRef:', docRef);

      await updateDoc(docRef, {
        todos: arrayUnion(todo),
        nextTodoId: todoListsList.value[listIndex].nextTodoId,
      })
        .then(() => {
          console.log('Document has been updated successfully.');
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      console.log('addTodoIntoTodoList_ no db data');
    }
  }

  async function removeTodoFromTodoList(listId: number, todoId: number) {
    const listIndex = todoListsList.value.findIndex(
      (list) => list.id === listId
    );

    const todoIndex = todoListsList.value[listIndex].todos.findIndex(
      (item) => item.id === todoId
    );

    todoListsList.value[listIndex].todos.splice(todoIndex, 1);

    const todoListsListRef = collection(db, 'todoListsList');
    const q = query(todoListsListRef, where('id', '==', listId));
    console.log('deleteTodoListsList_q:', q);
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const docRef = doc(db, 'todoListsList', querySnapshot.docs[0].id);
      console.log('id:', querySnapshot.docs[0].id);
      console.log('addTodoIntoTodoList_docRef:', docRef);

      //const todos = ref([]);
      await getDoc(docRef).then((doc) => {
        if (doc.exists()) {
          const data = doc.data();
          //todos.value = data.todos.filter((todo: { id: number; }) => todo.id !== todoId);
          updateDoc(docRef, {
            todos: arrayRemove(
              data.todos.find((todo: { id: number }) => todo.id === todoId)
            ),
          })
            .then(() => {
              console.log('(remove) Document has been updated successfully.');
            })
            .catch((error) => {
              console.log(error);
            });
        }
      });
    } else {
      console.log('removeTodoFromTodoList_ no db data');
    }
  }

  async function toggleCheckBox(
    listId: number,
    todoId: number,
    isFinished: boolean
  ) {
    console.log(
      `Store_toggleCheckBox: listId=${listId} todoId=${todoId} isFinished=${isFinished}`
    );

    todoListsList.value.forEach((todoLists) => {
      if (todoLists.id == listId) {
        todoLists.todos.forEach((todo) => {
          if (todo.id == todoId) {
            todo.isFinished = isFinished;
          }
        });
      }
    });

    const todoListsListRef = collection(db, 'todoListsList');
    const q = query(todoListsListRef, where('id', '==', listId));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const docRef = doc(db, 'todoListsList', querySnapshot.docs[0].id);
      console.log('id:', querySnapshot.docs[0].id);
      console.log('toggleCheckBox_docRef:', docRef);

      await getDoc(docRef).then((doc) => {
        if (doc.exists()) {
          updateDoc(docRef, {
            todos: todoListsList.value.find((list) => list.id == listId)?.todos,
          })
            .then(() => {
              console.log('(Update)) Document has been updated successfully.');
            })
            .catch((error) => {
              console.log('toggleCheckBox_error:', error);
            });
        }
      });
    }
  }

  return {
    nextListId,
    todoListsList,
    listCount,
    loadTodoListsFromDb,
    createTodoListsList,
    deleteTodoListsList,
    addTodoIntoTodoList,
    removeTodoFromTodoList,
    toggleCheckBox,
  };
});
