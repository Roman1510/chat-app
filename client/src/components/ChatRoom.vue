<script>
/*
  1. chatbox overflow scroll css
  2. chatbox automatic scrolling on new messages 
  3. timestamp above message boxes
  4. notification messages different styling (small font-size and class = message in bulma)
  5. history (backend)
  6. history (frontend) when we log in
  7. add sounds to the messages (on send and on receive)   
  8. icons in message boxes (circle initials)
  9. deploy backend + frontend
  the rest is TBC
*/
import {
  sendChatMessage,
  getMessages,
  authWS,
  getUsers,
  closeConnection,
} from '../utilities/SocketConnect'
import { ref, onBeforeMount, onUnmounted, watch } from 'vue'
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
    const autoScroll = ref(null);
    const logIn = () => {
      authWS(currentUser.value, currentRoom.value)
    }
    onBeforeMount(() => {
      currentUser.value = getCurrentUser().user
      currentRoom.value = getCurrentUser().room
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
    const updateMessages = (message) => {
      if (message) {
        messagesArray.value.push(message)
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

    const scrollToElement = ()=>{
    console.log(autoScroll.value)
    if (autoScroll.value) {
      autoScroll.value.scrollTop = autoScroll.value.scrollHeight
    }
  }

    watch(message,(newValue,oldValue)=>{
      if(!message.value){
        isSendActive.value=false
      }
      if(newValue!==oldValue&&message.value!=='') {
        isSendActive.value=true
      }
    })

    watch(messagesArray, () =>{
      scrollToElement()
    },{ deep: true })

    const addIsMe = (userName) => {
      if(userName==currentUser.value){
        return 'is-me'
      }
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
      addIsMe,
      autoScroll
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
        </div>
      </nav>
    </div>

    <div class="hero-body">
      <ul class="chat box" ref="autoScroll">
        <li v-for="(item, index) in messagesArray" :key="index" class="chat-message" :class="addIsMe(item.user)">{{item.msg}}
          <span class="chat-name">Roma, {{ item.date }}</span>
        </li>
      </ul>
    </div>
    <div class="hero-foot">
      <footer class="my-2 mx-5">
        <div class="chatinput field has-addons">
          <div class="control is-expanded">
            <input
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
              :class="{'is-primary':isSendActive}"
            >
              Send
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
  height: 70vh;
  background-color: white;
  overflow: scroll;
}

.chat-message {
  position: relative;
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
  margin-left:10px;
}

.is-me {
  margin-left: auto;
  background-color: #80FFDB;
  color: black;
}
</style>
