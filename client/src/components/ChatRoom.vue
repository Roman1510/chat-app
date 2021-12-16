<template lang="">
  <div class="container">
    <div class="box" v-for="message in messages" :key="message.index">
      <div>
        {{ message.username }}
      </div>
      <div>
        {{ message.msg }}
      </div>
    </div>
  </div>
  <form class="form">
    <input type="text" v-model="msg" @submit.prevent="sendMessage" />
    <button @click.prevent="sendMessage" class="button">
      Send
    </button>
  </form>
</template>
<script>
export default {
  name: 'chatroom',
  props: ['messages'],
  date: function () {
    return {
      msg: '',
    }
  },
  methods: {
    sendMessage: function () {
      if (!this.msg) {
        alert('please enter a message')
        return
      }
      this.$emit('sendMessage', this.msg)
      this.msg = ''
    },
  },
}
</script>
<style lang="" scoped></style>
