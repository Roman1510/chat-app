<script>
/*
  1. history (backend)
  2. history (frontend) when we log in
  3. add sounds to the messages (on send and on receive)   
  4. icons in message boxes (circle initials)
  5. deploy backend + frontend
  the rest is TBC
*/
import {
  sendChatMessage,
  getMessages,
  authWS,
  getChatInfo,
  closeConnection,
} from '../utilities/SocketConnect'
import { ref, onBeforeMount, onUnmounted, watch, onMounted } from 'vue'
import { getCurrentUser } from '../utilities/UserData'
import '@fortawesome/fontawesome-free/css/all.min.css'
import { useRouter } from 'vue-router'
// import _ from "lodash";
export default {
  name: 'ChatRoom',
  setup() {
    const router = useRouter()
    const message = ref('')
    const messagesArray = ref([])
    const currentUser = ref('')
    const isSendActive = ref(false)
    const currentRoom = ref('')
    const userList = ref([])
    window.userList = userList.value
    const autoScroll = ref(null)
    const logIn = () => {
      authWS(currentUser.value, currentRoom.value)
    }
    onBeforeMount(() => {
      currentUser.value = getCurrentUser().user
      currentRoom.value = getCurrentUser().room
      console.log(`onbeforemount was triggered ${currentUser.value}`)
      logIn()
    })
    onMounted(() => {
      scrollToElement()
    }),
      onUnmounted(() => {
        closeConnection()
      })
    const logOut = () => {
      closeConnection()
      router.push('/')
    }
    const updateMessages = (message) => {
      if (message) {
        messagesArray.value.push(message)
      }
    }
    const updateUsersArray = (newUserList) => {
      userList.value = [...newUserList]
    }
    const updateMessagesArray = (newMessagesList) => {
      messagesArray.value = [...newMessagesList]
    }
    getChatInfo(updateUsersArray, updateMessagesArray)
    const sendMessage = () => {
      if (isSendActive.value) {
        sendChatMessage(message.value, currentUser.value)
        message.value = ''
      }
    }
    getMessages(updateMessages)

    const scrollToElement = () => {
      if (autoScroll.value) {
        autoScroll.value.scrollTop = autoScroll.value.scrollHeight
      }
    }

    watch(message, (newValue, oldValue) => {
      if (!message.value) {
        isSendActive.value = false
      }
      if (newValue !== oldValue && message.value !== '') {
        isSendActive.value = true
      }
    })

    watch(
      messagesArray,
      () => {
        setTimeout(() => {
          scrollToElement()
        }, 50)
      },
      { deep: true }
    )

    const messageClass = (userName, isNotification) => {
      let result = ''
      if (isNotification) {
        result = 'tag'
      } else {
        result = 'chat-message'
      }
      if (userName == currentUser.value) {
        result += ' is-me'
      }
      return result
    }
    return {
      isSendActive,
      logIn,
      logOut,
      message,
      sendMessage,
      messagesArray,
      updateMessages,
      userList,
      currentUser,
      messageClass,
      autoScroll,
    }
  },
}
</script>

<template>
  <section class="hero is-info">
    <div class="hero-head">
      <nav class="navbar">
        <div class="navbar-start">
          <h1 class="title">Developer's lair</h1>
        </div>
        <div class="navbar-menu">
          <div class="navbar-end">
            <a class="navbar-item is-active">Choose avatar</a>
            <a
              class="navbar-item"
              href="https://github.com/Roman1510/chat-app"
              target="_blank"
              >Source code</a
            >
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
      </nav>
    </div>

    <div class="hero-body p-1 my-0 is-fullheight">
      <ul class="chat box p-0 my-0 mx-0" ref="autoScroll">
        <li
          v-for="(item, index) in messagesArray"
          :key="index"
          :class="messageClass(item.user, item.isNotification)"
        >
          {{ item.msg }}
          <span class="chat-name"
            >{{
              item.isNotification
                ? ''
                : item.user == currentUser
                ? 'You, '
                : `${item.user}, `
            }}
            {{ item.date }}</span
          >
        </li>
      </ul>
    </div>
    <div class="hero-foot">
      <footer class="my-2 mx-5">
        <div class="chatinput field has-addons">
          <div class="control is-expanded">
            <input
              style="background-color: #ffeedd"
              v-model="message"
              @keyup.enter.prevent="sendMessage"
              autocomplete="off"
              class="input is-large"
              type="text"
              placeholder="Write a message..."
            />
          </div>
          <div class="control">
            <button
              @click.prevent="sendMessage"
              class="button is-large"
              :class="{ 'is-primary': isSendActive }"
            >
              <span class="icon">
                <i class="fas fa-paper-plane"></i>
              </span>
            </button>
          </div>
        </div>
      </footer>
    </div>
  </section>
</template>

<style lang="scss">
.chat {
  width: 100%;
  height: 80vh;
  background-color: #cee3e0;
  overflow: scroll;
  scroll-behavior: smooth;
}

.chat-message {
  background-color: #916bbf;
  color: rgb(250, 236, 209);
  width: fit-content;
  border-radius: 10px;
  padding: 10px;
  margin: 0.7em;
}
.chat-name {
  color: black;
  font-size: 0.8rem;
  margin-left: 10px;
}

.is-me {
  margin-left: auto;
  background-color: #80ffdb;
  color: black;
}
</style>
