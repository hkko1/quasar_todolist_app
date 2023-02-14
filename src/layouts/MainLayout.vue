<template>
  <q-layout view="hHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title> Quasar App </q-toolbar-title>

        <div>Quasar v{{ $q.version }}</div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item class="bg-grey-3">
          <q-item-section> Lists </q-item-section>
          <q-item-section side>
            <create-todo-list-button icon="mdi-plus" flat round />
          </q-item-section>
        </q-item>
        <todo-lists-list />
      </q-list>
    </q-drawer>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import CreateTodoListButton from 'components/CreateTodoListButton.vue';
import TodoListsList from 'components/TodoListsList.vue';

// import EssentialLink from 'components/EssentialLink.vue';

export default defineComponent({
  name: 'MainLayout',

  components: {
    // EssentialLink,
    CreateTodoListButton,
    TodoListsList,
  },

  setup() {
    const leftDrawerOpen = ref(false);

    return {
      // essentialLinks: linksList,
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
    };
  },
});
</script>
