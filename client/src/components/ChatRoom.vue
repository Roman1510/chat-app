<template>
  <div class="modal is-active">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head"></header>
      <section class="modal-card-body">
        <div class="tile is-ancestor">
          <div class="tile is-4 is-vertical is-parent">
            <div class="tile is-child box">
              <p class="subtitle">In this chat: {{3}}</p>
              <div></div>
            </div>
          </div>
          <div class="tile is-parent">
            <div class="tile is-child box">
              <div class="container">
                <p v-for="(item, index) in messagesArray" :key="index">
                  {{ item.msg }}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div class="box columns">
          <input
            v-model="message"
            @keypress.enter="sendMessage"
            class="input column is-four-fifths"
            placeholder="Start typing..."
            type="text"
          />
          <button @click.prevent="sendMessage" class="button is-primary mx-2">
            Send
          </button>
        </div>
      </section>
      <footer class="modal-card-foot"></footer>
    </div>
  </div>
</template>
<script>
import { sendChatMessage, getMessages, authWS } from '../utilities/SocketConnect'
import { ref,onMounted } from 'vue'
export default {
  name: 'ChatRoom',
  setup() {
    const message = ref('')
    const messagesArray = ref([])
    const currentUser = ref('roma')
    const logIn = () => {
      authWS(currentUser.value)
    }
    onMounted(() => {
      logIn()
    })
    const updateMessagesArray = (msg) => {
      if (msg) {
        messagesArray.value.push(msg)
      }
    }
    const sendMessage = () => {
      sendChatMessage(message.value,currentUser.value)
      message.value = ''
    }
    getMessages(updateMessagesArray)
    return {
      logIn,
      message,
      sendMessage,
      messagesArray,
      updateMessagesArray,
    }
  },
}
</script>
<style>
.tile .is-child .container {
  min-height: 350px;
}
</style>
