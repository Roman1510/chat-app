<template>
  <div class="modal is-active">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head"></header>
      <section class="modal-card-body">
        <div class="tile is-ancestor">
          <div class="tile is-4 is-vertical is-parent">
            <div class="tile is-child box">
              <p class="subtitle">Participants</p>
              <div></div>
            </div>
          </div>
          <div class="tile is-parent">
            <div class="tile is-child box">
              <div class="container">
                <p v-for="(item, index) in messagesArray" :key="index">{{item}}</p>
              </div>
            </div>
          </div>
        </div>

        <div class="box columns">
          <input
            v-model="message"
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
import { sendSocket, getMessages } from '../utilities/SocketConnect'
import { ref } from 'vue'
export default {
  name: 'ChatRoom',
  setup() {
    const message = ref('')
    const messagesArray = ref([])
    const updateMessagesArray = (msg) => {
      if(msg){
        messagesArray.value.push(msg)
      }
    }
    const sendMessage = () => {
      sendSocket(message.value)
    }
    getMessages(updateMessagesArray)
    return {
      message,
      sendMessage,
      messagesArray,
      updateMessagesArray
    }
  },
}
</script>
<style>
.tile .is-child .container {
  min-height: 350px;
}
</style>
