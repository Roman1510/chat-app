<script>
/*
  1. add different 'rooms' functionality to backend to separete messages flows
  2. add styling to messages (side of the username included)
  3. add icon styling to the username (circle with initials)
  4. deploy
  the rest is TBC
*/
import {
  sendChatMessage,
  getMessages,
  authWS,
  getUsers,
  closeConnection,
} from '../utilities/SocketConnect'
import { ref, onBeforeMount, onUnmounted } from 'vue'
import { getCurrentUser } from '../utilities/UserData'
import '@fortawesome/fontawesome-free/css/all.min.css'
import { useRouter } from 'vue-router'
export default {
  name: 'ChatRoom',
  setup() {
    const router = useRouter()
    const message = ref('')
    const messagesArray = ref([])
    const currentUser = ref('')
    // const currentRoom = ref('')
    const userList = ref([])
    const logIn = () => {
      authWS(currentUser.value)
    }
    onBeforeMount(() => {
      currentUser.value = getCurrentUser().user
      console.log(`onbeforemount was triggered ${currentUser.value}`)
      logIn()
    })
    onUnmounted(() => {
      closeConnection()
    })
    const logOut = () => {
      closeConnection()
      router.push('/')
    }
    const updateMessages = (msg) => {
      if (msg) {
        messagesArray.value.push(msg)
      }
    }
    const updateUsersArray = (newUserList) => {
      userList.value = [...newUserList]
    }
    getUsers(updateUsersArray)
    const sendMessage = () => {
      sendChatMessage(message.value, currentUser.value)
      message.value = ''
    }
    getMessages(updateMessages)
    return {
      logIn,
      logOut,
      message,
      sendMessage,
      messagesArray,
      updateMessages,
      userList,
    }
  },
}
</script>

<template>
  <section class="hero is-info is-fullheight">
    <div class="hero-head">
      <nav class="navbar">
        <div class="container">
          <div class="navbar-brand">
            <div class="navbar-item">
              <h1 class="title">Developer's lair</h1>
            </div>
          </div>
          <div class="navbar-menu">
            <div class="navbar-end">
              <a class="navbar-item is-active"> Home </a>
              <a class="navbar-item"> Documentation </a>
              <span class="navbar-item">
                <a @click.prevent="logOut" class="button is-info is-inverted">
                  <span class="icon">
                    <i class="fas fa-sign-out-alt"></i>
                  </span>
                  <span>Log out</span>
                </a>
              </span>
            </div>
          </div>
        </div>
      </nav>
    </div>

    <div class="hero-body">
      <div class="chat box"></div>
    </div>
    <div class="hero-foot">
      <footer class="my-2 mx-5">
        <div class="chatinput field has-addons">
          <div class="control is-expanded">
            <input
              v-model="message"
              @click.enter.prevent="sendMessage"
              autocomplete="off"
              class="input is-large"
              type="text"
              placeholder="Write a message..."
            />
          </div>
          <div class="control">
            <button class="button is-large is-primary">Send</button>
          </div>
        </div>
      </footer>
    </div>
  </section>
</template>

<style>

.chat {
  width:100%;
  min-height: 70vh;
}
</style>
