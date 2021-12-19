<template>
  <div id="app">
    <div class="columns">
      <div class="column green">
        <p>Username: {{ username }}</p>
        <p>Online:{{ users.length }}</p>
        <ChatRoom :messages="messages" @sendMessage="sendMessage" />
      </div>
    </div>
  </div>
</template>

<script>
import io from 'socket.io-client'
import ChatRoom from './components/ChatRoom.vue'
export default {
  name: 'app',
  components: { ChatRoom },
  data: function () {
    return {
      username: '',
      socket: io('localhost:3000'),
      messages: [],
      users: [],
    }
  },
  methods: {
    joinServer: function () {
      this.socket.on('loggedIn', (data) => {
        this.messages = data.messages
        this.users = data.users
        this.socket.emit('newuser', this.username)
      })
      this.listen()
    },
    listen: function () {
      this.socket.on('userOnline', (user) => {
        this.users.push(user)
      })

      this.socket.on('userLeft', (user) => {
        this.users.splice(this.users.indexOf(user), 1)
      })
      this.socket.on('msg', (message) => {
        this.messages.push(message)
      })
    },
    sendMessage: function (message) {
      console.log('message was sent', message)
      this.socket.emit('msg', message)
    },
  },
  mounted: function () {
    if (!this.username) {
      this.username = prompt('what is your username', 'anonymous')
    }

    this.joinServer()
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
