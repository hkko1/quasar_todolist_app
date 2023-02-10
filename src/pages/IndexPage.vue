<template>
  <q-page class="row page-bg">
    <q-card class="col-xs-9">
    <q-toolbar>
      <q-input dense placeholder="Search" borderless class="full-width" :model-value="search">
        <template #append>
          <q-icon name="mdi-magnify" />
        </template>
      </q-input>
    </q-toolbar>
    <TodosList bordered>
      <q-item>
        <q-item-section side>
          <q-checkbox :model-value=" true" />
        </q-item-section>
        <q-item-section>
            Go Shopping
        </q-item-section>
        <q-item-section side>
          <q-btn flat round size="sm" icon="mdi-delete" />
        </q-item-section>
      </q-item>
    </TodosList>
    <!-- <div class="bg-blue col-3" style="height: 22px" />
    <div class="bg-purple col-3" style="height: 22px" />
    <div class="bg-green col-6" style="height: 22px" /> -->
    <!-- <q-select borderless :options="['LukeLee','Shannen','Panda','Lily']" v-model="selected"></q-select> -->
   <!-- <q-card style="width: 350px;">
    <q-card-section class="bg-blue text-white">
      My Card
    </q-card-section>
    <q-card-section>
      PostgreSQl 에서 BigQuery 로 복제를 하는 task  ( data pipeline 을 만드는 것)
    </q-card-section>
   </q-card> -->
   </q-card>
   <div class="col-xs-3">
    <q-toolbar class="bg-primary">
      <CreateTodoButton fab style="margin-bottom: -42px;" class="q-ml-lg" color="secondary" icon="mdi-plus" />
    </q-toolbar>
   </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import CreateTodoButton from 'components/CreateTodoButton.vue'
import TodosList from 'components/TodosList.vue'

export default defineComponent({
  name: 'IndexPage',

  components: {
    CreateTodoButton,
    TodosList
  },

  data () {
    return {
      search: ''
    }
  }
})
</script>

<style lang="scss">
.page-bg{
 background-color: $blue-1;
}
</style>
