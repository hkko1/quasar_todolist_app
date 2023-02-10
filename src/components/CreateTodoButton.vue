<template>
  <q-btn @click="handleButtonClicked"/>
</template>

<script>
export default {
  methods: {
    handleButtonClicked () {
      // alert('clicked')
      this.$q.dialog({
        title: 'Create Todo',
        prompt: {
          model: '',
          type: 'text'
        }
      }).onOk(this.createTodo)
    },

    createTodo (data) {
      // console.log(data)
      this.$q.notify({
        message: 'Todo Created',
        icon: 'mdi-check',
        color: 'positive'
      })
    }
  }
}
</script>
