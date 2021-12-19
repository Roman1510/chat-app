<template lang="">
  <div class="container">
    <div class="box" v-for="item in messages" :key="item.index">
      <div>
        {{ item.username }}
      </div>
      <div>
        {{ item.msg }}
      </div>
    </div>
  </div>
  <form class="form">
    <input type="text" v-model="msg" />
    <button @click.prevent="sendMessage" class="button">Send</button>
  </form>
</template>
<script>
export default {
  name: 'chatroom',
  props: ['messages'],

  emits: ['sendMessage'],
  data: function () {
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
