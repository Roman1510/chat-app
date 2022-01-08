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
        <div class="chat box">
          <ul>
            <li class="clearfix">
              <div class="message-data align-right">
                <span class="message-data-time">10:10 AM, Today</span> &nbsp;
                &nbsp; <span class="message-data-name">Olia</span>
                <i class="fa fa-circle me"></i>
              </div>
              <div class="message other-message float-right">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ea commodi suscipit maiores iusto doloribus sed dicta tempora inventore repudiandae voluptate iste perferendis, voluptatum quas cupiditate doloremque repellat quaerat pariatur mollitia? Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam ab nobis libero explicabo necessitatibus neque quod mollitia laudantium amet dignissimos debitis aliquid, sequi praesentium eaque suscipit saepe. Laboriosam, aut iusto!
              </div>
            </li>

            <li>
              <div class="message-data">
                <span class="message-data-name"
                  ><i class="fa fa-circle online"></i> Vincent</span
                >
                <span class="message-data-time">10:12 AM, Today</span>
              </div>
              <div class="message my-message">
                Are we meeting today? Project has been already finished and I
                have results to show you.
              </div>
            </li>

            <li class="clearfix">
              <div class="message-data align-right">
                <span class="message-data-time">10:14 AM, Today</span> &nbsp;
                &nbsp; <span class="message-data-name">Olia</span>
                <i class="fa fa-circle me"></i>
              </div>
              <div class="message other-message float-right">
                Well I am not sure. The rest of the team is not here yet. Maybe
                in an hour or so? Have you faced any problems at the last phase
                of the project?
              </div>
            </li>

            <li>
              <div class="message-data">
                <span class="message-data-name"
                  ><i class="fa fa-circle online"></i> Vincent</span
                >
                <span class="message-data-time">10:20 AM, Today</span>
              </div>
              <div class="message my-message">
                Actually everything was fine. I'm very excited to show this to
                our team.
              </div>
            </li>

            <li>
              <div class="message-data">
                <span class="message-data-name"
                  ><i class="fa fa-circle online"></i> Vincent</span
                >
                <span class="message-data-time">10:31 AM, Today</span>
              </div>
              <i class="fa fa-circle online"></i>
              <i class="fa fa-circle online" style="color: #aed2a6"></i>
              <i class="fa fa-circle online" style="color: #dae9da"></i>
            </li>
          </ul>
        </div>
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
              class="button is-large is-primary"
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
}

.people-list {
  width: 260px;
  float: left;

  .search {
    padding: 20px;
  }

  .fa-search {
    position: relative;
    left: -25px;
  }

  ul {
    padding: 20px;
    height: 770px;

    li {
      padding-bottom: 20px;
    }
  }

  img {
    float: left;
  }

  .about {
    float: left;
    margin-top: 8px;
  }

  .about {
    padding-left: 8px;
  }
}

.chat-header {
  padding: 20px;
  border-bottom: 2px solid white;

  img {
    float: left;
  }

  .chat-about {
    float: left;
    padding-left: 10px;
    margin-top: 6px;
  }

  .chat-with {
    font-weight: bold;
    font-size: 16px;
  }


  .fa-star {
    float: right;
    color: #d8dadf;
    font-size: 20px;
    margin-top: 12px;
  }
}

.chat-history {
  padding: 30px 30px 20px;
  border-bottom: 2px solid white;
  overflow-y: scroll;
  height: 575px;

  .message-data {
    margin-bottom: 15px;
  }

  .message-data-time {
    padding-left: 6px;
  }

  .message {
    color: white;
    padding: 18px 20px;
    line-height: 26px;
    font-size: 16px;
    border-radius: 7px;
    margin-bottom: 30px;
    width: 90%;
    position: relative;
  }

  .other-message {
    &:after {
      left: 93%;
    }
  }
}

.chat-message {
  padding: 30px;

  

  .fa-file-o,
  .fa-file-image-o {
    font-size: 16px;
    color: gray;
    cursor: pointer;
  }


}

.online,
.offline,
.me {
  margin-right: 3px;
  font-size: 10px;
}

.align-left {
  text-align: left;
}

.align-right {
  text-align: right;
}

.float-right {
  float: right;
}

</style>
