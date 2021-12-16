<template>
  <div id="app">
    <div class="columns">
      <div class="column green">
        <p>Username: {{ username }}</p>
        <p>Online:{{ users.length }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import io from 'socket.io-client'
export default {
  name: 'app',
  components: {},
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
    },
  },
  mounted: function () {
    this.username = prompt('what is your username', 'anonymous')

    if (!this.username) {
      this.username = 'anonymous'
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
